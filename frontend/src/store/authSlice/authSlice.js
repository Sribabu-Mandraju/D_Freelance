// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

// module-level socket instance (keeps single connection)
let socket = null;

const initialState = {
  token: null,
  user: null,
  userExists: false,
  isAuthenticated: false,
  loading: false,
  error: null,
  socket: null, // will hold the socket instance
  onlineUsers: [],
};

// --- Thunks ---

export const verifyWalletAuth = createAsyncThunk(
  "auth/verifyWalletAuth",
  async ({ address, signature, nonce }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, signature, nonce }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Verify request failed`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Verification failed");
      }

      // Normalize address to lowercase
      const normalizedAddress = address.toLowerCase();

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authAddress", normalizedAddress);

      return {
        token: data.token,
        user: { _id: normalizedAddress, ...data.user },
        userExists: !!data.userExists,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const validateStoredToken = createAsyncThunk(
  "auth/validateStoredToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const address = localStorage.getItem("authAddress");

      if (!token || !address) {
        throw new Error("No stored authentication data");
      }

      const response = await fetch(`http://localhost:3001/api/messages/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch user profile");
      }

      // API might return { data: [...]} or array directly. handle both.
      const allUsers = await response.json();
      const usersArray = Array.isArray(allUsers) ? allUsers : (allUsers.data || []);

      // Support both shapes: _id === wallet OR heroSection.walletAddress
      const normalizedAddress = address.toLowerCase();
      const currentUser = usersArray.find(
        (u) =>
          (u._id && u._id.toLowerCase() === normalizedAddress) ||
          (u.heroSection && u.heroSection.walletAddress && u.heroSection.walletAddress.toLowerCase() === normalizedAddress)
      );

      if (!currentUser) {
        throw new Error("User profile not found after token validation");
      }

      return {
        token,
        user: currentUser,
        userExists: true,
      };
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authAddress");
      return rejectWithValue(error.message);
    }
  }
);

export const connectSocket = createAsyncThunk(
  "auth/connectSocket",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      // avoid multiple open connections
      if (socket && socket.connected) {
        console.log("Socket already connected.");
        return socket.id;
      }

      const { user, token } = getState().auth;
      if (!user || !token) {
        return rejectWithValue("Cannot connect socket without authenticated user.");
      }

      const userId = user._id;

      // create socket and attach auth
      socket = io("http://localhost:3001", {
        auth: { token },
        // if your server reads query instead, you can add query: { userId }
      });

      // store socket instance in state
      dispatch(setSocket(socket));

      socket.on("connect", () => {
        console.log("Socket connected with id:", socket.id);
      });

      socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        dispatch(clearSocket());
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connect_error:", err.message || err);
      });

      return socket.id;
    } catch (err) {
      return rejectWithValue(err.message || "Socket connection failed");
    }
  }
);

export const logoutAndDisconnect = createAsyncThunk(
  "auth/logoutAndDisconnect",
  async (_, { dispatch }) => {
    try {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    } catch (e) {
      console.warn("Error disconnecting socket", e);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authAddress");
      dispatch(logout());
    }
  }
);

// --- Slice ---

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.userExists = false;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      if (state.socket && state.socket.disconnect) {
        try { state.socket.disconnect(); } catch (e) { /* ignore */ }
      }
      state.socket = null;
      state.onlineUsers = [];
    },
    // set the socket instance (not just the id)
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    clearSocket: (state) => {
      state.socket = null;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload || [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyWalletAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyWalletAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.userExists = action.payload.userExists;
        state.isAuthenticated = true;
      })
      .addCase(verifyWalletAuth.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Verification failed";
      })

      .addCase(validateStoredToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateStoredToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.userExists = action.payload.userExists;
        state.isAuthenticated = true;
      })
      .addCase(validateStoredToken.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || null;
      });
  },
});

export const { logout, setSocket, clearSocket, setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;

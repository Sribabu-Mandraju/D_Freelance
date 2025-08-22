// features/chat/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axios from 'axios';

// create axios instance WITHOUT a static Authorization header
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token dynamically before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// optional: handle 401 responses globally (auto-logout behavior)
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // token invalid/expired — cleanup and notify user
      localStorage.removeItem("authToken");
      toast.error("Session expired. Please reconnect your wallet.");
      // Optional: redirect to login/landing page
      // window.location.href = "/login"; // uncomment if desired
    }
    return Promise.reject(error);
  }
);






// Async thunks
export const getUsers = createAsyncThunk(
  'chat/getUsers',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/messages/users');
      return res.data;
    } catch (err) {
      const message = err?.response?.data?.message ?? err.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async (userId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      return res.data; // expected messages array
    } catch (err) {
      const message = err?.response?.data?.message ?? err.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ receiverId, messageData }, thunkAPI) => {
    try {
      // selectedUser equivalent passed in via receiverId
      const res = await axiosInstance.post(`/messages/send/${receiverId}`, messageData);
      return res.data; // created message
    } catch (err) {
      const message = err?.response?.data?.message ?? err.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk to subscribe to socket's "newMessage" event
export const subscribeToMessages = createAsyncThunk(
  'chat/subscribeToMessages',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const socket = state.auth?.socket; // assumes auth slice contains socket
    if (!socket) return thunkAPI.rejectWithValue('No socket available');

    // create handler that captures dispatch + getState
    const handler = (newMessage) => {
      const { chat } = thunkAPI.getState();
      const selectedUser = chat.selectedUser;
      console.log("Received newMessage from socket:", newMessage);
      console.log("Selected user:", selectedUser);
      console.log("isMessageSentFromSelectedUser check:", selectedUser && (newMessage.senderId === selectedUser._id));
      // same check you had: only append if message comes from selected user
      const isMessageSentFromSelectedUser = selectedUser && (newMessage.senderId === selectedUser._id);
      if (!isMessageSentFromSelectedUser) return;
      thunkAPI.dispatch(appendMessage(newMessage));
    };

    // attach and save handler reference on socket so we can remove later
    socket.on('newMessage', handler);
    socket._chatMessageHandler = handler;

    // set subscribed flag
    thunkAPI.dispatch(setSubscribed(true));

    // resolve with success (no payload needed)
    return true;
  }
);

// Thunk to unsubscribe from socket
export const unsubscribeFromMessages = createAsyncThunk(
  'chat/unsubscribeFromMessages',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const socket = state.auth?.socket;
    if (!socket) return thunkAPI.rejectWithValue('No socket available');

    const handler = socket._chatMessageHandler;
    if (handler) {
      socket.off('newMessage', handler);
      delete socket._chatMessageHandler;
    } else {
      // fallback: remove all listeners for event
      socket.off('newMessage');
    }
    thunkAPI.dispatch(setSubscribed(false));
    return true;
  }
);

// initial state
const initialState = {
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  subscribed: false, // track subscription state
  error: null
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
      // optionally clear messages when selecting another user:
      // state.messages = [];
    },
    appendMessage(state, action) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setSubscribed(state, action) {
      state.subscribed = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // getUsers
      .addCase(getUsers.pending, (state) => {
        state.isUsersLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isUsersLoading = false;
        state.error = action.payload ?? action.error.message;
      })

      // getMessages
      .addCase(getMessages.pending, (state) => {
        state.isMessagesLoading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isMessagesLoading = false;
        state.error = action.payload ?? action.error.message;
      })

      // sendMessage
      .addCase(sendMessage.fulfilled, (state, action) => {
        console.log("sendMessage fulfilled - payload:", action.payload);
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        console.error("sendMessage rejected - error:", action.payload);
        state.error = action.payload ?? action.error.message;
      })

      // subscribe/unsubscribe success flags are handled by reducers already
      .addCase(subscribeToMessages.rejected, (state, action) => {
        console.error("subscribeToMessages rejected - error:", action.payload);
        state.error = action.payload ?? action.error.message;
      })
      .addCase(unsubscribeFromMessages.rejected, (state, action) => {
        console.error("unsubscribeFromMessages rejected - error:", action.payload);
        state.error = action.payload ?? action.error.message;
      });
  }
});

export const {
  setSelectedUser,
  appendMessage,
  clearMessages,
  setUsers,
  setSubscribed
} = chatSlice.actions;

export default chatSlice.reducer;

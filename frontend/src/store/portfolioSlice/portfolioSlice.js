import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  portfolioData: {
    heroSection: {
      name: "",
      domains: [""],
      thoughtLine: "",
      aboutMe: "",
      expertise: [""],
      focusAreas: [""],
    },
    contactInfo: {
      email: "",
      phoneNumber: "",
      linkedinProfile: "",
    },
    currentStatus: [
      {
        status: "",
        color: "purple",
        isActive: true,
      },
    ],
    techHighlights: [
      {
        technology: "",
        rating: 1,
        description: "",
      },
    ],
    projects: [],
    techStack: [],
    workExperience: [],
    education: [],
    userGigs: [],
  },
  loading: false,
  error: null,
  activeTab: "overview",
  isSubmitting: false,
  submitMessage: "",
  portfolioId: null, // To store the ID after creation
};

// Async thunk to fetch portfolio data
export const fetchPortfolio = createAsyncThunk(
  "portfolio/fetchPortfolio",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found. Please log in.");
      }

      const response = await axios.get("http://localhost:3001/api/portfolio/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch portfolio");
      }

      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data.message : err.message);
    }
  }
);

// Async thunk to create a new portfolio and send OTP
export const createPortfolio = createAsyncThunk(
  "portfolio/createPortfolio",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found. Please log in.");
      }

      console.log("[Client] Sending createPortfolio request:", {
        url: "http://localhost:3001/api/portfolio/otp/send",
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: formData,
      });

      const response = await axios.post(
        "http://localhost:3001/api/portfolio/otp/send",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("[Client] createPortfolio response:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create portfolio");
      }

      return response.data;
    } catch (err) {
      console.error("[Client] createPortfolio error:", err.response ? err.response.data : err.message);
      return rejectWithValue(err.response ? err.response.data.message : err.message);
    }
  }
);

// Async thunk to update portfolio data
export const updatePortfolio = createAsyncThunk(
  "portfolio/updatePortfolio",
  async ({ portfolioId, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found. Please log in.");
      }

      const response = await axios.put(
        `http://localhost:3001/api/portfolio/${portfolioId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update portfolio");
      }

      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data.message : err.message);
    }
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setPortfolioData: (state, action) => {
      state.portfolioData = { ...state.portfolioData, ...action.payload };
    },
    updateArrayItem: (state, action) => {
      const { section, field, index, value } = action.payload;
      if (state.portfolioData[section] && Array.isArray(state.portfolioData[section][field])) {
        state.portfolioData[section][field] = state.portfolioData[section][field].map((item, i) =>
          i === index ? value : item
        );
      }
    },
    addArrayItem: (state, action) => {
      const { section, field, defaultValue } = action.payload;
      if (state.portfolioData[section] && Array.isArray(state.portfolioData[section][field])) {
        state.portfolioData[section][field] = [...state.portfolioData[section][field], defaultValue];
      }
    },
    removeArrayItem: (state, action) => {
      const { section, field, index } = action.payload;
      if (state.portfolioData[section] && Array.isArray(state.portfolioData[section][field])) {
        state.portfolioData[section][field] = state.portfolioData[section][field].filter((_, i) => i !== index);
      }
    },
    updateNestedField: (state, action) => {
      const { section, field, value } = action.payload;
      if (state.portfolioData[section]) {
        state.portfolioData[section][field] = value;
      }
    },
    updateCurrentStatus: (state, action) => {
      const { index, field, value } = action.payload;
      state.portfolioData.currentStatus = state.portfolioData.currentStatus.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
    },
    updateTechHighlight: (state, action) => {
      const { index, field, value } = action.payload;
      state.portfolioData.techHighlights = state.portfolioData.techHighlights.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
    },
    resetPortfolio: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolioData = {
          ...state.portfolioData,
          heroSection: action.payload.heroSection || {},
          projects: action.payload.projects || [],
          currentStatus: action.payload.currentStatus || [],
          techHighlights: action.payload.techHighlights || [],
          techStack: action.payload.techStack || [],
          workExperience: action.payload.workExperience || [],
          education: action.payload.education || [],
          userGigs: action.payload.userGigs || [],
        };
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPortfolio.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
        state.submitMessage = "";
      })
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.submitMessage = "Portfolio created successfully! Redirecting for OTP verification.";
        state.portfolioId = action.payload.portfolioId; // Store portfolio ID
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitMessage = `Error: ${action.payload || "Failed to create portfolio"}`;
      })
      .addCase(updatePortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolioData = {
          ...state.portfolioData,
          ...action.payload,
        };
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setActiveTab,
  setPortfolioData,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  updateNestedField,
  updateCurrentStatus,
  updateTechHighlight,
  resetPortfolio,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;
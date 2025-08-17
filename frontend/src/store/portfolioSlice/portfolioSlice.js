import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Async thunk for creating portfolio
export const createPortfolio = createAsyncThunk(
  "portfolio/createPortfolio",
  async (formData, { getState,rejectWithValue }) => {
    try {
      // Save to sessionStorage for OTP verification later
      sessionStorage.setItem("portfolioData", JSON.stringify(formData))

      const token = getState().auth.token;

      // Step 1: Create portfolio
      const createPortfolioResponse =  await axios.post(
        "http://localhost:5000/api/portfolio",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        }
      );

      const createResult = await createPortfolioResponse.json()

      if (!createPortfolioResponse.ok || !createResult.success) {
        sessionStorage.removeItem("portfolioData")
        return rejectWithValue(createResult.message || "Failed to create portfolio")
      }

      // Step 2: Request OTP
      const otpResponse = await fetch("http://localhost:3001/api/portfolio/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactInfo: { email: formData.contactInfo.email } }),
      })

      const otpResult = await otpResponse.json()

      if (!otpResponse.ok || !otpResult.success) {
        sessionStorage.removeItem("portfolioData")
        return rejectWithValue(otpResult.message || "Portfolio created but OTP failed")
      }

      // Save portfolio ID in session storage
      sessionStorage.setItem("portfolioId", createResult.data._id)

      return {
        portfolioId: createResult.data._id,
        email: formData.contactInfo.email,
        message: "Portfolio created successfully. OTP sent.",
      }
    } catch (error) {
      sessionStorage.removeItem("portfolioData")
      return rejectWithValue(error.message)
    }
  }
)

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    isSubmitting: false,
    error: null,
    successMessage: null,
    portfolioId: null,
    email: null,
  },
  reducers: {
    resetPortfolioState: (state) => {
      state.isSubmitting = false
      state.error = null
      state.successMessage = null
      state.portfolioId = null
      state.email = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPortfolio.pending, (state) => {
        state.isSubmitting = true
        state.error = null
        state.successMessage = null
      })
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.isSubmitting = false
        state.portfolioId = action.payload.portfolioId
        state.email = action.payload.email
        state.successMessage = action.payload.message
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.isSubmitting = false
        state.error = action.payload || "Something went wrong"
      })
  },
})

export const { resetPortfolioState } = portfolioSlice.actions
export default portfolioSlice.reducer

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import portfolioReducer from "./portfolioSlice/portfolioSlice";
import gigReducer from "./gigSlice/gigSlice";
import { saveState, loadState } from "./localStorageUtils";
import chatAppReducer from "./ChatApplicationSlice/ChatAppSlice";
// Load persisted state from localStorage
const preloadedState = loadState();

const store = configureStore({
  reducer: {
    auth: authReducer,
    portfolio: portfolioReducer,
    gig: gigReducer,
    chatApp: chatAppReducer,
  },
  preloadedState,
});

// Save Redux state to localStorage on changes
store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

export default store;

import { createSlice, configureStore } from "@reduxjs/toolkit";

const sidebarPositionSlice = createSlice({
  name: "sidebarPosition",
  initialState: { currentPosition: 0, hoverPosition: 0 },
  reducers: {
    hoverPositionChange(state, action) {
      state.hoverPosition = action.payload;
    },
    pagePositionChange(state, action) {
      state.currentPosition = action.payload;
      state.hoverPosition = action.payload;
    },
    onLeavePositionChange(state) {
      state.hoverPosition = state.currentPosition;
    },
  },
});

const navigationColorSlice = createSlice({
  name: "navigationColor",
  initialState: { isScrolled: false },
  reducers: {
    scrollingDetection(state, action) {
      state.isScrolled = action.payload;
    },
  },
});

const loginDataSlice = createSlice({
  name: "loginData",
  initialState: { token: "" },
  reducers:{
    setTokenInRedux(state,action)
    {
      state.token= action.payload.token;
    },

    deleteTokenFromRedux(state)
    {
      state.token = "";
    }
  }
});

const store = configureStore({
  reducer: {
    sidebarPosition: sidebarPositionSlice.reducer,
    navigationColor: navigationColorSlice.reducer,
    loginData: loginDataSlice.reducer
  },
});

export default store;
export const positionActions = sidebarPositionSlice.actions;
export const navigationColorActions = navigationColorSlice.actions;
export const loginDataActions=loginDataSlice.actions;

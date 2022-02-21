import { createSlice, configureStore } from "@reduxjs/toolkit";

const sidebarPositionSlice = createSlice({
  name: "sidebarPositions",
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
  name: "navigationColors",
  initialState: { isScrolled:false},
  reducers: {
    scrollingDetection(state,action)
    {
      state.isScrolled=action.payload;
    }
  },
});

const store = configureStore({
  reducer: { sidebarPosition: sidebarPositionSlice.reducer, navigationColor: navigationColorSlice.reducer },
});

export default store;
export const positionActions = sidebarPositionSlice.actions;
export const navigationColorActions= navigationColorSlice.actions;

/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";



export type TInitialState = {
  toggle:boolean
};

const initialState: TInitialState = {
  toggle:false
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleBtn: (state, action) => {
    state.toggle=action.payload
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { toggleBtn } = toggleSlice.actions;

export default toggleSlice.reducer;
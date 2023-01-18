import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { saveCurrentUser } = userSlice.actions;

export default userSlice.reducer;

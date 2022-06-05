import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice(
    {
        name: "Auth",
        initialState: {user: {}},
        reducers: {
            setUser: (state, action) => {
                state.user = action.payload;
              console.log(action.payload);
            },
            removeUser: (state) => {
                state.user = {};
            }
          },
    }
);

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
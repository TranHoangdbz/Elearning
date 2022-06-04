import { createSlice } from "@reduxjs/toolkit";

const resetPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: { modalOpen: false },
    reducers: {
      openModal: (state) => {
        state.modalOpen = true;
      },
      closeModal: (state) => {
        state.modalOpen = false;
      }
    },
});

export const {openModal,closeModal} = resetPasswordSlice.actions
export default resetPasswordSlice.reducer

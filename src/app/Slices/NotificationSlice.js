import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  notificationlength: 0,
};

const notificationSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setModal: (state) => {
      state.modal = !state.modal;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
      state.notificationlength = action.payload.notifications.length;
    },
    setTutorNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
      state.notificationlength =
        action.payload.notifications.notifications.length +
        action.payload.notifications.request.length+action.payload.notifications.tempRequest.length;
    },
  },
});

export default notificationSlice.reducer;
export const { setModal, setNotifications, setTutorNotifications } =
  notificationSlice.actions;

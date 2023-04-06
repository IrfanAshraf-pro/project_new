import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import drawerReducer from "./Slices/drawerSlice";
import NotificationSlice from "./Slices/NotificationSlice";
import ScheduleSlice from "./Slices/ScheduleSlice";

export default configureStore({
  reducer: {
    drawer: drawerReducer,
    auth: AuthSlice,
    schedule: ScheduleSlice,
    notification:NotificationSlice
  },
});

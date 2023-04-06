import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import drawerReducer from "./Slices/drawerSlice";
import NotificationSlice from "./Slices/NotificationSlice";
import ScheduleSlice from "./Slices/ScheduleSlice";
import headerSlice from './Slices/Dashboard/HeaderSlice'
import rightDrawerSlice from './Slices/Dashboard/RightDrawerSlice'
import modalSlice from './Slices/Dashboard/ModalSlice'

export default configureStore({
  reducer: {
    drawer: drawerReducer,
    auth: AuthSlice,
    schedule: ScheduleSlice,
    notification:NotificationSlice,
    // dashboard reducers
    header:headerSlice,
    modal:modalSlice,
    rightDrawer:rightDrawerSlice
  },
});

import PageContent from "./PageContent";
import LeftSidebar from "./LeftSidebar";
import { useSelector, useDispatch } from "react-redux";
import RightSidebar from "./RightSidebar";
import { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import ModalLayout from "./ModalLayout";
import {
  setNotifications,
  setTutorNotifications
} from "../../app/Slices/NotificationSlice";
import { RepositoryFactory } from "../Repository/RepositoryFactory";
import SuspenseContent from "./SuspenseContent";
import { ScheduleNotSet } from "../Utils/MatchTypes";
import { setSchedule } from "../../app/Slices/ScheduleSlice";
import { toast } from "react-toastify";

const tutorapi = RepositoryFactory.get("tutor");
const notificationApi = RepositoryFactory.get("notification");
const schedule = RepositoryFactory.get("schedule");
function Layout() {
  const dispatch = useDispatch();
  const { role, user } = useSelector((state) => state.auth);
  let interval = ""; 
  // getting notifications
  const gettingTutorNotifications = async () => {
    const { data } = await notificationApi.getTutorNotifications(user.email);
    dispatch(setTutorNotifications({ notifications: data }));
  };
  const gettingStudentNotifications = async () => {
    const { data } = await notificationApi.getStudentNotifications(user.email);
    dispatch(setNotifications({ notifications: data }));
  };

  //   getting schedule of logged in user
  const getUserSchedule = async () => {
    if (role === "Student") {
      const { data } = await schedule.getStudentSchedule(user.email);
      console.log(data);
      dispatchingSchedule(data);
      // alert(data)
    } else if (role === "Tutor") {
      const { data } = await schedule.getTutorSchedule(user.email);
      console.log(data);
      dispatchingSchedule(data);
      // alert(data)
    }
  };
  const dispatchingSchedule = (data) => {
    if (data.length > 100) {
      dispatch(setSchedule({ schedule: data }));
    } else if (data.match(ScheduleNotSet)) {
      toast.warning(data, {
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    getUserSchedule();
    if (role === "Tutor") {
      interval = setInterval(gettingTutorNotifications, 5000);
    } else if (role === "Student") {
      interval = setInterval(gettingStudentNotifications, 5000);
    }
    return () => clearInterval(interval);
  }, [role, user.email]);

  return (
    <Suspense fallback={SuspenseContent}>
      {/* Left drawer - containing page content and side bar (always open) */}
      <div className="drawer drawer-mobile">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <PageContent />
        <LeftSidebar />
      </div>

      {/* Right drawer - containing secondary content like notifications list etc.. */}
      <RightSidebar />

      {/** Notification layout container */}
      {/* <NotificationContainer /> */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Modal layout container */}
      <ModalLayout />
    </Suspense>
  );
}

export default Layout;

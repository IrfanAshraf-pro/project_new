import PageContent from "./PageContent";
import LeftSidebar from "./LeftSidebar";
import { useSelector, useDispatch } from "react-redux";
import RightSidebar from "./RightSidebar";
import { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import ModalLayout from "./ModalLayout";
import {
  setNotifications,
  setIsTutor,
  setTutor,
} from "../../app/Slices/NotificationSlice";
import { RepositoryFactory } from "../Repository/RepositoryFactory";
import SuspenseContent from "./SuspenseContent";
import { ScheduleNotSet } from "../Utils/MatchTypes";
import { setSchedule } from "../../app/Slices/ScheduleSlice";
import { toast } from "react-toastify";

const tutorapi = RepositoryFactory.get("tutor");
const schedule=RepositoryFactory.get("schedule");
function Layout() {
  const dispatch = useDispatch();
  const { role, user } = useSelector((state) => state.auth);
  let interval = "";
  // getting notifications
  const gettingNotifications = async () => {
    const { data } = await tutorapi.GetStudentRequests(user.email);
    dispatch(setNotifications({ notifications: data }));
  };
  // const gettingTutorNotifications = () => {
  //   notificationInterval=setInterval(gettingNotifications, 5000);
  //   dispatch(setTutor())
  // };

  
  //   getting schedule of logged in user
  const getUserSchedule=async()=>{
    if(role==="Student"){
        const {data}=await schedule.getStudentSchedule(user.email)
        console.log(data);
        dispatchingSchedule(data)
        // alert(data)
    }else{
        const {data}=await schedule.getTutorSchedule(user.email)
        console.log(data);
        dispatchingSchedule(data)
        // alert(data)
    }
}
const dispatchingSchedule=(data)=>{
    if(data.length>100){
        dispatch(setSchedule({ schedule: data }))
    }else if(data.match(ScheduleNotSet)){
        toast.warning(data,{
            theme:'colored'
        })
    }
}

  const dispatchNotTutor = () => {
    dispatch(setIsTutor());
  };

  useEffect(() => {
    getUserSchedule()
    if (role === "Tutor") {
      interval = setInterval(gettingNotifications, 5000);
      dispatch(setTutor());
    } else {
      dispatchNotTutor();
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

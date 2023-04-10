import { useSelector } from "react-redux";
import NotificationRow from "./NotificationRow";
function NotificationBodyRightDrawer() {
  const { notifications,notificationlength,isTutor } = useSelector((state) => state.notification);
  const {role}=useSelector(state=>state.auth)
  return (
    <div className="">
      <p>hello</p>
      {
        isTutor ?
        (
          notificationlength>0 ? notifications.map((notification,index) => (
               <NotificationRow notification={notification} key={index}/>
             )):<p>No Notifications</p>
        ):
        <p>No notifications</p>
      }
    </div>
  );
}

export default NotificationBodyRightDrawer;

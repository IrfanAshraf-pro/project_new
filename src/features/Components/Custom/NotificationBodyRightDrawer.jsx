import { useSelector } from "react-redux";
import NotificationRow from "./NotificationRow";
import Mailbox from '../../../assests/Mailbox.svg'
function NotificationBodyRightDrawer() {
  const { notifications,notificationlength,isTutor } = useSelector((state) => state.notification);
  const {role}=useSelector(state=>state.auth)
  const NoNotification=()=>(
    <div className="flex h-full items-center flex-col">
      <img src={Mailbox} className="w-52 h-52"/>
      <p className="text-accent text-3xl font-bold text-center mt-4 drop-shadow-lg shadow-secondary">No Notifications</p>
    </div>
  )
  return (
    <div className="">
      {
        isTutor ?
        (
          notificationlength>0 ? notifications.map((notification,index) => (
               <NotificationRow notification={notification} key={index}/>
             )):<p>{<NoNotification/>}</p>
        ):
        <p>{<NoNotification/>}</p>
      }
    </div>
  );
}

export default NotificationBodyRightDrawer;

import React from "react";
import { TiTick } from "react-icons/ti";
import { RepositoryFactory } from "../../Repository/RepositoryFactory";
import {
  NotifcationRead,
  ReplyToNotification,
  ScheduleNotSet,
} from "../../Utils/MatchTypes";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSchedule } from "../../../app/Slices/ScheduleSlice";
const StudentSimpleNotification = ({ notification }) => {
  const notificationrepo = RepositoryFactory.get("notification");
  var schedulerepo = RepositoryFactory.get("schedule");
  const { role, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const markAsRead = async () => {
    console.log(notification);
    let { data } = await notificationrepo.markStudentNotificationAsRead(
      notification
    );
    if (data.match(ReplyToNotification)) {
      toast.info(data, {
        theme: "colored",
      });
    } else if (data.match(NotifcationRead)) {
    } else {
      console.log(
        "Simple Notification student mark as read reply error: ",
        data
      );
    }
    checkingIfRequestisAccepted(notification.notificationMsg);
  };
  const checkingIfRequestisAccepted = (msg) => {
    const mainString = msg;
    const searchString = "Your Request is Accepted by tutor";

    if (mainString.includes(searchString)) {
      console.log("Checking if request match is True");
      getUserSchedule();
    } else {
      console.log("Checking if request match is False");
    }
  };
  //getting user schedule
  const getUserSchedule = async () => {
    const { data } = await schedulerepo.getStudentSchedule(user.email);
    if (data.length > 100) {
      dispatch(setSchedule({ schedule: data }));
    } else if (data.match(ScheduleNotSet)) {
      toast.warning(data, {
        theme: "colored",
      });
    }
  };
  return (
    <>
      <div
        className="px-3 mb-2 w-full bg-white hover:bg-[#f5f8dd] shadow-md py-2 rounded-md cursor-pointer"
        onClick={markAsRead}
      >
        <div className="flex items-center justify-between w-full">
          <p tabindex="0" className="focus:outline-none text-sm leading-5">
            {notification.notificationMsg}
          </p>
          <div
            tabindex="0"
            aria-label="close icon"
            role="button"
            className="focus:outline-none cursor-pointer"
          >
            <TiTick size={25} className="fill-indigo-600 font-thin" />
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* <div className="mx-2 p-2 ">
        <p>{notification.notificationMsg}</p>
        <span>Mark as Read</span>
      </div> */
}
export default StudentSimpleNotification;

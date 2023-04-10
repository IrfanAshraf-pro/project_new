import React from "react";
import { slotsToStringSlot } from "../../Utils/CourseFunctions";
import {
  NoCourseEnlisted,
  NoRequests,
  RequestAcceptedSuccessfully,
  RequestRejectedSuccessfully,
  ScheduleNotSet,
} from "../../Utils/MatchTypes";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../../../app/Slices/NotificationSlice";
import { RepositoryFactory } from "../../Repository/RepositoryFactory";
import { setSchedule } from "../../../app/Slices/ScheduleSlice";
const NotificationRow = ({ notification }) => {
  const { role, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const slots = slotsToStringSlot(notification.slot);
  var tutor = RepositoryFactory.get("tutor");
  var schedule = RepositoryFactory.get("schedule");


  const onAccept = async () => {
    const { data } = await tutor.AcceptRequest(
      notification.tutoremail,
      notification.studentemail,
      notification.courseid,
      notification.slot
    );
    if (data.match(RequestAcceptedSuccessfully)) {
      toast.success(data, {
        theme: "colored",
      });
      gettingNotifications();
      getUserSchedule()
    } else if (data.match(NoRequests)) {
      toast.info(data, {
        theme: "colored",
      });
      gettingNotifications();
    }
  };
  const OnReject = async () => {
    const { data } = await tutor.RejectRequest(
      notification.tutoremail,
      notification.studentemail,
      notification.courseid,
      notification.slot
    );
    if (data.match(RequestRejectedSuccessfully)) {
      toast.success(data, {
        theme: "colored",
      });
      gettingNotifications();
    } else if (data.match(NoCourseEnlisted)) {
      toast.info(data, {
        theme: "colored",
      });
      gettingNotifications();
    }
  };
  //   getting notifications
  const gettingNotifications = async () => {
    const { data } = await tutor.GetStudentRequests(user.email);
    dispatch(setNotifications({ notifications: data }));
    console.log("new notifications are :", data);
  };

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
  return (
    <div className="bg-secondary/90 px-2 rounded-md mt-2 shadow">
      <div className="flex items-center justify-between">
        <div className="text-white">
          <p>{notification.studentname}</p>
          <p>{notification.coursename}</p>
        </div>
        <div className="flex flex-col text-white">
          {slots.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>
      <div className="flex justify-between pb-2">
        <button
          className="btn btn-accent w-6/12 mt-2 group btn-sm md:btn-md"
          onClick={onAccept}
        >
          Accept
        </button>
        <button
          className="btn btn-accent w-5/12 mt-2 group btn-sm md:btn-md"
          onClick={OnReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default NotificationRow;

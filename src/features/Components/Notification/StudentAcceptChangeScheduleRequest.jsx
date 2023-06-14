import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { RepositoryFactory } from "../../Repository/RepositoryFactory";
import { slotsToStringSlot } from "../../Utils/CourseFunctions";
import { useNavigate } from "react-router-dom";
import {
  CannotChangeSchedule,
  CourseScheduleUpdated,
  finishSuccessful,
  finsihError,
  NotifcationRead,
  NotificationSent,
  NotificationTutorNotExist,
  ReplyToNotification,
  RequestAcceptedButScheduleChangeLater,
  ScheduleNotSet,
} from "../../Utils/MatchTypes";
import { setSchedule } from "../../../app/Slices/ScheduleSlice";

const StudentAcceptChangeScheduleRequest = ({ notification }) => {
  const [message, setMessage] = useState("");
  const [tutorEmail, setTutorEmail] = useState("");
  const [slotsFrom, setSlotsFrom] = useState([]);
  const [slotsTo, setSlotsTo] = useState([]);
  const [slotsToInt, setSlotsToInt] = useState([]);
  const [slotsFromInt, setSlotsFromInt] = useState([]);

  const [courseId, setCourseId] = useState("");
  //
  const courserepo = RepositoryFactory.get("course");
  const schedulerepo = RepositoryFactory.get("schedule");
  const notificationrepo = RepositoryFactory.get("notification");
  //
  const navigation=useNavigate()
  //
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const gettingSlots = (s) => {
    let ss = s.split(",");
    ss.pop();
    let slots = ss;
    let newArr = [];
    for (let index = 0; index < slots.length; index++) {
      let nn = +slots[index] + 1;
      newArr.push(nn);
    }
    const slotNew = slotsToStringSlot(newArr.join(","));
    return slotNew;
  };
  const splitMessage = () => {
    const splitted = notification.notificationMsg.split(";");
    setMessage(splitted[0]);
    setTutorEmail(splitted[1]);
    let slotsFromm = gettingSlots(splitted[2]);
    let slotsToo = gettingSlots(splitted[3]);
    setCourseId(+splitted[5]);
    setSlotsFrom(slotsFromm);
    setSlotsTo(slotsToo);
    //saving int slots
    setSlotsFromInt(splitted[2]);
    setSlotsToInt(splitted[3]);
  };
  //acccepting request
  const AcceptRequest = async () => {
    const splitted = notification.notificationMsg.split(";");
    let enrollDate = splitted[4];
    const { data } = await schedulerepo.acceptEnrollScheduleChangeRequest(
      tutorEmail,
      user.email,
      courseId,
      slotsFromInt,
      slotsToInt,
      enrollDate
    );
    if(data.match(CannotChangeSchedule)){
      toast.info(data)
    }else if(data.match(CourseScheduleUpdated)){
      toast.success(data)
      navigation('/app/profile')
      getUserSchedule()
      markAsRead()
    }else if(data.match(RequestAcceptedButScheduleChangeLater+enrollDate)){
      toast.success(data)
    }else {
      console.log(data);
    }
  };
  //Rejecting request
  const RejectRequest = async () => {
    let learning = {
      tutoremail: tutorEmail,
      studentemail: user.email,
      courseid: courseId,
      coursename: "",
      coursestatus: 0,
    };
    let { data } = await courserepo.finishCourse(learning);
    if (data.match(finishSuccessful)) {
      toast.success(data, {
        theme: "colored",
      });
      markAsRead();
      sendTutorNotification();
      getUserSchedule();
    } else if (data.match(finsihError)) {
      toast.info(data, {
        theme: "colored",
      });
    } else {
      console.log("Error finishing Course", data);
    }
  };
  //
  //Sending notification to tutor
  const sendTutorNotification = async () => {
    let noti = {
      email: tutorEmail,
      notificationType: 0,
      isRead: 0,
      notificationMsg: `Your Schedule update request to ${user.name} has been rejected. The course is therefore finished automatically`,
      notificationReply: "Rejected",
    };
    // sendTutorNotification
    let { data } = await notificationrepo.sendTutorNotification(noti);
    if (data.match(NotificationSent)) {
    } else if (data.match(NotificationTutorNotExist)) {
      toast.info(data, {
        theme: "colored",
      });
    } else {
      console.log("student reschedule request error", data);
    }
  };
  //marking student notification as read
  const markAsRead = async () => {
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
  };
  //getting user schedule
  const getUserSchedule = async () => {
    console.log("getting user schedule");
    const { data } = await schedulerepo.getStudentSchedule(user.email);
    console.log(data);
    dispatchingSchedule(data);
  };
  const dispatchingSchedule = (data) => {
    if (data.length > 100) {
      console.log("schedule is ", data);
      dispatch(setSchedule({ schedule: data }));
    } else if (data.match(ScheduleNotSet)) {
      toast.warning(data, {
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    splitMessage();
  }, []);
  // console.log('StudentAcceptChangeScheduleRequest',notification);
  return (
    <>
      <div className="px-3 mb-2 w-full bg-white hover:bg-[#f5f8dd] shadow-md py-2 rounded-md cursor-pointer">
        <div className="flex  flex-col  w-full">
          <p tabindex="0" className="focus:outline-none text-sm leading-5">
            {message}
          </p>
          <h3 className="text-start text-semibold">Slots From: </h3>
          <div className="flex">
            {slotsFrom.map((item) => (
              <p
                className="my-2 font-normal text-accent pl-2 flex gap-2 items-center flex-wrap"
                key={item}
              >
                <span className="bg-slate-200 shadow-sm px-1 py-1 rounded-md group-hover:bg-white">
                  {item}
                </span>
              </p>
            ))}
          </div>
          <h3 className=" text-start text-semibold">Slots To: </h3>
          <div className="flex">
            {slotsTo.map((item) => (
              <p
                className="my-2 font-normal text-accent pl-2 flex gap-2 items-center flex-wrap"
                key={item}
              >
                <span className="bg-slate-200 shadow-sm px-1 py-1 rounded-md group-hover:bg-white">
                  {item}
                </span>
              </p>
            ))}
          </div>
          <div className="flex w-full gap-4 justify-between">
            <button
              className="px-3 py-1.5 text-accent bg-white shadow-lg rounded-md flex-1 font-thin max-w-md hover:bg-indigo-600 hover:text-primary"
              onClick={AcceptRequest}
            >
              Accept
            </button>
            <button
              className="px-3 py-1.5 text-accent bg-white shadow-lg rounded-md flex-1 font-thin max-w-md hover:bg-indigo-600 hover:text-primary"
              onClick={RejectRequest}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentAcceptChangeScheduleRequest;

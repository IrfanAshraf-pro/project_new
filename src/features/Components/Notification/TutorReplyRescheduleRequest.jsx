import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../../Repository/RepositoryFactory";
import { getSlotNo } from "../../Utils/DateFunctions";
import {
  NotifcationRead,
  NotificationSent,
  NotificationStudentNotExist,
  ReplyToNotification,
} from "../../Utils/MatchTypes";
import StudentRescheduleRequest from "./StudentRescheduleRequest";

const TutorReplyRescheduleRequest = ({ notification }) => {
  const [msg, setMsg] = useState("");
  const [isReschedule, setIsReschedule] = useState(false);
  const [selected, setSelected] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [tdata, setTdata] = useState({
    date: "",
    day: "",
  });
  const [not, setNot] = useState({});
  const notificationrepo = RepositoryFactory.get("notification");
  const splitMessage = () => {
    const splitted = notification.notificationMsg.split(",");
    const notificationMessage = {
      temail: splitted[0],
      coursename: splitted[1],
      semail: splitted[2],
      slot: splitted[3],
      isReschedule: splitted[4],
      isPreschedule: splitted[5],
      classDate: splitted[6],
      msgReply: splitted[7],
    };
    setNot(notificationMessage);
    const str = notificationMessage.semail.split("@")[0];
    const studentname = str.charAt(0).toUpperCase() + str.slice(1);
    let mssg = `${studentname} has requested to reschedule class of ${notificationMessage.classDate} and slot ${notificationMessage.slot}`;
    setMsg(mssg);
    let dayy = notificationMessage.slot.split(" ")[3];
    setTdata({
      date: notificationMessage.classDate,
      day: dayy,
    });
    let val = getSlotNo(notificationMessage.slot);
    let item = {
      classDate: null,
      ClassDay: dayy,
      coursename: notificationMessage.coursename,
      email: notificationMessage.semail,
      name: "",
      slot: notificationMessage.slot,
      slotno: val,
    };
    setSelected(item);
  };
  const onAccept = () => {
    setIsReschedule(true);
  };
  const getDayCustom = (day) => {
    switch (day) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
    }
  };
  const splittingNotification = () => {
    const splitted = notification.notificationMsg.split(",");
    const notificationMessage = {
      temail: splitted[0],
      coursename: splitted[1],
      semail: splitted[2],
      slot: splitted[3],
      isReschedule: splitted[4],
      isPreschedule: splitted[5],
      classDate: splitted[6],
      msgReply: splitted[7],
    };
    return notificationMessage;
  };
  const OnReject=()=>{
    sendStudentNotificationReject()
    sendTutorNotificationReject()
  }
  //Reject Notifications
  const sendStudentNotificationReject=async()=>{
    let noti = splittingNotification();
    let notification = {
      email: noti.semail,
      notificationType: 0,
      isRead: 0,
      notificationMsg: `Your reschedule request for ${noti.slot} on date ${noti.classDate} has been cancelled by tutor`,
      notificationReply: "",
    };
    let { data } = await notificationrepo.sendStudentNotification(notification);
    if (data.match(NotificationSent)) {
      toast.success(data);
    } else if (data.match(NotificationStudentNotExist)) {
      toast.info(data);
    } else {
      console.log(
        "error in sending notification to student when cstudent reschedule class request is rejected",
        data
      );
    }
  }
  const sendTutorNotificationReject =async () => {
    let mss={...notification,notificationReply:"Rejected"}
    let {data}=await notificationrepo.markTutorNotificationAsRead(mss)
    if (data.match(ReplyToNotification)) {
        toast.info(data, {
          theme: "colored",
        });
      } else if (data.match(NotifcationRead)) {
      } else {
        console.log("Simple Notification tutor mark as read reply error: ", data);
      }
  };


  //Accept notifications
//   error heeeeeerereeer
  const sendTutorNotification =async () => {
    let mss={...notification,notificationReply:"OK"}
    let {data}=await notificationrepo.markTutorNotificationAsRead(mss)
    if (data.match(ReplyToNotification)) {
        toast.info(data, {
          theme: "colored",
        });
      } else if (data.match(NotifcationRead)) {
      } else {
        console.log("Simple Notification tutor mark as read reply error: ", data);
      }
  };
  const sendNotification = async () => {
    // sendStudentNotification
    let noti = splittingNotification();
    let notification = {
      email: noti.semail,
      notificationType: 0,
      isRead: 0,
      notificationMsg: `Your class ${noti.slot} on date ${noti.classDate} has been rescheduled by tutor`,
      notificationReply: "",
    };
    let { data } = await notificationrepo.sendStudentNotification(notification);
    if (data.match(NotificationSent)) {
      toast.success(data);
    } else if (data.match(NotificationStudentNotExist)) {
      toast.info(data);
    } else {
      console.log(
        "error in sending notification to student when cstudent reschedule class request is accepted",
        data
      );
    }
  };
  useEffect(() => {
    if (isDone) {
      setIsReschedule(false);
      sendTutorNotification();
      sendNotification()
      console.log("is done is true");
    }
  }, [isDone]);
  useEffect(() => {
    splitMessage();
  }, []);

  return (
    <>
      <div className="px-3 mb-2 w-full bg-white hover:bg-[#daf3f7] shadow-md py-2 rounded-md cursor-pointer group">
        <div className="flex flex-col ">
          <p className="focus:outline-none text-sm leading-5">{msg}</p>
          <p className="my-2 font-normal text-accent pl-2 flex gap-2 items-center flex-wrap">
            <span className="bg-slate-200 shadow-sm px-1 py-1 rounded-md group-hover:bg-white">
              {not.slot}
            </span>
          </p>
          <div className="flex w-full gap-4 justify-between">
            <button
              className="px-3 py-1.5 text-accent bg-white shadow-lg rounded-md flex-1 font-thin max-w-md hover:bg-indigo-600 hover:text-primary"
              onClick={onAccept}
            >
              Reschedule
            </button>
            <button
              className="px-3 py-1.5 text-accent bg-white shadow-lg rounded-md flex-1 font-thin max-w-md hover:bg-indigo-600 hover:text-primary"
              onClick={OnReject}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <StudentRescheduleRequest
        isReschedule={isReschedule}
        setIsReschedule={setIsReschedule}
        selected={selected}
        tdata={tdata}
        setIsDone={setIsDone}
      />
    </>
  );
};

export default TutorReplyRescheduleRequest;

import React, { useState, useEffect } from "react";
import { slotsToStringSlot } from "../../Utils/CourseFunctions";
import { toast } from "react-toastify";
import {
  NotifcationRead,
  NotificationSent,
  NotificationTutorNotExist,
  ReplyToNotification,
  ScheduleDoesnotExist,
  ScheduleNotSet,
  ScheduleUpdatedSuccessfully,
} from "../../Utils/MatchTypes";
import { RepositoryFactory } from "../../Repository/RepositoryFactory";
import { useDispatch, useSelector } from "react-redux";
import { setSchedule } from "../../../app/Slices/ScheduleSlice";

const ReplyableNotification = ({ notification }) => {
  const [message, setMessage] = useState("");
  const [classes, setClasses] = useState([]);
  const [slotsShow, setSlotsShow] = useState([]);
  const [slotsValue, setSlotsValue] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const repo = RepositoryFactory.get("schedule");
  const notificationrepo = RepositoryFactory.get("notification");
  const schedule = RepositoryFactory.get("schedule");
  const gettingClassesData = async () => {
    const msg = notification.notificationMsg.split(";");
    setMessage(msg[0]);
    // dividing slots to array and mapping on state
    const slotString = msg[1]?.substring(0, msg[1]?.length - 1);
    const slotArr = slotString.split(",");
    setSlotsValue(slotArr);
    // calling schedule functions and mapping slots
    const slot = msg[1]?.substring(0, msg[1]?.length - 1);
    const slotShow = slotsToStringSlot(slot);
    setSlotsShow(slotShow);
    //   setClasses(data);
    // console.log("msg slot is ", msg[1]);
    // console.log("slotShow", slotShow);
    // console.log("slotsValue", slotsValue);
  };
  const handleCheckBox = (e) => {
    if (selectedValues[e.target.name]) {
      const name = e.target.name;
      delete selectedValues[name];
      setSelectedValues(selectedValues);
      return;
    }
    setSelectedValues({ ...selectedValues, [e.target.name]: e.target.value });
  };
  const updateSchedule = async () => {
    // console.log("selected slots", selectedValues);
    // console.log("matched slots are ", classes);
    // console.log("slots value ", slotsValue);
    //new logic to check noOfSlots Matched Or not
    let keysList = Object.keys(selectedValues).length;
    if (keysList >= 1) {
      let valuesString = Object.values(selectedValues).join(",");
      console.log("valuesString", valuesString);
      let { data } = await repo.updateStudentSlot(user.email, valuesString);
      if (data.match(ScheduleUpdatedSuccessfully)) {
        markAsRead();
        fetchLatestSchedule();
        toast.success(data, {
          theme: "colored",
        });
      } else if (data.match(ScheduleDoesnotExist)) {
        toast.info(data);
      } else {
        console.log("error in updating single schedule slot", data);
      }
      //send schedule update request
    } else {
      toast.info("Please select atleast one slot.");
    }
  };
  const markAsRead = async () => {
    let noti = {
      id:notification.id,
      email: notification.email,
      notificationType: notification.notificationType,
      isRead: 1,
      notificationMsg: notification.notificationMsg,
      notificationReply: "Schedule Updated",
    };
    let mess = `Your slot update request has been accepted by ${user.name}`;
    sendTutorNotification(mess);
    let { data } = await notificationrepo.markStudentNotificationAsRead(noti);
    if (data.match(ReplyToNotification)) {
      toast.info(data, {
        theme: "colored",
      });
    } else if (data.match(NotifcationRead)) {
    } else {
      console.log(
        "student replyable Notification student mark as read reply error: ",
        data
      );
    }
  };
  const cancelRequest = async () => {
    let noti = {
      id:notification.id,
      email: notification.email,
      notificationType: 1,
      isRead: 1,
      notificationMsg: notification.notificationMsg,
      notificationReply: "Request Rejected",
    };
    let mess = `Your slot update request has been rejected by ${user.name}`;
    console.log(noti);
    sendTutorNotification(mess);
    let { data } = await notificationrepo.markStudentNotificationAsRead(noti);
    if (data.match(ReplyToNotification)) {
      toast.info(data, {
        theme: "colored",
      });
    } else if (data.match(NotifcationRead)) {
    } else {
      console.log(
        "student replyable Notification student mark as read reply error: ",
        data
      );
    }
  };
  const sendTutorNotification = async (mess) => {
    let tutoremail = notification.notificationMsg.split(";")[2];
    let noti = {
      email: tutoremail,
      notificationType: 0,
      isRead: 0,
      notificationMsg: mess,
      notificationReply: "",
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
  const fetchLatestSchedule = async () => {
    const { data } = await schedule.getStudentSchedule(user.email);
    if (data.length > 100) {
      dispatch(setSchedule({ schedule: data }));
      console.log('schedulke dispatched aferr accepitnf',data);
    } else if (data.match(ScheduleNotSet)) {
      toast.warning(data, {
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    gettingClassesData();
    return () => {
      setMessage("");
      setClasses([]);
      setSlotsShow([]);
      setSlotsValue([]);
      setSelectedValues({});
    };
  }, []);

  return (
    <div>
      <div className="px-3 mb-2 w-full bg-white hover:bg-[#f5f8dd] shadow-md py-2 rounded-md cursor-pointer">
        <div className="flex flex-col items-center justify-between w-full">
          <p tabindex="0" className="focus:outline-none text-sm leading-5">
            {message}
          </p>
          <div className="grid grid-cols-2 px-2 mb-4 gap-3 md:gap-4  justify-between overflow-x-hidden">
            {slotsShow.map((item, index) => (
              <label
                key={index}
                className="text-secondary flex  items-center justify-start w-[500px]"
              >
                <input
                  type="checkbox"
                  id={index}
                  name={index}
                  value={slotsValue[index]}
                  // checked={isChecked}
                  onChange={handleCheckBox}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 mr-1"
                />
                {item}
              </label>
            ))}
          </div>
          <div className="flex w-full gap-4 justify-between">
            <button
              className="px-3 py-1.5 text-accent bg-white shadow-lg rounded-md flex-1 font-thin max-w-md hover:bg-indigo-600 hover:text-primary"
              onClick={updateSchedule}
            >
              Update Schedule
            </button>
            <button
              className="px-3 py-1.5 text-accent bg-white shadow-lg rounded-md flex-1 font-thin max-w-md hover:bg-indigo-600 hover:text-primary"
              onClick={cancelRequest}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyableNotification;

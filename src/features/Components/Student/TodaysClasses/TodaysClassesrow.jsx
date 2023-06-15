import React from "react";
import { useSelector } from "react-redux";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { toast } from "react-toastify";
import {
  NotificationSent,
  NotificationTutorNotExist,
} from "../../../Utils/MatchTypes";

const TodaysClassesrow = ({ classes }) => {
  const { role, user } = useSelector((state) => state.auth);
  const notificationrepo = RepositoryFactory.get("notification");
  const onClick = async () => {
    const msg = `${classes.temail},${classes.coursename},${user.email},${classes.slot},${classes.isReschedule},${classes.isPreSchedule},${classes.classDate},`;
    let notification = {
      email: classes.temail,
      notificationType: 1,
      isRead: 0,
      notificationMsg: msg,
      notificationReply: "",
    };
    // sendTutorNotification
    let { data } = await notificationrepo.sendTutorNotification(notification);
    if (data.match(NotificationSent)) {
      toast.success(data+" Please wait for Tutor Reply", { theme: "colored" });
    } else if (data.match(NotificationTutorNotExist)) {
      toast.info(data, {
        theme: "colored",
      });
    } else {
      console.log("student reschedule request error", data);
    }
  };
  return (
    <div className="group">
      <div className="bg-base-100 p-2 rounded-md flex flex-col md:flex-row md:gap-2 text-secondary ">
        <div className="flex items-center mb-2 justify-between  md:flex-1">
          <p>{classes.coursename}</p>
          <p>{classes.name}</p>
          <p>{classes.slot}</p>
        </div>
        <div className="flex justify-start md:justify-end pb-2">
          {/* {&& ( */}
          <button
            className={`${
              classes.isReschedule | classes.isPreSchedule && "btn-disabled"
            }
            px-3 py-1.5 text-white font-semibold shadow-lg rounded-md flex-1  w-[95%] sm:w-40 bg-indigo-700  hover:bg-white hover:text-indigo-600 duration-75  mx-auto hover:cursor-pointer`}
            onClick={onClick}
          >
            Reschedule
          </button>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default TodaysClassesrow;

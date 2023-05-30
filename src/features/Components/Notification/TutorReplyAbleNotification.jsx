import React from "react";
import { slotsToStringSlot } from "../../Utils/CourseFunctions";
import { useDispatch, useSelector } from "react-redux";
import { RepositoryFactory } from "../../Repository/RepositoryFactory";
import {
  NoCourseEnlisted,
  NoRequests,
  RequestAcceptedSuccessfully,
  RequestRejectedSuccessfully,
  ScheduleNotSet,
} from "../../Utils/MatchTypes";
import { toast } from "react-toastify";
import { setSchedule } from "../../../app/Slices/ScheduleSlice";
const TutorReplyAbleNotification = ({ notification }) => {
  const { role, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const slots = slotsToStringSlot(notification.slot);
  var tutorrepo = RepositoryFactory.get("tutor");
  var schedulerepo = RepositoryFactory.get("schedule");

  const onAccept = async () => {
    const { data } = await tutorrepo.AcceptRequest(
      notification.tutoremail,
      notification.studentemail,
      notification.courseid,
      notification.slot
    );
    if (data.match(RequestAcceptedSuccessfully)) {
      toast.success(data, {
        theme: "colored",
      });
      getUserSchedule();
    } else if (data.match(NoRequests)) {
      toast.info(data, {
        theme: "colored",
      });
    }
  };
  const OnReject = async () => {
    const { data } = await tutorrepo.RejectRequest(
      notification.tutoremail,
      notification.studentemail,
      notification.courseid,
      notification.slot
    );
    if (data.match(RequestRejectedSuccessfully)) {
      toast.success(data, {
        theme: "colored",
      });
    } else if (data.match(NoCourseEnlisted)) {
      toast.info(data, {
        theme: "colored",
      });
    }
  };
  //getting user schedule
  const getUserSchedule = async () => {
    const { data } = await schedulerepo.getTutorSchedule(user.email);
    console.log(data);
    dispatchingSchedule(data);
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
  return (
    <>
      <div className="px-3 mb-2 w-full bg-white hover:bg-[#daf3f7] shadow-md py-2 rounded-md cursor-pointer group">
        <div className="flex flex-col ">
          <div className="flex items-center justify-between px-2 ">
            <p className="text-secondary font-semibold text-sm leading-5 group-hover:text-accent">
              {notification.studentname}
            </p>
            <p className="text-secondary font-semibold text-sm leading-5 group-hover:text-accent">
              {notification.coursename}
            </p>
          </div>
          <p className="my-2 font-normal text-accent pl-2 flex gap-2 items-center flex-wrap">
            {slots.map((item, index) => (
              <span
                className="bg-slate-200 shadow-sm px-1 py-1 rounded-md group-hover:bg-white"
                key={index}
              >
                {item}
              </span>
            ))}
          </p>
          <div className="flex w-full gap-4 justify-between">
            <button
              className="px-3 py-1.5 text-accent bg-white shadow-lg rounded-md flex-1 font-thin max-w-md hover:bg-indigo-600 hover:text-primary"
              onClick={onAccept}
            >
              Accept
            </button>
            <button
              className="px-3 py-1.5 text-accent bg-white shadow-lg rounded-md flex-1 font-thin max-w-md hover:bg-indigo-600 hover:text-primary"
              onClick={OnReject}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorReplyAbleNotification;

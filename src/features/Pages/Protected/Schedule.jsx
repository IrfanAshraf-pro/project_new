import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setPageTitle } from "../../../app/Slices/Dashboard/HeaderSlice";
import { setSchedule } from "../../../app/Slices/ScheduleSlice";
import ScheduleRow from "../../Components/ScheduleRow";
import { RepositoryFactory } from "../../Repository/RepositoryFactory";
import {
  ScheduleSetSuccessfully,
  ScheduleUpdatedSuccessfully,
} from "../../Utils/MatchTypes";
import {
  days,
  timeslots,
  slots,
  SplitingSchedule,
  JoiningSchedule,
} from "../../Utils/ScheduleFunctions";
const scheduleRepo = RepositoryFactory.get("schedule");
const ScheduleMain = () => {
  const { schedule } = useSelector((state) => state.schedule);
  const { role, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [schedulee, setSchedulee] = useState(SplitingSchedule(schedule));
  // updating schedulee state
  const handleScheduleUpdate = (schedules) => {
    const newSchedule = schedulee.map((item) => {
      return item.row === schedules.row ? schedules : item;
    });
    setSchedulee(newSchedule);
  };
  // saving schedule to db
  const saveSchedule = async () => {
    const newScheduleCombined = JoiningSchedule(schedulee);
    if (role === "Student") {
      const { data } = await scheduleRepo.postStudentSchedule(
        user.email,
        newScheduleCombined
      );
      handlingScheduleSave(data);
    } else {
      const { data } = await scheduleRepo.postTutorSchedule(
        user.email,
        newScheduleCombined
      );
      handlingScheduleSave(data);
    }
    changeScheduleInstore();
  };
  const handlingScheduleSave = (data) => {
    if (data.match(ScheduleSetSuccessfully)) {
      toast.success(data, {
        theme: "colored",
      });
    } else if (data.match(ScheduleUpdatedSuccessfully)) {
      toast.success(data, {
        theme: "colored",
      });
    }
  };
  // changing schedule in store
  const changeScheduleInstore = () => {
    const newScheduleCombined = JoiningSchedule(schedulee);
    dispatch(setSchedule({ schedule: newScheduleCombined }));
  };
  useEffect(() => {
    setSchedulee(SplitingSchedule(schedule));
  }, [schedule]);
  // dispatching schedule when component is unmounted
  useEffect(() => {
    return () => {
      changeScheduleInstore();
    };
  }, []);

  // setting page title
  useEffect(() => {
    dispatch(setPageTitle({ title: "Schedule" }));
  }, []);
  return (
    <div className="flex flex-col ">
      <div className="my-2 flex justify-end w-[90%]  gap-4 ">
        <button
          className="btn btn-circle btn-accent btn-sm"
          onClick={saveSchedule}
        >
          ✔
        </button>
        {role === "Tutor" ? (
          <Link
            className="px-6 py-1.5 text-accent bg-white shadow-lg rounded-md  font-thin  hover:bg-indigo-600 hover:text-primary"
            to="/app/updateschedule"
          >
            Update
          </Link>
        ) : (
          <Link
            className="px-6 py-1.5 text-accent bg-white shadow-lg rounded-md  font-thin  hover:bg-indigo-600 hover:text-primary"
            to="/app/GetExtraSessions"
          >
            Get Extra sessions
          </Link>
        )}
      </div>
      <div className="mx-auto w-[95%]  sm:w-[85%] ">
        <div className="flex  rounded-lg cshadow">
          <div className="w-[25%] pl-1 pt-7 bg-secondary/90  text-white  rounded-tl-lg rounded-bl-lg md:pt-10 lg:pt-[45px]">
            {timeslots.map((slot, index) => (
              <div
                className="flex  pt-2 md:pt-0"
                style={{ height: "28px" }}
                key={index}
              >
                <p className="text-xs xl:w-7/12 md:text-sm lg:text-base">
                  {slot.time}
                </p>
              </div>
            ))}
          </div>
          <div className="w-9/12  rounded-tr-lg">
            <div className="flex justify-between px-1 py-2 rounded-tr-lg align-center bg-secondary text-white">
              {days.map((day, index) => (
                <p
                  key={index}
                  className={`text-xs md:text-sm lg:text-base font-bold w-[10%] ${
                    index > 3 && "text-center"
                  }`}
                >
                  {day}
                </p>
              ))}
            </div>
            <div className="flex flex-col px-2 bg-base-200 rounded-2 rounded-br-md gap-[4.2px] md:gap-[4.4px] lg:gap-[4.58px]">
              {slots.map((slot, index) => (
                <div key={index}>
                  <ScheduleRow
                    schedule={schedulee[index]}
                    handleScheduleUpdate={handleScheduleUpdate}
                    // isAllTrue={checkingIfAllTrue(schedule[index])}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMain;

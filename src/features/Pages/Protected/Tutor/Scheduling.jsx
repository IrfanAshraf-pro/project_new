import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { toast } from "react-toastify";
import ReschedulingRow from "../../../Components/Tutor/Rescheduling/ReschedulingRow";
import RescheduleModal from "../../../Components/Tutor/Rescheduling/RescheduleModal";
import RescheduleInfoModal from "../../../Components/Tutor/Rescheduling/RescheduleInfoModal";
import PreScheduleModal from "../../../Components/Tutor/Rescheduling/PreScheduleModal";
import { dateChecker } from "../../../Utils/DateFunctions";
import EmptyImg from "../../../../assests/noClass.svg";

const Scheduling = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [classes, setClasses] = useState([]);
  const [selected, setSelected] = useState({});
  const [isReschedule, setIsReschedule] = useState(false);
  const [isPreschedule, setIsPreschedule] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [tdata, setTdata] = useState({
    date: "",
    day: "",
  });
  const { user } = useSelector((state) => state.auth);
  // repository
  const repo = RepositoryFactory.get("reschedule");
  const onClick = () => {
    let date = dateChecker(startDate);
    console.log("date selected is", date);
    gettingClasses(date, startDate.getDay());
  };
  const gettingClasses = async (date, dayc) => {
    setSelected({})
    let day = getDayCustom(dayc);
    console.log("getting data");
    let dataSet = {
      day,
      date,
    };
    setTdata(dataSet);
    setClasses([]);
    const { data } = await repo.getClassesToReschedule(user.email, date, day);
    if (typeof data === "object") {
      setClasses(data);
      console.log("getting classes are ", data);
    } else {
      toast.info(data, {
        theme: "colored",
      });
    }
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

  useEffect(() => {
    if (isDone) {
      setClasses([]);
      setSelected({});
      setIsReschedule(false);
      setIsPreschedule(false);
      setIsDone(false);
      setTdata({});
    }

    return () => {
      setClasses([]);
      setSelected({});
      setIsReschedule(false);
      setIsPreschedule(false);
      setIsDone(false);
      setTdata({});
    };
  }, [isDone]);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="mt-8 space-x-4 flex items-center justify-center flex-col sm:flex-row gap-3">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="mx-auto w-64 text-white bg-accent ml-6 md:ml-0"
          />
          <button
            className="btn btn-primary w-full md:w-52 hover:btn-accent text-accent hover:text-white"
            onClick={onClick}
          >
            Search Classes
          </button>
        </div>
        {classes.length > 0? (
          <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral w-full md:max-w-lg">
            {
            classes.map((classitem) => (
              <ReschedulingRow
                item={classitem}
                key={classitem.slotno}
                setSelected={setSelected}
              />
            ))}
          </div>
        ):
        (<div className="flex flex-col md:max-w-xl mx-auto">
        <img
          src={EmptyImg}
          alt="no class"
          className="w-64 md:w-72"
        />
        <p className="text-center font-semibold text-2xl">No Class</p>
      </div>)}
      </div>
      <RescheduleModal
        selected={selected}
        startDate={startDate}
        setIsReschedule={setIsReschedule}
        setIsPreschedule={setIsPreschedule}
      />
      <RescheduleInfoModal
        isReschedule={isReschedule}
        setIsReschedule={setIsReschedule}
        selected={selected}
        tdata={tdata}
        setIsDone={setIsDone}
      />
      <PreScheduleModal
        isPreschedule={isPreschedule}
        setIsPreschedule={setIsPreschedule}
        selected={selected}
        tdata={tdata}
        setIsDone={setIsDone}
      />
    </>
  );
};

export default Scheduling;

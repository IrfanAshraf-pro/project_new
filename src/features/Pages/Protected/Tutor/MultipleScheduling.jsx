import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { dateChecker } from "../../../Utils/DateFunctions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MultipleReschedulingRow from "../../../Components/Tutor/Rescheduling/MultipleReschedulingRow";
import MultipleRescheduleModal from "../../../Components/Tutor/Rescheduling/MultipleRescheduleModal";
import { PrescheduleSuccessful } from "../../../Utils/MatchTypes";
const MultipleScheduling = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [classes, setClasses] = useState([]);
  const [suggestedClasses, setSuggestedClasses] = useState([]);
  const [selected, setSelected] = useState({});
  const [isMultiple, setIsMultiple] = useState(false);
  const repo = RepositoryFactory.get("reschedule");
  const { user } = useSelector((state) => state.auth);
  //RESCHEDULING SINGLE CLASS
  const RescheduleClass = async(classs) => {
    let preschedule = {
      semail: selected.email,
      temail: user.email,
      coursename: selected.coursename,
      slotno: selected.slotno,
      date: selected.classDate,
      day: selected.ClassDay,
      tday: classs.ClassDay,
      tdate: classs.classDate,
      tslotno: classs.slotno,
    };
    console.log('preschedule object is :',preschedule);
    console.log("class in multiple reschedule is ", classs);
    const { data } = await repo.preScheduleClass(preschedule);
    if (data.match(PrescheduleSuccessful)) {
      toast.success(data, {
        theme: "colored",
      });
      gettingClasses()
    } else {
      console.log("Preschedule ", data);
    }
  };
  const getSuggestedClasses = async (classs) => {
    // search classes after end date to a certain time period
    let startdate = dateChecker(startDate);
    let enddate = dateChecker(endDate);
    let startDay = getDayCustom(startDate.getDay());
    let endDay = getDayCustom(endDate.getDay());
    const { data } = await repo.getMultipleSuggestedClasses(
      user.email,
      classs.email,
      startdate,
      startDay,
      enddate,
      endDay,
      classs.classDate,
      classs.coursename
    );
    if (data.length > 0) {
      setSuggestedClasses(data);
    } else {
      console.log("Multiple suggested classes data error or info: ", data);
    }
  };
  // SETTING SELECTED CLASS
  const setSelectedClass = (classs) => {
    setIsMultiple(true);
    setSelected(classs);
    // Selected class
    console.log('selected classs is ,',classs);
    getSuggestedClasses(classs);
  };
  // GETTING ALL CLASSES
  const gettingClasses = async () => {
    let startdate = dateChecker(startDate);
    let enddate = dateChecker(endDate);
    let startDay = getDayCustom(startDate.getDay());
    let endDay = getDayCustom(endDate.getDay());
    setClasses([]);
    if (endDate < startDate) {
      toast.info("End date must be greater than start date");
    } else {
      console.log("end date is equal or greater than start day");
      const { data } = await repo.getClassesForMultipleRescheduling(
        user.email,
        startdate,
        startDay,
        enddate,
        endDay
      );
      if (typeof data === "object") {
        setClasses(data);
        console.log("getting classes are ", data);
      } else {
        toast.info(data, {
          theme: "colored",
        });
      }
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
  const onClick = () => {
    gettingClasses();
  };
  return (
    <div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="">
              <p className="text-left text-lg font-semibold text-secondary">
                Start Date:
              </p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="mx-auto  w-80 md:w-64 text-white bg-accent "
              />
            </div>
            <div className="">
              <p className="text-left text-lg font-semibold  text-secondary">
                End Date:
              </p>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="mx-auto w-80 md:w-64 text-white bg-accent"
              />
            </div>
          </div>
          <div className="max-w-xl mt-3 flex flex-col md:flex-row gap-3">
            <button
              className="btn btn-primary w-64 max-w-sm  hover:btn-accent text-accent hover:text-white"
              onClick={onClick}
            >
              Search Classes
            </button>
          </div>
        </div>
        <div className="overflow-hidden flex flex-col h-full p-2 md:p-4   w-full sm:w-[90%] md:w-[80%] mx-auto ">
          {classes.length > 0 && (
            <div className="flex flex-col h-60  overflow-y-scroll gap-3 p-3 px-4 rounded-md shadow-xl shadow-primary bg-neutral">
              {classes.map((classitem) => (
                <MultipleReschedulingRow
                  item={classitem}
                  key={classitem.classDate}
                  setSelected={setSelectedClass}
                  selected={selected}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <MultipleRescheduleModal
        setIsMultiple={setIsMultiple}
        isMultiple={isMultiple}
        RescheduleClass={RescheduleClass}
        classes={suggestedClasses}
      />
    </div>
  );
};

export default MultipleScheduling;

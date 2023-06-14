import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { toast } from "react-toastify";
import PreRescheduleInfoRow from "./PreScheduleInfoRow";
import { dateChecker } from "../../../Utils/DateFunctions";
import { PrescheduleSuccessful } from "../../../Utils/MatchTypes";
import RequestSlots from "./RequestSlots";
const PreScheduleModal = ({
  isPreschedule,
  setIsPreschedule,
  selected,
  tdata,
  setIsDone,
}) => {
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState({});
  const [classes, setClasses] = useState([]);
  const [isRequestSlots, setIsRequestSlots] = useState(false)
  const reschedulerepo = RepositoryFactory.get("reschedule");
  const { user } = useSelector((state) => state.auth);
  // getting free classes
  const searchClasses = async () => {
    setClasses([]);
    let dateJoined = dateChecker(date);
    const day = getDayCustom(date.getDay());
    const { data } = await reschedulerepo.getFreeClassesToRescheduleTo(
      user.email,
      selected.email,
      dateJoined,
      day,
      selected.coursename
    );
    if (data.length > 0) {
      console.log("classes are", data);
      setClasses(data);
    } else {
      toast.info(data, {
        theme: "colored",
      });
    }
  };
  // Suggested classes
  const SuggestedClasses = async () => {
    const { data } = await reschedulerepo.getSuggestedClasesForRescheduling(
      user.email,
      selected.email,
      tdata.date,
      tdata.day,
      selected.coursename
    );
    if (typeof data === "object") {
      setClasses(data);
    } else {
      toast.info(data, {
        theme: "colored",
      });
    }
  };
  //    get both classes from db tutors and student's then populate them in options on button click

  const PrescheduleClass = async () => {
    let preSchedule = {
      semail: selected.email,
      temail: user.email,
      coursename: selected.coursename,
      slotno: selected.slotno,
      date: tdata.date,
      day: tdata.day,
      tday: selectedSlot.ClassDay,
      tdate: selectedSlot.classDate,
      tslotno: selectedSlot.slotno,
    };
    const { data } = await reschedulerepo.preScheduleClass(preSchedule);
    if (data.match(PrescheduleSuccessful)) {
      toast.success(data, {
        theme: "colored",
      });
      setIsDone(true);
    } else {
      console.log("Preschedule ", data);
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
    if (isPreschedule) {
      SuggestedClasses();
    }
  }, [isPreschedule]);
  useEffect(() => {
    return () => {
      setSelectedSlot({});
      setClasses([]);
    };
  }, []);
  return (
    <div>
      <input
        checked={isPreschedule | false}
        onChange={setIsPreschedule}
        type="checkbox"
        id="preschedulemodal"
        className="modal-toggle"
      />
      <div
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="flex items-center justify-between px-4">
          <h3 className="font-bold text-lg">Preschedule</h3>
          <label htmlFor="preschedulemodal" className="font-bold text-lg cursor-pointer hover:text-accent">X</label>
          </div>
          <div className="mt-1 w-full max-w-lg flex flex-col md:flex-row gap-2 ">
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="mx-auto w-56 text-white bg-accent"
            />
            <button
              className="btn btn-outline btn-outline-accent hover:btn-accent text-accent hover:text-white"
              onClick={searchClasses}
            >
              Search Classes
            </button>
          </div>
          {classes.length > 0 ? (
            <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral w-full md:max-w-lg">
              {classes?.map((classs) => (
                <PreRescheduleInfoRow
                  item={classs}
                  setSelectedSlot={setSelectedSlot}
                  selectedSlot={selectedSlot}
                  key={classs.slot}
                />
              ))}
              <div className="mt-2 flex items-center justify-end mb-16 md:mb-2">
                <label
                  htmlFor="rescheduleinfomodal"
                  className="btn btn-accent hover:btn-primary text-white hover:text-accent"
                  onClick={PrescheduleClass}
                >
                  PreSchedule
                </label>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 my-3 mt-4">
              <p className="font-bold text-3xl">No Free Slot</p>
              {/* The button to open modal */}
              <label
                htmlFor="requestingslots"
                className="px-4 py-2 text-white bg-accent shadow-lg rounded-md flex-1 font-thin max-w-md hover:bg-indigo-600 hover:text-primary"
                onClick={()=>setIsRequestSlots(true)}
              >
                Request Free Slot
              </label>
            </div>
          )}
        </div>
      </div>

      <RequestSlots isRequestSlots={isRequestSlots} selected={selected}/>
    </div>
  );
};

export default PreScheduleModal;

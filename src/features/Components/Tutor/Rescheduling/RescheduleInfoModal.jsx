import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { toast } from "react-toastify";
import RescheduleInfoRow from "./RescheduleInfoRow";
import { useEffect } from "react";
import { dateChecker } from "../../../Utils/DateFunctions";
import { RescheduleSuccessful } from "../../../Utils/MatchTypes";
const RescheduleInfoModal = ({
  isReschedule,
  setIsReschedule,
  selected,
  tdata,
  setIsDone
}) => {
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState({});
  const [classes, setClasses] = useState([]);
  const reschedulerepo = RepositoryFactory.get("reschedule");
  const { user } = useSelector((state) => state.auth);
  // getting free classes
  const searchClasses = async () => {
    setClasses([]);
    let dateJoined=dateChecker(date)
    const day = getDayCustom(date.getDay());
    const { data } = await reschedulerepo.getFreeClassesToRescheduleTo(
      user.email,
      selected.email,
      dateJoined,
      day,
      selected.coursename
    );
    if (data.length > 0) {
      setClasses(data);
      console.log('Searched Classes are :',data);

    } else {
      toast.info(data, {
        theme: "colored",
      });
    }
  };
  const SuggestedClasses = async () => {
    console.log("inside sugested classs");
    const { data } = await reschedulerepo.getSuggestedClasesForRescheduling(
      user.email,
      selected.email,
      tdata.date,
      tdata.day,
      selected.coursename
    );
    if (data) {
      console.log('suggested reschedule classes are :',data);
      setClasses(data);
    } else {
      toast.info(data, {
        theme: "colored",
      });
    }
  };
  //    get both classes from db tutors and student's then populate them in options on button click

  const rescheduleClass = async () => {
    // let dateJoined=dateChecker(date)
    // const day = getDayCustom(date.getDay());
    let reschedule = {
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
    console.log('reschedule object is :',reschedule);
    const { data } = await reschedulerepo.rescheduleClass(reschedule);
    if (data.match(RescheduleSuccessful)) {
      toast.success(data,{
        theme:'colored'
      })
      setIsDone(true)
    }else{
      console.log('reschedule ',data);
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
    if (isReschedule) {
      SuggestedClasses();
    }
  }, [isReschedule]);

  useEffect(() => {
    return () => {
      setSelectedSlot({});
      setClasses([]);
    };
  }, []);
  return (
    <div>
      <input
        checked={isReschedule | false}
        onChange={setIsReschedule}
        type="checkbox"
        id="rescheduleinfomodal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box  w-full px-8 ">
          <h3 className="font-bold text-lg">Reschedule</h3>
          <p className="py-1">Select date</p>
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
          <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral w-full md:max-w-lg">
            {classes.length > 0 ? (
              classes.map((classs) => (
                <RescheduleInfoRow
                  item={classs}
                  setSelectedSlot={setSelectedSlot}
                  selectedSlot={selectedSlot}
                  key={classs.slot}
                />
              ))
            ) : (
              <p className="font-bold text-lg">No Free Slot</p>
            )}
          </div>
          <div className="mt-2 flex items-center justify-end mb-16 md:mb-2">
            <label
              htmlFor="rescheduleinfomodal"
              className="btn btn-accent hover:btn-primary text-white hover:text-accent"
              onClick={rescheduleClass}
            >
              Reschedule
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduleInfoModal;

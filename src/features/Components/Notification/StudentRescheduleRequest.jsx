import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { RepositoryFactory } from "../../Repository/RepositoryFactory";
import { toast } from "react-toastify";
import { dateChecker } from "../../Utils/DateFunctions";
import { RescheduleSuccessful } from "../../Utils/MatchTypes";
import StudentRescheduleModalRow from "./StudentRescheduleModalRow";

const StudentRescheduleRequest = ({
  isReschedule,
  setIsReschedule,
  selected,
  tdata,
  setIsDone,
}) => {
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState({});
  const [classes, setClasses] = useState([]);
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
      setClasses(data);
      console.log("Searched Classes are :", data);
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
      console.log("suggested reschedule classes are :", data);
      setClasses(data);
    } else {
      toast.info(data, {
        theme: "colored",
      });
    }
  };
  //    get both classes from db tutors and student's then populate them in options on button click
  //setting slot and calling reschedule
  const settingSlot = (item) => {
    setSelectedSlot(item);
    rescheduleClass(item);
  };
  //
  const rescheduleClass = async (item) => {
    let reschedule = {
      semail: selected.email,
      temail: user.email,
      coursename: selected.coursename,
      slotno: selected.slotno,
      date: tdata.date,
      day: tdata.day,
      tday: item.ClassDay,
      tdate: item.classDate,
      tslotno: item.slotno,
    };
    setIsDone(true);
    const { data } = await reschedulerepo.rescheduleStudentRequest(reschedule);
    if (data.match(RescheduleSuccessful)) {
      toast.success(data, {
        theme: "colored",
      });
    } else {
      console.log("reschedule ", data);
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
        id="rescheduleinfomodalstudentRequest"
        className="modal-toggle"
      />
      <label
        htmlFor="rescheduleinfomodalstudentRequest"
        className="modal cursor-pointer"
      >
        {/* <label
        className="modal modal-bottom sm:modal-middle"
        htmlFor=""
      > */}
        <label className="modal-box relative" htmlFor="">
          {/* <div className="modal-box  w-full "> */}
          <h3 className="font-bold text-lg">Reschedule</h3>
          <p className="py-1">Select date</p>
          <div className="mt-1 w-full flex flex-col md:flex-row gap-2 ">
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
          <div className="flex flex-col h-44  py-3 px-1 overflow-y-scroll gap-3 rounded-md mt-8 shadow-xl shadow-primary bg-neutral w-full">
            {classes.length > 0 ? (
              classes.map((classs) => (
                <StudentRescheduleModalRow
                  item={classs}
                  settingSlot={settingSlot}
                  selectedSlot={selectedSlot}
                  key={classs.slot}
                />
              ))
            ) : (
              <p className="font-bold text-lg">No Free Slot</p>
            )}
          </div>
          {/* </div> */}
        </label>
      </label>
    </div>
  );
};

export default StudentRescheduleRequest;

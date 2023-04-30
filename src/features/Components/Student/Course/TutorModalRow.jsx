import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { slotsToStringSlot } from "../../../Utils/CourseFunctions";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import {
  RequestSentSuccessfully,
  TutorAlreadyRequested,
} from "../../../Utils/MatchTypes";

var tutorapi = RepositoryFactory.get("tutor");
const TutorModalRow = ({ tutor, selectedCourse, setShowTutorModal }) => {
  const [slotsValue, setSlotsValue] = useState([]);
  const [slotsShow, setSlotsShow] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [cgroup, setCGroup] = useState([]);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    // dividing slots to array and mapping on state
    const slotString = tutor.slotMatched.substring(
      0,
      tutor.slotMatched.length - 1
    );
    const slotArr = slotString.split(",");
    setSlotsValue(slotArr);
    // calling schedule functions and mapping slots
    const slot = tutor.slotMatched.substring(0, tutor.slotMatched.length - 1);
    const slotShow = slotsToStringSlot(slot);
    setSlotsShow(slotShow);
    //
    return () => {
      setSlotsValue([]);
      setSlotsShow([]);
      setSelectedValues({});
    };
  }, []);
  const handleCheckBox = (e) => {
    if (selectedValues[e.target.name]) {
      const name = e.target.name;
      delete selectedValues[name];
      setSelectedValues(selectedValues);
      return;
    }
    setSelectedValues({ ...selectedValues, [e.target.name]: e.target.value });
  };
  const requesTutor = async () => {
    console.log("tutor row ", selectedValues);
    console.log("matched slots are ", tutor.slotMatched);
    console.log("slots value ", setSlotsValue);
    //new logic to check noOfSlots Matched Or not
    let keysList = Object.keys(selectedValues).length;
    if (tutor.noOfSlots === keysList) {
      console.log("keys matched with slots");
      let valuesString = Object.values(selectedValues).join(",");
      console.log(
        `user email ${user.email} tutor email ${tutor.email} course id is ${selectedCourse.courseid} values ${valuesString}`
      );
      const { data } = await tutorapi.requestingTutor(
        user.email,
        tutor.email,
        selectedCourse.courseid,
        valuesString
      );
      if (data.match(RequestSentSuccessfully)) {
        setShowTutorModal(false);
        toast.success(data, {
          theme: "colored",
        });
      } else if (data.match(TutorAlreadyRequested)) {
        setShowTutorModal(false);
        toast.info(data, {
          theme: "colored",
        });
      }
    } else {
      const message = `Please select ${tutor.noOfSlots} slots.`;
      toast.warning(message, {
        theme: "colored",
      });
      console.log(
        `no of slots ${tutor.noOfSlots} and keys in selected values are ${keysList}`
      );
    }
  };
  const splitCourseGroupe = (group) => {
    const slotString = group.split(",");
    console.log(slotString);
    return (
      <p
        className="text-base font-semibold"
        key={group}
      >{`${slotString[0]} - ${slotString[1]}`}</p>
    );
    // return groupArr;
  };

  return (
    <div className="bg-neutral p-2 rounded-md w-full">
      <h5 className="flex justify-between items-center w-full">
        <span className="font-bold text-base capitalize text-secondary">
          {tutor.name}
        </span>
        <span className="text-sm font-normal text-secondary">
          {tutor.cgpa}/-
        </span>
      </h5>
      <div className="grid grid-cols-2  gap-3 md:gap-4  justify-between overflow-x-hidden">
        <div className="col">
          {slotsShow.map((item, index) => (
            <label
              key={index}
              className="text-secondary flex  items-center justify-start w-[600px]"
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
        <div className="col grid grid-cols-2 justify-items-center gap-1 md:gap-2 bg-primary py-2 rounded-md shadow-md">
          {tutor.coursegroup.map((item) => splitCourseGroupe(item))}
        </div>
      </div>
      <button
        className="btn btn-accent mt-2 group btn-sm md:btn-md"
        onClick={requesTutor}
      >
        Request
      </button>
    </div>
  );
};

export default TutorModalRow;

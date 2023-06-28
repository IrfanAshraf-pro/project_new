import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { slotsToStringSlot } from "../../Utils/CourseFunctions";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../../Repository/RepositoryFactory";
import {
  RequestSentSuccessfully,
  TutorAlreadyRequested,
  tutorRated,
} from "../../Utils/MatchTypes";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";

var courserepo = RepositoryFactory.get("course");
const TutorTaskRow = ({ tutor, selectedCourse, noOfWeek }) => {
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
    if (keysList > 1) {
      //   console.log("keys matched with slots");
      let valuesString = Object.values(selectedValues).join(",");
      //   console.log(
      //     `user email ${user.email} tutor email ${tutor.email} course id is ${selectedCourse.courseid} values ${valuesString} and noOfWeek=${noOfWeek}`
      //   );

      const { data } = await courserepo.sendRequestToTutorTemporary(
        user.email,
        tutor.email,
        selectedCourse.courseid,
        valuesString,
        noOfWeek
      );
      if (data.match(RequestSentSuccessfully)) {
        toast.success(data, {
          theme: "colored",
        });
      } else if (data.match(TutorAlreadyRequested)) {
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
    return (
      <p
        className="text-base font-semibold"
        key={group}
      >{`${slotString[0]} - ${slotString[1]}`}</p>
    );
    // return groupArr;
  };
  const RatingComponent = ({ rating }) => {
    return rating === "NA" ? (
      <Rating
        initialRating={0}
        fractions={2}
        emptySymbol={<FiStar size={16} color="#000" />}
        fullSymbol={<FaStar size={16} color="#ffc107 " />}
        readonly
      />
    ) : (
      <Rating
        initialRating={rating}
        fractions={2}
        emptySymbol={<FiStar size={16} color="#111" />}
        fullSymbol={<FaStar size={16} color="#ffc107 " />}
        readonly
      />
    );
  };

  return (
    <div className="bg-neutral p-2 rounded-md w-full">
      <h5 className="flex justify-between items-center w-full px-3">
        <span className="font-semibold text-base capitalize text-secondary">
          {tutor.name}
        </span>
        <span className="text-lg font-semibold text-secondary">
          {tutor.grade} / <RatingComponent rating={tutor.rating} /> (
          {tutor.ratingCount})
        </span>
      </h5>
      {tutor?.message?.length > 0 && (
        <div>
          {tutor.message.map((item, index) => (
            <p className="text-error font-thin text-base">{item.message}</p>
          ))}
        </div>
      )}
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

export default TutorTaskRow;

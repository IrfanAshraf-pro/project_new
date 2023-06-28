import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { slotsToStringSlot } from "../../Utils/CourseFunctions";
import { toast } from "react-toastify";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";

const TutorRow = ({ tutor}) => {
  const [slotsShow, setSlotsShow] = useState([]);
  useEffect(() => {
    // dividing slots to array and mapping on state
    const slotString = tutor.slotMatched.substring(
      0,
      tutor.slotMatched.length - 1
    );
    const slotArr = slotString.split(",");
    // calling schedule functions and mapping slots
    const slot = tutor.slotMatched.substring(0, tutor.slotMatched.length - 1);
    const slotShow = slotsToStringSlot(slot);
    setSlotsShow(slotShow);
    //
    return () => {
      setSlotsShow([]);
    };
  }, []);

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
    <div className="bg-accent p-2 rounded-md w-full">
      <h5 className="flex justify-between items-center w-full px-3">
        <span className="font-semibold text-base capitalize text-primary">
          {tutor.name}
        </span>
        <span className="text-lg font-semibold text-primary">
          {tutor.grade} / <RatingComponent rating={tutor.rating}/> ({tutor.ratingCount})
        </span>
      </h5>
      {tutor?.message?.length > 0 && (
        <div>
          {tutor.message.map((item, index) => (
            <p className="text-error font-thin text-base">{item.message}</p>
          ))}
        </div>
      )}
      {/* <div className="flex flex-wrap gap-2">
          {slotsShow.map((item, index) => (
            <p className="font-normal text-accent pl-2 flex  items-center flex-wrap" key={index}>
            <span className="bg-white shadow-sm px-1 py-1 rounded-md">
              {item}
            </span>
          </p>
          ))}
       //course group 
      </div> */}
    </div>
  );
};

export default TutorRow;

 {/* <div className="col grid grid-cols-2 justify-items-center gap-1 md:gap-2 bg-primary py-2 rounded-md shadow-md">
          {tutor.coursegroup.map((item) => splitCourseGroupe(item))}
        </div> */}
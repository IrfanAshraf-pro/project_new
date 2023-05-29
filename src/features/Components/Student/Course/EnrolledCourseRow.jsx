import React, { useState } from "react";
import { toast } from "react-toastify";
import EnterSlotsToMatch from "./EnterSlotsToMatch";

const EnrolledCourseRow = ({
  coursee,
  setEnrolledCourseSelected,
  showSlotModal,
  setShowSlotModal,
}) => {
  const onClick = () => {
    if (coursee.isLearning === 0) {
      setEnrolledCourseSelected(coursee);
      setShowSlotModal(true)
    } else {
      toast.info("You are already learning this course.", {
        theme: "colored",
      });
    }
  };
  return (
    <>
      <div className="group">
        <div className="flex justify-between items-center  bg-base-100 px-4 py-2 rounded-md group-hover:bg-accent">
          <span className="text-secondary group-hover:text-primary">
            {coursee.coursename}
          </span>
          <div>
            <label
              // htmlFor="slotsModal"
              className={`px-3 cursor-pointer py-1.5 duration-500 text-accent  shadow-lg rounded-md flex-1 font-thin max-w-md ${
                coursee.isLearning === 0
                  ? "bg-white group-hover:bg-accent group-hover:text-white group-hover:hover:bg-indigo-400 group-hover:hover:text-primary"
                  : "text-white bg-gray-500"
              }`}
              onClick={onClick}
            >
              Find Tutor
            </label>
            {/* <button
              className="btn btn-accent group-hover:bg-base-100 ml-1   group-hover:text-accent btn-sm md:btn-md "
              onClick={onClick}
            >
              Find Best Tutor
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrolledCourseRow;

import React, { useState } from "react";
import EnterSlotsToMatch from "./EnterSlotsToMatch";

const EnrolledCourseRow = ({
  coursee,
  setEnrolledCourseSelected
}) => {

const onClick=()=>{
  setEnrolledCourseSelected(coursee)
}
  return (
    <>
      <div className="group">
        <div className="flex justify-between items-center  bg-base-100 px-4 py-2 rounded-md group-hover:bg-accent">
          <span className="text-secondary group-hover:text-primary">
            {coursee.coursename}
          </span>
          <div>
          <label
            htmlFor="slotsModal"
            className="btn btn-accent group-hover:bg-base-100 group-hover:text-accent btn-sm md:btn-md"
            onClick={onClick}
          >
            Find Tutor
          </label>
          <button
            className="btn btn-accent group-hover:bg-base-100 ml-1 group-hover:text-accent btn-sm md:btn-md"
            onClick={onClick}
          >
            Find Best Tutor
          </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default EnrolledCourseRow;

import React from "react";

const EnrolledCourseRow = ({ coursee }) => {
  return (
    <>
      <div className="group">
        <div className="flex justify-between items-center  bg-base-100 px-4 py-2 text-base md:text-lg rounded-md group-hover:bg-accent">
          <span className="text-secondary group-hover:text-primary">
            {coursee.coursename}
          </span>
        </div>
      </div>
    </>
  );
};

export default EnrolledCourseRow;

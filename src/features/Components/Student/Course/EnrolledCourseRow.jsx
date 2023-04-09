import React, { useState } from "react";
import EnterSlotsToMatch from "./EnterSlotsToMatch";

const EnrolledCourseRow = ({
  course,
  handleSlotRequest,
  setShowTutorModal,
}) => {
  const [noOfSlots, setnoOfSlots] = useState(1);
  const handleSlotSubmit = () => {
    console.log(noOfSlots);
    handleSlotRequest(noOfSlots, course.courseid);
  };

  return (
    <>
      <div className="group">
        <div className="flex justify-between items-center  bg-base-100 px-4 py-1 rounded-md group-hover:bg-accent">
          <span className="text-secondary group-hover:text-primary">
            {course.coursename}
          </span>
          <label
            htmlFor="slotsModal"
            className="btn btn-accent group-hover:bg-base-100 group-hover:text-accent btn-sm md:btn-md"
          >
            Find Tutor
          </label>
        </div>
      </div>
      <EnterSlotsToMatch
        course={course}
        noOfSlots={noOfSlots}
        setnoOfSlots={setnoOfSlots}
        handleSlotSubmit={handleSlotSubmit}
        setShowTutorModal={setShowTutorModal}
      />
    </>
  );
};

export default EnrolledCourseRow;

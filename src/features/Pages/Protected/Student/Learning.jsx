import React from "react";
import RateTutorModal from "../../../Components/Student/RateTutorModal";

const Learning = () => {
  const courses = ["PF", "OOP", "DSA"];
  return (
    <>
    <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
      <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
        {courses.map((course) => (
          <div className="flex justify-between items-center  bg-base-100 px-4 py-2 rounded-md group-hover:bg-accent">
            <span className="text-secondary group-hover:text-primary">
              {course}
            </span>
            <label htmlFor="ratetutor" className="btn btn-accent">
              Rate
            </label>
          </div>
        ))}
      </div>
    </div>
    <RateTutorModal/>
    </>
  );
};

export default Learning;

import React from "react";
import ShowCourseGroupRow from "./ShowCourseGroupRow";
import { useState, useEffect } from "react";

const ShowCourseGroup = ({ selectedGroup, handleCourseDelete,isShown,setIsShown }) => {

  const handleClick = (course) => {
    var newCourses = selectedGroup.subjectGroup.filter(
      (c) =>
        c.courseid !== course.courseid && c.coursename !== course.coursename
    );
    let group={...selectedGroup,subjectGroup:newCourses}
    handleCourseDelete(group)
  };
  // const handleDoneClick = () => {
  //   console.log("Done Clicked", courses);
  // };
  // const handleCancelClick = () => {
  //   console.log("Cancelled");
  //   // setCourses(selectedGroup)
  // };
  // useEffect(() => {
  //   setCourses(selectedGroup.subjectGroup);
  // }, [selectedGroup]);

  console.log(selectedGroup);
  return (
    <>
      <input
        type="checkbox"
        id="showcoursegroupmodal"
        className="modal-toggle"
        checked={isShown | false}
        onChange={setIsShown}
      />
      <label
        className="modal modal-bottom sm:modal-middle"
        htmlFor="showcoursegroupmodal"
      >
        <label className="modal-box relative" htmlFor="">
          <h3 className="font-bold text-lg text-start">Courses in Group are</h3>
          <div className="items-end text-end">
          <label
            htmlFor="addcoursetogroup"
            className="btn btn-circle btn-accent"
          >
            +
          </label>
        </div>
          <div className=" flex flex-col gap-3 ">
            {
              // selectedGroup.courses.map(item=>ShowCourseGroupRow(item))
              selectedGroup.subjectGroup?.map((course) => (
                <div
                  className="p-2 px-4 rounded shadow-md mt-2 w-full bg-primary text-accent flex items-center justify-between"
                  key={course.courseid}
                >
                  <p className="flex-1">{course.coursename}</p>
                  <div className="flex">
                    
                    <div
                      className="w-5 h-5 text-red-500 "
                      onClick={() => handleClick(course)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </label>
      </label>
    </>
  );
};

export default ShowCourseGroup;

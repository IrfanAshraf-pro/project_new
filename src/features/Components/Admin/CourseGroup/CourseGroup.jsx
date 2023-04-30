import React from "react";

const CourseGroupModal = () => {
  return (
    <>
      <input type="checkbox" id="admincoursegroup" className="modal-toggle" />
      <label
        className="modal modal-bottom sm:modal-middle"
        htmlFor="admincoursegroup"
      >
        <div className="modal-box ">
          <h3 className="font-bold text-lg text-start">Available Courses</h3>
          <div className=" flex flex-col gap-3 ">
            <p>HEllo</p>
          </div>
        </div>
      </label>
    </>
  );
};

export default CourseGroupModal;

import React from "react";

const AddCourseModal = ({ courses,courseGroup }) => {
  return (
    <>
      <input type="checkbox" id="tutoraddcoursemodal" className="modal-toggle" />
      <label
        className="modal modal-bottom sm:modal-middle"
        htmlFor="tutoraddcoursemodal"
      >
        <div className="modal-box ">
          <h3 className="font-bold text-lg text-start">Available Courses</h3>
          <div className=" flex flex-col gap-3 ">
            {courses.map((course) => (
              <div className="group" onClick={()=>courseGroup(course)} key={course.courseid}>
                <div
                  className="flex items-center justify-between px-2 py-2 rounded-md group-hover:bg-accent"
                >
                  <p className="text-secondary group-hover:text-primary">
                    {course.coursename}
                  </p>
                  <label
                    htmlFor="tutoraddcoursemodal"
                    className="modal-action -mt-[1px] btn btn-accent group-hover:bg-base-100 group-hover:text-accent btn-sm md:btn-md"
                  >
                    Add Course
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </label>
    </>
  );
};

export default AddCourseModal;

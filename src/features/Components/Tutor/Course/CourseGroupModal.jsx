import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
const CourseGroupModal = ({
  group,
  groupModal,
  setGroupModal,
  AddCourseGroup,
  selectedCourse,
}) => {
  const [courses, setCourse] = useState(group | []);
  const onClick = () => {
      AddCourseGroup(courses);
      setGroupModal(false);
  };
  // const handleCourseGrade = (item) => {
  //   console.log("item after clickiing", item);
  //   var matchedCourse = courses.find(
  //     (course) => course.courseid === item.courseid
  //   );
  //   console.log(matchedCourse);
  //   matchedCourse.isSelected = item.isSelected;
  //   var filteredCourse = courses.filter(
  //     (course) => course.courseid != item.courseid
  //   );
  //   // setCourse([...filteredCourse, matchedCourse]);
  // };
  const handleCheckboxChange = (index) => {
    const updatedData = [...courses];
    updatedData[index].isSelected = !updatedData[index].isSelected;
    setCourse(updatedData);
  };
  useEffect(() => {
    setCourse(group);
    return () => {
      setGroupModal(false);
      setCourse([]);
    };
  }, [group]);
  return (
    <>
      <input
        checked={groupModal | false}
        onChange={setGroupModal}
        type="checkbox"
        id="coursegroupmodal"
        className="modal-toggle"
      />
      <label
        className="modal modal-bottom sm:modal-middle"
        htmlFor="coursegroupmodal"
      >
        <div className="modal-box ">
          <h3 className="font-bold text-lg text-center">
            Enter Grade of Course
          </h3>
          <div className="flex flex-col items-center justify-center gap-2 pt-3">
            {group.map((item, index) => (
              <div key={item.courseid}>
                <label className="flex items-center justify-between w-72 md:w-60 rounded-md px-8 md:px-4 bg-neutral py-1"
                key={item.courseid}>
                  <span className="text-secondary font-bold text-lg">
                    {item.coursename}
                  </span>
                  <input
                    type="checkbox"
                    value={item.isSelected}
                    onChange={() => handleCheckboxChange(index)}
                    checked={item.isSelected}
                    disabled={item.type === 1 ? true : false}
                    className="border-0 rounded focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>
            ))}
            <button
              onClick={onClick}
              className="btn btn-accent group-hover:bg-base-100 group-hover:text-accent btn-wide"
            >
              Add
            </button>
          </div>
        </div>
      </label>
    </>
  );
};

export default CourseGroupModal;

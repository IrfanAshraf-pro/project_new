import React, { useState, useEffect } from "react";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
const AddCourseToGroup = ({ selectedGroup, addCourseToGroup }) => {
  const [courses, setCourses] = useState([]);
  const [isLoaded, setILoaded] = useState(false);
  const courserepo = RepositoryFactory.get("course");

  const gettingAllCourses = async () => {
    let { data } = await courserepo.GetCoursesGroup(selectedGroup.groupName);
    if (typeof data === "object") {
      setCourses(data);
      setILoaded(true);
    } else {
      setCourses([]);
      console.log(data);
    }
    console.log("courses are ", data);
  };
  useEffect(() => {
    gettingAllCourses();
  }, [selectedGroup]);

  //   handle click
  const handleClick = (course) => {
    let newGroup={...selectedGroup}
    newGroup.subjectGroup.push(course)
    console.log("after adding course group is ", newGroup);
    addCourseToGroup(newGroup)
  };
  return (
    <>
      <input type="checkbox" id="addcoursetogroup" className="modal-toggle" />
      <label
        className="modal modal-bottom sm:modal-middle"
        htmlFor="addcoursetogroup"
      >
        <label class="modal-box relative" htmlFor="">
          <h3 className="font-bold text-lg text-start">Courses are :</h3>
          <div className=" flex flex-col gap-3 ">
            {isLoaded &&
              courses?.map((course) => (
                <label
                  className="p-2 px-4 rounded shadow-md mt-2 w-full bg-primary text-accent flex items-center justify-between hover:bg-accent hover:text-white"
                  key={course.courseid}
                  onClick={() => handleClick(course)}
                  htmlFor="addcoursetogroup"
                >
                  {course.coursename}
                </label>
              ))}
          </div>
        </label>
      </label>
    </>
  );
};

export default AddCourseToGroup;

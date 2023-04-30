import React, { useState } from "react";
import CourseGroupModal from "../../../Components/Admin/CourseGroup/CourseGroup";
import ShowCourseGroup from "../../../Components/Admin/CourseGroup/ShowCourseGroup";
const CourseGroup = () => {
  const [selectedGroup, setSelectedGroup] = useState({});
  const groups = [
    {
      name: "Programming Group",
      courses: ["PF", "OOP", "DSA", "MAP","VP","AS","WE","WT"],
    },
    {
      name: "Elective Group",
      courses: ["DS", "AS", "IS"],
    },
    {
      name:'Electronics',
      courses: ["DS", "AS", "IS"],
    },{
      name:'Mathematics',
      courses: ["DS", "AS", "IS"],
    }
  ];
  const onClick = (group) => {
    setSelectedGroup(group);
  };
  return (
    <>
      <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
        <div className="items-end text-end">
          <label
            htmlFor="admincoursegroup"
            className="btn btn-circle btn-accent"
          >
            +
          </label>
          <CourseGroupModal />
        </div>
        {groups.length > 0 ? (
          <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
            {groups.map((group) => (
              <div key={group.name}>
                <label
                  htmlFor="showcoursegroupmodal"
                  className="group"
                  onClick={() => onClick(group)}
                >
                  <div className="flex justify-between items-center  bg-base-100 px-4 py-1 rounded-md group-hover:bg-accent">
                    <span className="text-secondary group-hover:text-primary">
                      {group.name}
                    </span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p>Please Add a course group</p>
        )}
      </div>
      <ShowCourseGroup selectedGroup={selectedGroup} />
    </>
  );
};

export default CourseGroup;

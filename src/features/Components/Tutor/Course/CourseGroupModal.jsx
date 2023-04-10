import React, { useState,useEffect } from "react";

import {toast} from 'react-toastify'
const CourseGroupModal = ({ group, groupModal, setGroupModal ,AddCourseGroup,selectedCourse}) => {
    const [courses, setCourse] = useState(group|[])
    const onClick = () => {
        const courseT=courses.find(item=>item.courseid===selectedCourse.courseid)
        console.log('courseT', courseT)
        if(courseT.coursegrade===''){
            toast.warning( `must enter grade for ${courseT.coursename}`,{
                position: "top-right",
                theme:'colored'
            })
          return
        }else{
          AddCourseGroup(courses)
          setGroupModal(false)
        }
      }
      const handleCourseGrade=(item,grade)=>{
        var matchedCourse=courses.find(course=>course.courseid===item.courseid)
        console.log(matchedCourse);
        matchedCourse.coursegrade=grade
        var filteredCourse=courses.filter(course=>course.courseid!=item.courseid)
        setCourse([...filteredCourse,matchedCourse])
      }

  useEffect(() => {
    setCourse(group)
    return () => {
      setGroupModal(false);
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
          <h3 className="font-bold text-lg text-start">
            Enter Grade of Course
          </h3>
          <div className="flex flex-col items-center justify-center gap-2 pt-3">
            {group.map((item) => (
              <div key={item.courseid}>
                <span className="mr-4 font-bold">{item.coursename}</span>
                <input
                  type="text"
                  placeholder="Enter your Grade"
                  className="w-full max-w-xs input input-bordered sm:w-9/12"
                  value={item.coursegrade}
                  onChange={(e) => handleCourseGrade(item, e.target.value)}
                />
              </div>
            ))}
            <button
              onClick={onClick}
              className="btn btn-accent group-hover:bg-base-100 group-hover:text-accent btn-sm md:btn-md"
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

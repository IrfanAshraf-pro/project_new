import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify'
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { NoCourseEnrolled } from "../../../Utils/MatchTypes";
const Teaching = () => {
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
    // Repository
    const courserepo = RepositoryFactory.get("course");
    // getting user data
    const { user } = useSelector((state) => state.auth);
    const gettingCourses = async () => {
      let { data } = await courserepo.getTeachingStudents(user.email);
      if (typeof data === "object") {
        setStudents(data);
      } else if (data.match(NoCourseEnrolled)) {
        toast.warn(data, {
          theme: "colored",
        });
      } else {
        console.log(data);
      }
    };
    useEffect(() => {
      gettingCourses();
    }, []);
  
  return (
    <>
      <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
        <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
          {students.map((course) => (
          <div className="flex justify-between items-center  bg-base-100 px-4 py-2 rounded-md group-hover:bg-accent">
            <span className="text-secondary group-hover:text-primary">
              {course.studentemail}
            </span>
            <span className="text-secondary group-hover:text-primary">
              {course.coursename}
            </span>
          </div>
           ))} 
        </div>
      </div>
    </>
  );
};

export default Teaching;
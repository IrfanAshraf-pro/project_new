import React, { useEffect, useState } from "react";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { useSelector } from "react-redux";
import { ClassTaken, NoClasses, NoCourseEnrolled } from "../../../Utils/MatchTypes";
import { toast } from "react-toastify";
import { TodaysClassesrow } from "../../../Components/Tutor";
let todayclasses = RepositoryFactory.get("todayclasses");

const TutorTodayClasses = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useSelector((state) => state.auth);
  // calling get today classes
  const callingTodayClasses = async () => {
    const { data } = await todayclasses.todayClassesTutor(user.email);
    console.log("today classes are", data);
    if (typeof data === "object") {
      setClasses(data);
    } else if (data.match(NoClasses)) {
      toast.info(data, {
        theme: "colored",
      });
    }
  };
  // calling take class
  const takeClass = async (classs) => {
    const {data}=todayclasses.takeTodayClass(user.email,classs.coursename,classs.name,classs.slot.toString())
    if(data.match(ClassTaken)){
      toast.success(data,{
        theme:'colored'
      })
    }else if(data.match(NoCourseEnrolled)){
      toast.info(data,{
        theme:'colored'
      })
    }
  };
  useEffect(() => {
    callingTodayClasses();
  }, []);
  return (
    <div className="overflow-hidden flex flex-col h-full p-2 md:p-4  w-full sm:w-[90%] md:w-[70%] mx-auto">
      <div className="flex items-center justify-between w-[95%] mx-auto p-2 rounded-md bg-secondary text-white">
        <p>Course</p>
        <p>Student</p>
        <p>Slot</p>
        <p className="hidden md:block">Take</p>
        <p className="hidden md:block">Reschedule</p>
      </div>
      <div className="flex flex-col h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
        {classes.map((item, index) => (
          <TodaysClassesrow classes={item} key={index} takeClass={takeClass}/>
        ))}
      </div>
    </div>
  );
};

export default TutorTodayClasses;

import React, { useEffect, useState } from "react";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { useSelector, useDispatch } from "react-redux";
import {
  ClassTaken,
  NoClasses,
  NoCourseEnrolled,
  TimeNotMatched,
} from "../../../Utils/MatchTypes";
import { toast } from "react-toastify";
import { TodaysClassesrow } from "../../../Components/Tutor";
import { setPageTitle } from "../../../../app/Slices/Dashboard/HeaderSlice";
import EmptyImg from "../../../../assests/noClass.svg";

let todayclasses = RepositoryFactory.get("todayclasses");

const TutorTodayClasses = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
    console.log("taking class ", classs);
    if(classs.isTemp){
      TakeTempClass(classs)
    }else{
      RegularClassesTake(classs)
    }
   
  };
  const TakeTempClass=async(classs)=>{
     const { data } = await todayclasses.takeTodayClassTemp(
      user.email,
      classs.coursename,
      classs.semail,
      classs.slot.toString(),
      classs.isReschedule,
      classs.isPreSchedule,
      classs.isStudent,
      classs.classDate
    );
    console.log("todays classses take responsee data is ", data);
    if (data.match(ClassTaken)) {
      toast.success(data, {
        theme: "colored",
      });
      setClasses([]);
      callingTodayClasses();
    } else if (data.match(NoCourseEnrolled)) {
      toast.info(data, {
        theme: "colored",
      });
    } else if (data.match(TimeNotMatched)) {
      toast.info(data, {
        theme: "colored",
      });
    } else {
      console.log(data);
    }
  }
  const RegularClassesTake=async(classs)=>{
 const { data } = await todayclasses.takeTodayClass(
      user.email,
      classs.coursename,
      classs.semail,
      classs.slot.toString(),
      classs.isReschedule,
      classs.isPreSchedule,
      classs.isStudent,
      classs.classDate
    );
    console.log("todays classses take responsee data is ", data);
    if (data.match(ClassTaken)) {
      toast.success(data, {
        theme: "colored",
      });
      setClasses([]);
      callingTodayClasses();
    } else if (data.match(NoCourseEnrolled)) {
      toast.info(data, {
        theme: "colored",
      });
    } else if (data.match(TimeNotMatched)) {
      toast.info(data, {
        theme: "colored",
      });
    } else {
      console.log(data);
    }
  }
  useEffect(() => {
    dispatch(setPageTitle({ title: "Today's Classes" }));
    callingTodayClasses();
  }, []);
  return (
    <div className="overflow-hidden flex flex-col h-full p-2 md:p-4  w-full sm:w-[90%] md:w-[70%] mx-auto">
      {classes.length > 0 ? (
        <>
          <div className="flex items-center justify-between w-[95%] px-3 mx-auto p-2 rounded-md bg-secondary text-white">
            <p className="flex-1">Course</p>
            <p className="flex-1">Student</p>
            <p className="flex-1">Slot</p>
            <p className="hidden md:block">Take</p>
          </div>
          <div className="flex flex-col h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
            {classes.map((item, index) => (
              <TodaysClassesrow
                classes={item}
                key={index}
                takeClass={takeClass}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col md:max-w-xl mx-auto">
          <img src={EmptyImg} alt="no class" className="w-64 md:w-72" />
          <p className="text-center font-semibold text-2xl">No Class Today</p>
        </div>
      )}
    </div>
  );
};

export default TutorTodayClasses;

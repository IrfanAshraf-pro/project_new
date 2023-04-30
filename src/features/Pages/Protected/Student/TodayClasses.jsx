import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { setPageTitle } from '../../../../app/Slices/Dashboard/HeaderSlice'
import {TodaysClassesrow} from '../../../Components/Student'
import { toast } from "react-toastify";
import {  NoClasses } from "../../../Utils/MatchTypes";
let todayclasses = RepositoryFactory.get("todayclasses");
const TodayClasses = () => {
    const dispatch = useDispatch()
    const [classes, setClasses] = useState([]);
  const { user } = useSelector((state) => state.auth);
  // calling get today classes
  const callingTodayClasses = async () => {
    const { data } = await todayclasses.todayClassesStudent(user.email);
    console.log("today classes are", data);
    if (typeof data === "object") {
      setClasses(data);
    } else if (data.match(NoClasses)) {
      toast.info(data, {
        theme: "colored",
      });
    }
  };

    useEffect(() => {
        dispatch(setPageTitle({ title : "Schedule"}))
        callingTodayClasses();
      }, [])
    return (
      <div className="overflow-hidden flex flex-col h-full p-2 md:p-4  w-full sm:w-[90%] md:w-[70%] mx-auto">
        <div className="flex items-center justify-between w-[95%] mx-auto p-2 rounded-md bg-secondary text-white">
          <p>Course</p>
          <p>Student</p>
          <p>Slot</p>
          <p className="hidden md:block">{"   "}</p>
          <p className="hidden md:block">{"      "}</p>
        </div>
        <div className="flex flex-col  w-full h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
          {classes.map((item, index) => (
            <TodaysClassesrow classes={item} key={index}/>
          ))}
        </div>
      </div>
  )
}

export default TodayClasses
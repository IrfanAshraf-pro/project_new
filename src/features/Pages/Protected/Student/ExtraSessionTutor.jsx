import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import {
  FindTutorNotAvailable,
  NoTutorForThisCourse,
} from "../../../Utils/MatchTypes";
import { toast } from "react-toastify";
import TutorTaskRow from "../../../Components/Student/TutorTaskRow";

const ExtraSessionTutor = () => {
  const [tutorsmatched, setTutorsMatched] = useState([]);
  const courserepo = RepositoryFactory.get("course");

  const navigation = useNavigate();
  const { noOfWeek } = useParams();
  const location = useLocation();
  const { selectedCourse } = location.state;
  console.log(selectedCourse);
  const gettingTutors = async () => {
    let { data } = await courserepo.getTutorsForExtraSession(
      selectedCourse.courseEnrollId,
      selectedCourse.courseid
    );
    if (typeof data === "object") {
      console.log(tutorsmatched);
      setTutorsMatched(data);
      console.log("setTutorsMatched", data);
    } else if (data.match(FindTutorNotAvailable)) {
      toast.info(data);
    } else if (data.match(NoTutorForThisCourse)) {
      toast.info(data);
    } else {
      console.log("Error while fetching tutors ", data);
    }
  };
  useEffect(() => {
    gettingTutors();
    return () => {
      setTutorsMatched([]);
    };
  }, []);

  return (
    <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
      {
        tutorsmatched.length>0?(
          <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
              {
                tutorsmatched.map((item,index)=>(
                  <TutorTaskRow tutor={item} selectedCourse={selectedCourse} noOfWeek={noOfWeek} key={index} />
                ))
              }
            </div>
        ):(
          <p className="font-bold text-2xl text-center text-accent">No Tutor Matched </p>
        )
      }
    </div>
  );
};

export default ExtraSessionTutor;

import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { FindTutorNotAvailable } from "../../../Utils/MatchTypes";
import TutorRow from "../../../Components/Parent/TutorRow";

const Tutors = () => {
  const [course, setCourses] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(1);
  const courserepo = RepositoryFactory.get("course");
  const getAllCourses = async () => {
    let { data } = await courserepo.getCourses();
    if (typeof data === "object") {
      setCourses(data);
    } else {
      console.log("Error in fetching courses", data);
    }
  };
  const getTutors = async (cid) => {
    setTutors([]);
    let { data } = await courserepo.findTutorParent(cid);
    if (typeof data === "object") {
      setTutors(data);
    } else if (data.match(FindTutorNotAvailable)) {
      toast.info(data);
    } else {
      console.log("Error in fetching tutors", data);
    }
  };
  useEffect(() => {
    getAllCourses();
    getTutors(selectedCourse);
    return () => {
      setCourses([]);
    };
  }, []);
  useEffect(() => {
    getTutors(selectedCourse);
  }, [selectedCourse]);

  return (
    <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
      {course.length > 0 ? (
        <select
          className="select mr-4 border-2 border-accent w-40"
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option disabled defaultChecked className="w-60">
            Please select a course
          </option>
          {course.map((item) => (
            <option value={item.courseid} className="w-60">
              {item.coursefullname}
            </option>
          ))}
        </select>
      ) : (
        <p>No Course Available</p>
      )}
      {tutors.length > 0 ? (
        <>
          <div className="flex items-center bg-secondary w-[90%] mx-auto rounded-md justify-between mt-8 md:p-4  gap-2 p-3 px-4 text-white">
            <p>Tutor Name</p>
            <p>Rating</p>
          </div>
          <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md  shadow-xl shadow-primary bg-neutral">
            <div className="flex items-center justify-center flex-col md:p-4 p-2 gap-2">
              {tutors.map((tutor, index) => (
                <TutorRow tutor={tutor} key={index} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-3xl font-bold text-accent my-6">
          No Tutor Available
        </p>
      )}
    </div>
  );
};

export default Tutors;

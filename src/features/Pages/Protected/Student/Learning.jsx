import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setPageTitle } from "../../../../app/Slices/Dashboard/HeaderSlice";
import { setSchedule } from "../../../../app/Slices/ScheduleSlice";
import RateTutorModal from "../../../Components/Student/RateTutorModal";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import {
  courseNotFound,
  finishSuccessful,
  finsihError,
  NoCourseEnrolled,
  ScheduleNotSet,
  tutorRated,
} from "../../../Utils/MatchTypes";

const Learning = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  // Repository
  const courserepo = RepositoryFactory.get("course");
  var schedulerepo = RepositoryFactory.get("schedule");
  // getting user data
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const gettingCourses = async () => {
    let { data } = await courserepo.getStudentLearning(user.email);
    if (typeof data === "object") {
      setCourses(data);
    } else if (data.match(NoCourseEnrolled)) {
      toast.warn(data, {
        theme: "colored",
      });
    } else {
      console.log(data);
    }
  };
  const handleCourseFinish = async (course) => {
    console.log("Course to be finished is ", course);
    let { data } = await courserepo.finishCourse(course);
    if (data.match(finishSuccessful)) {
      toast.success(data, {
        theme: "colored",
      });
      getUserSchedule();
      gettingCourses();
    } else if (data.match(finsihError)) {
      toast.info(data, {
        theme: "colored",
      });
    } else {
      console.log("Error finishing Course", data);
    }
  };
  //getting user schedule
  const getUserSchedule = async () => {
    console.log("getting user schedule");
    const { data } = await schedulerepo.getStudentSchedule(user.email);
    console.log(data);
    dispatchingSchedule(data);
  };
  const dispatchingSchedule = (data) => {
    if (data.length > 100) {
      console.log("schedule is ", data);
      dispatch(setSchedule({ schedule: data }));
    } else if (data.match(ScheduleNotSet)) {
      toast.warning(data, {
        theme: "colored",
      });
    }
  };
  const RatingTutor = async (course, rating) => {
    const { data } = await courserepo.RateTutor(
      course.tutoremail,
      course.studentemail,
      course.courseid,
      rating
    );
    if (data.match(tutorRated)) {
      toast.success(data, { theme: "colored" });
      setCourses([])
      gettingCourses();
    } else if (data.match(courseNotFound)) {
      toast.info(data, { theme: "colored" });
    } else {
      console.log("Rating data is ,", data);
    }
  };
  useEffect(() => {
    dispatch(setPageTitle({ title: "Learning" }));
    gettingCourses();
  }, []);

  return (
    <>
      <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
        {courses.length > 0 ? (
          <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
            {courses.map((course) => (
              <div
                className="flex justify-between items-center  bg-base-100 px-4 py-2 rounded-md group-hover:bg-accent"
                key={course.courseid}
              >
                <span className="text-secondary group-hover:text-primary">
                  {course.coursename}
                </span>
                <div className="space-x-4">
                  <button
                    className={`btn ${
                      course.coursestatus == 0 ? " btn-accent" : "btn-disabled"
                    }`}
                    onClick={() => handleCourseFinish(course)}
                  >
                    Finish
                  </button>
                  <label
                    htmlFor="ratetutor"
                    className={`btn btn-secondary  ${
                      course.coursestatus == 0 ? "btn-disabled" : "btn-accent"
                    }`}
                    onClick={() => setSelectedCourse(course)}
                  >
                    Rate
                  </label>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-3xl text-accent text-center mt-6">No Course Enrolled</p>
        )}
      </div>
      <RateTutorModal
        selectedCourse={selectedCourse}
        RatingTutor={RatingTutor}
      />
    </>
  );
};

export default Learning;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setPageTitle } from "../../../../app/Slices/Dashboard/HeaderSlice";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { NoCourseEnrolled } from "../../../Utils/MatchTypes";
import { Link } from "react-router-dom";

const UpdatingSchedule = () => {
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  // Repository
  const courserepo = RepositoryFactory.get("course");
  // getting user data
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
    dispatch(setPageTitle({ title: "Teaching" }));
    gettingCourses();
  }, []);

  return (
    <div>
      <div>
        <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
          <h1 className="text-2xl font-bold text-accent text-center">
            Change Enrolled Classes Schedule
          </h1>
          <div
            className={`flex flex-col gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral ${
              students.length > 3 ? "h-2/3 md:h-68  overflow-y-scroll" : ""
            } `}
          >
            {students.map((course) => (
              <Link
                className="group"
                to={`/app/updateenrollschedule/${course.courseEnrollId}`}
                state={{ course }}
              >
                <div
                  className="flex justify-between items-center  bg-base-100 px-4 py-2 rounded-md group-hover:bg-accent group-hover:cursor-pointer"
                  key={course.studentemail}
                >
                  <span className="text-secondary group-hover:text-primary">
                    {course.studentname}
                  </span>
                  <span className="text-secondary group-hover:text-primary">
                    {course.coursename}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatingSchedule;

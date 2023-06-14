import React, { useState, useEffect } from "react";
import AddCourse from "../../../Components/Admin/courses/AddCourse";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import Loader from "../../../Components/Custom/LoaderDashboard";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../../app/Slices/Dashboard/HeaderSlice";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch=useDispatch()
  const courserepo = RepositoryFactory.get("course");

  const getAllCourses = async () => {
    let { data } = await courserepo.adminAllCourses();
    console.log('getting all admin courses',data);
    setCourses(data);
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    getAllCourses();
    return () => {
      setCourses([]);
      setIsLoading(false);
    };
  }, []);
  useEffect(() => {
    dispatch(setPageTitle({ title: "Courses" }));
    isLoading && getAllCourses();
  }, [isLoading]);
  return (
    <>
      {isLoading && <Loader />}
      <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
        <div className="items-end text-end">
          <label
            onClick={() => setIsAdded(true)}
            className="btn btn-circle btn-accent"
          >
            +
          </label>
          <AddCourse setIsAdded={setIsAdded} isAdded={isAdded} setIsLoading={setIsLoading}/>
        </div>
        {courses.length > 0 ? (
          <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
            {courses.map((course) => (
              <div key={course.coursecode} className="flex justify-between p-2 rounded shadow mb-2 bg-primary text-accent hover:bg-accent hover:text-white">
                <p>{course.coursename}</p>
                <p className="flex-1 text-center">{course.coursecode}</p>
                <p>{course.coursefee}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Please add some courses</p>
        )}
      </div>
    </>
  );
};

export default Courses;

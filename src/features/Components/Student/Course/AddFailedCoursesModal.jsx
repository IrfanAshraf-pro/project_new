import React, { useState, useEffect } from "react";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AlreadyEnlisted, EnlistedSuccessfully, StudentDoesNotExist } from "../../../Utils/MatchTypes";

const AddFailedCoursesModal = ({ showFailedModal, setShowFailedModal ,addCourse}) => {
  const [courses, setCourses] = useState([]);
  var course = RepositoryFactory.get("course");
  const { user } = useSelector((state) => state.auth);

  // get all courses
  const getAllCourses = async () => {
    let { data } = await course.gettingFailedCoursesAll(user.email);
    if (typeof data === "object") {
      setCourses(data);
    } else if (data.match(StudentDoesNotExist)) {
      toast.info(data);
    } else {
      console.log("fetching failed courses error");
    }
  };
  // add course
  const AddCourse=(courser)=>{
    setShowFailedModal(false)
    addCourse(courser)
  }
  useEffect(() => {
    getAllCourses();
  }, []);
  return (
    <div>
      <input
        checked={showFailedModal | false}
        onChange={setShowFailedModal}
        type="checkbox"
        id="failedModal"
        className="modal-toggle"
      />
      <label htmlFor="failedModal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="failedModal">
        <h3 className="font-bold text-lg text-start">Please Select a course.</h3>
          <div className=" flex flex-col gap-3 ">
            {courses.length>0? (
              courses.map((course) => (
                <div
                  className="group"
                  onClick={() => AddCourse(course)}
                  key={course.courseid}
                >
                  <div className="flex items-center justify-between px-2 py-2 rounded-md group-hover:bg-accent">
                    <p className="text-secondary group-hover:text-primary">
                      {course.coursename}
                    </p>
                    <label
                      htmlFor="studentallcourses"
                      className="modal-action -mt-[1px] btn btn-accent group-hover:bg-base-100 group-hover:text-accent btn-sm md:btn-md"
                    >
                      Add Course
                    </label>
                  </div>
                </div>
              ))
            ):<p className="font-bold text-lg text-center my-6">The are no Course To show</p>}
          </div>
        </label>
      </label>
    </div>
  );
};

export default AddFailedCoursesModal;

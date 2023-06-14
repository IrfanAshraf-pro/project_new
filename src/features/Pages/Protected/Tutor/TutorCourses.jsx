import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../../../app/Slices/Dashboard/HeaderSlice";
import {
  AddCourseModal,
  CourseGroupModal,
  EnrolledCourseRow,
} from "../../../Components/Tutor";
import { toast } from "react-toastify";
import LoaderDashboard from "../../../Components/Custom/LoaderDashboard";
// repository
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import EmptyImg from "../../../../assests/empty.png";
var course = RepositoryFactory.get("course");
const TutorCourses = () => {
  const { user } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [group, setGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const dispatch = useDispatch();
  // get all courses
  const getAllCourses = async () => {
    setIsLoading(true);
    let { data } = await course.tutorAllCourses(user.email);
    setCourses(data);
    setIsLoading(false);
  };
  // getting student enrolled courses
  const getEnrolledCourses = async () => {
    setIsLoading(true);
    let { data } = await course.tutorEnrolledCourses(user.email);
    setEnrolledCourses(data);
    setIsLoading(false);
  };
  // calling course group
  const courseGroup = async (courses) => {
    const { data } = await course.getCourseGroup(user.email, courses);
    setGroup(data);
    setSelectedCourse(courses);
  };
  // Adding course group
  const AddCourseGroup = async (courses) => {
    console.log("add course group", courses);
    const { data } = await course.saveCourseGroup(courses);
    toast.success("Course added Successfully", {
      theme: "colored",
    });
    getAllCourses();
    getEnrolledCourses();
  };
  // showing coursegroupmodal
  useEffect(() => {
    group.length > 0 && setGroupModal(true);
  }, [group]);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Courses" }));
    getEnrolledCourses();
    getAllCourses();
  }, []);
  return (
    <>
      {isLoading && (
        <div className="">
          <LoaderDashboard />
        </div>
      )}
      <div className="overflow-hidden flex flex-col h-full p-2 md:p-4  w-full sm:w-[90%] md:w-[80%] mx-auto ">
        <div className="items-end text-end">
          <label
            htmlFor="tutoraddcoursemodal"
            className="btn btn-circle btn-accent"
          >
            +
          </label>
          <AddCourseModal courses={courses} courseGroup={courseGroup} />
        </div>
        {enrolledCourses.length > 0 ? (
          <div
            className={`${
              enrolledCourses.length > 3
                ? "h-2/3 md:h-68 overflow-y-scroll "
                : ""
            } flex flex-col gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral`}
          >
            {enrolledCourses.map((course) => (
              <div key={course.courseid}>
                <EnrolledCourseRow coursee={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col md:max-w-xl mx-auto">
            <img
              src={EmptyImg}
              alt="no course enrolled"
              className="w-64 md:w-72"
            />
            <p className="text-center font-bold text-2xl">No course Enrolled</p>
          </div>
        )}
      </div>
      <CourseGroupModal
        group={group}
        AddCourseGroup={AddCourseGroup}
        groupModal={groupModal}
        setGroupModal={setGroupModal}
        selectedCourse={selectedCourse}
      />
    </>
  );
};

export default TutorCourses;

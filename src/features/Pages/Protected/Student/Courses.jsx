import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../../../app/Slices/Dashboard/HeaderSlice";
import { CourseModal, EnrolledCourseRow } from "../../../Components/Student";
// components
import LoaderDashboard from "../../../Components/Custom/LoaderDashboard";
// repository
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import {
  AlreadyEnlisted,
  EnlistedSuccessfully,
  FindTutorNoSchedule,
  FindTutorNotAvailable,
  StudentDoesNotExist,
} from "../../../Utils/MatchTypes";
import { toast } from "react-toastify";
import TutorsModal from "../../../Components/Student/Course/TutorsModal";
import EnterSlotsToMatch from "../../../Components/Student/Course/EnterSlotsToMatch";
var course = RepositoryFactory.get("course");
const Courses = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [tutors, setTutors] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [showTutorModal, setShowTutorModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState({})
  const [enrolledCourseSelected,setEnrolledCourseSelected]=useState({})
  // for Enter no of slots modal
  const [noOfSlots, setnoOfSlots] = useState(1);

  // getting student enrolled courses
  const getEnrolledCourses = async () => {
    setIsLoading(true);
    let { data } = await course.studentEnrolledCourses(user.email);
    setEnrolledCourses(data);
    setIsLoading(false);
  };
  // get all courses
  const getAllCourses = async () => {
    setIsLoading(true);
    let { data } = await course.studentAllCourses(user.email);
    setCourses(data);
    setIsLoading(false);
  };
  // add course
  const addCourse = async (courser) => {
    setIsLoading(true);
    let { data } = await course.studentAddCourse(user.email, courser.courseid);
    if (data.match(EnlistedSuccessfully)) {
      toast.success(data, {
        theme: "colored",
      });
      getEnrolledCourses();
      getAllCourses();
    } else if (data.match(AlreadyEnlisted)) {
      toast.info(data, {
        theme: "colored",
      });
    } else if (data.match(StudentDoesNotExist)) {
      toast.warning(data, {
        theme: "colored",
      });
    }
    setIsLoading(false);
  };
  // getting slots entered by user
  const handleSlotRequest=async(slot,courses)=>{
      setTutors([])
      // setSelectedCourse([])
      let {data}=await course.findTutor(user.email,courses.courseid,slot)
      if(typeof data=='object' && data.length>0){
        setTutors(data)
        setSelectedCourse(courses)
        setShowTutorModal(true)
      }else if(typeof data=='object' && data.length===0){
        toast.info(FindTutorNotAvailable,{
          theme:"colored"
        })
      }
      else if(data.match(FindTutorNotAvailable)){
        toast.info(data,{
          theme:"colored"
        })
      }else if(data.match(FindTutorNoSchedule)){
        toast.warning(data,{
          theme:'colored'
        })
      }else{
        toast.info(data,{
          theme:'colored'
        })
      }
  }
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
      <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
        <div className="items-end text-end">
          <label
            htmlFor="studentallcourses"
            className="btn btn-circle btn-accent"
          >
            +
          </label>
          <CourseModal courses={courses} addCourse={addCourse} />
        </div>
        {
          enrolledCourses.length>0?(
            <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
          {enrolledCourses.map((course) => (
            <div key={course.courseid}>
            <EnrolledCourseRow
              coursee={course}
              // handleSlotRequest={handleSlotRequest}
              // setShowTutorModal={setShowTutorModal}
              setEnrolledCourseSelected={setEnrolledCourseSelected}
            ></EnrolledCourseRow>
            </div>
          ))}
        </div>
          ):<p>Please Enlist some courses</p>
        }
      </div>
      <EnterSlotsToMatch
        course={enrolledCourseSelected}
        noOfSlots={noOfSlots}
        setnoOfSlots={setnoOfSlots}
        handleSlotRequest={handleSlotRequest}
      />
      <TutorsModal showTutorModal={showTutorModal} setShowTutorModal={setShowTutorModal} tutors={tutors} selectedCourse={selectedCourse}/>
    </>
  );
};

export default Courses;

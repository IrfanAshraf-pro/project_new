import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useLocation, useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import {
  finishSuccessful,
  finsihError,
  NoCourseEnrolled,
  NoEnrolledClasssesFound,
  NotifcationRead,
  NotificationSent,
  NotificationStudentNotExist,
  NotificationTutorNotExist,
  ReplyToNotification,
  ScheduleNotSet,
} from "../../../Utils/MatchTypes";
import { setSchedule } from "../../../../app/Slices/ScheduleSlice";


const UpdatingEnrollSchedule = () => {
  const [classes, setclasses] = useState([]);
  const [matchedClasses, setMatchedClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  //
  const navigation=useNavigate()
  const { enrollId } = useParams();
  const location = useLocation();
  const { course } = location.state;
  console.log('course', course)
  //
  const { role, user } = useSelector((state) => state.auth);
  const dispatch=useDispatch()
  //
  const courserepo = RepositoryFactory.get("course");
  const notificationrepo = RepositoryFactory.get("notification");
  const schedulerepo = RepositoryFactory.get("schedule");

  const gettingEnrolledClasses = async () => {
    let { data } = await courserepo.getEnrolledClasses(enrollId);
    if (typeof data === "object") {
      setclasses(data);
    } else if (data.match(NoEnrolledClasssesFound)) {
      toast.info(data);
    } else {
      console.log(data);
    }
  };
  const fetchMatchedClasses = async () => {
    let { data } = await courserepo.getUpdatedMatchedSlots(enrollId);
    if (typeof data === "object") {
      setMatchedClasses(data);
    } else if (data.match(NoCourseEnrolled)) {
      toast.info(data);
    } else {
      console.log(data);
    }
  };

  const SwapCourse = () => {
    if (matchedClasses.slots.length < classes.length) {
      toast.info(
        "Cannot Swap Classes Because Matched Slots are less than enrolled slots."
      );
    } else {
      if (selectedClass.length === classes.length) {
        SendingNotificationToStudent();
      } else {
        toast.info(`Select ${classes.length} slots to swap.`);
      }
    }
  };
  
  const SendingNotificationToStudent = async() => {
    let from = "";
    classes.map((item) => (from += item.slotno + ","));
    let to = "";
    selectedClass.map((item) => (to += item.slotno + ","));
    console.log("from", from);
    console.log("to", to);
    let notification = {
      email:course.studentemail,
      notificationType: 2,
      isRead: 0,
      notificationMsg: `${user.name} has requested to change your schedule from.;${user.email};${from};${to};${matchedClasses.date};${course.courseid}`,
      notificationReply: "",
    };
    let { data } = await notificationrepo.sendStudentNotification(notification);
    if (data.match(NotificationSent)) {
      toast.success(data);
    } else if (data.match(NotificationStudentNotExist)) {
      toast.info(data);
    } else {
      console.log(
        "error in sending notification to student when cstudent reschedule class request is rejected",
        data
      );
    }
  };
  const FinishCourse = async() => {
    toast.success("Finishing Course.");
    let learning={
      tutoremail:user.email,
      studentemail:course.studentemail,
      courseid:course.courseid,
      coursename:course.coursename,
      coursestatus:course.coursestatus
    }
    let { data } = await courserepo.finishCourse(learning);
    if (data.match(finishSuccessful)) {
      toast.success("Course is Finished", {
        theme: "colored",
      });
      getUserSchedule();
      navigation('/app/profile')
      sendStudentNotification()
    } else if (data.match(finsihError)) {
      toast.info(data, {
        theme: "colored",
      });
    } else {
      console.log("Error finishing Course", data);
    }
  };
  //Sending notification to tutor
  const sendStudentNotification = async () => {
    let noti = {
      email: course.studentemail,
      notificationType: 0,
      isRead: 0,
      notificationMsg: `Your course with tutor ${user.name} has finished due to unavailability of tutor.`,
      notificationReply: "",
    };
    // sendStudentNotification
    let { data } = await notificationrepo.sendStudentNotification(noti);
    if (data.match(NotificationSent)) {
    } else if (data.match(NotificationTutorNotExist)) {
      toast.info(data, {
        theme: "colored",
      });
    } else {
      console.log("student reschedule request error", data);
    }
  };
  //getting user schedule
  const getUserSchedule = async () => {
    console.log("getting user schedule");
    console.log('user',user);
    const { data } = await schedulerepo.getTutorSchedule(user.email);
    console.log(data);
    dispatchingSchedule(data);
  };
  const dispatchingSchedule = (data) => {
    if (data.length > 100) {
      console.log("schedule isfdfghgjhdk ", data);
      dispatch(setSchedule({ schedule: data }));
    } else if (data.match(ScheduleNotSet)) {
      toast.warning(data, {
        theme: "colored",
      });
    }
  };



  const settingSelectedClass = (classs) => {
    let classArray = selectedClass;
    const index = classArray.findIndex(
      (classItem) => classItem.slotno === classs.slotno
    );
    if (index !== -1) {
      classArray.splice(index, 1);
    } else {
      classArray.push(classs);
    }
    setSelectedClass([...classArray]);
  };
  useEffect(() => {
    gettingEnrolledClasses();
    fetchMatchedClasses();
  }, []);
  useEffect(() => {
    let temp = matchedClasses;
    setMatchedClasses(temp);
  }, [selectedClass]);
  return (
    <div>
      <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full mx-auto ">
        <h1 className="text-2xl font-bold text-accent text-center">
          {course.studentname}
        </h1>
        <div className="flex flex-col md:flex-row gap-4 w-full text-accent md:px-4">
          <div className="flex-1">
            <div
              className={`flex flex-col gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral ${
                classes.length > 3 ? "h-2/3 md:h-68  overflow-y-scroll" : ""
              } `}
            >
              {classes.map((classs) => (
                <div className="group" key={classs.slot}>
                  <div className="flex justify-between items-center  bg-base-100 px-4 py-2 rounded-md group-hover:bg-accent group-hover:cursor-pointer">
                    <span className="text-secondary group-hover:text-primary">
                      {classs.slot}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div
              className={`flex flex-col gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral ${
                matchedClasses?.slots?.length > 3
                  ? "h-2/3 md:h-68  overflow-y-scroll"
                  : ""
              } `}
            >
              {matchedClasses?.slots?.length > 0 ? (
                matchedClasses?.slots?.map((classs) => (
                  <div
                    className="group"
                    onClick={() => settingSelectedClass(classs)}
                    key={classs.slot}
                  >
                    <div
                      className={`flex justify-between items-center
                        ${
                          selectedClass.find(
                            (item) => item.slotno === classs.slotno
                          )
                            ? "bg-accent text-white"
                            : "bg-base-100"
                        } px-4 py-2 rounded-md group-hover:bg-accent group-hover:cursor-pointer`}
                    >
                      {console.log()}
                      <span className="group-hover:text-primary">
                        {classs.slot}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="font-bold text-2xl ">
                  No Classes Matched Can't swap classes
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4 gap-8">
          <button
            className="px-3 py-1.5 text-accent bg-white shadow-lg rounded-md w-32 font-semibold  hover:bg-indigo-600 hover:text-primary"
            onClick={SwapCourse}
          >
            Swap
          </button>
          <button
            className="px-3 py-1.5 text-accent bg-white shadow-lg rounded-md w-32 font-semibold  hover:bg-indigo-600 hover:text-primary"
            onClick={FinishCourse}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatingEnrollSchedule;

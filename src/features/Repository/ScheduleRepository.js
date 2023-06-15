import Repository from "./Repository";
const studentSchedule = "student/StudentSchedule";
const TutorSchedule = "tutor/TutorSchedule";
const GetStudentSchedule = "student/GetStudentSchedule";
const GetTutorSchedule = "tutor/GetTutorSchedule";
const GetTutorFreeClasses = "tutor/GetTutorFreeClasses";
const UpdateStudentSlot = "student/UpdateStudentSlot";
const AcceptEnrollScheduleChangeRequest =
  "tutor/AcceptEnrollScheduleChangeRequest";
export default {
  getStudentSchedule(email) {
    const url = `${GetStudentSchedule}?email=${email}`;
    return Repository.get(url);
  },
  getTutorSchedule(email) {
    const url = `${GetTutorSchedule}?email=${email}`;
    console.log("get tutor schedule", url);
    return Repository.get(url);
  },
  postStudentSchedule(email, details) {
    const url = `${studentSchedule}?email=${email}&details=${details}`;
    return Repository.post(url);
  },
  postTutorSchedule(email, details) {
    const url = `${TutorSchedule}?email=${email}&details=${details}`;
    return Repository.post(url);
  },
  getTutorFreeClasses(temail) {
    const url = `${GetTutorFreeClasses}?temail=${temail}`;
    return Repository.get(url);
  },
  updateStudentSlot(email, slots) {
    const url = `${UpdateStudentSlot}?email=${email}&slots=${slots}`;
    return Repository.post(url);
  },
  acceptEnrollScheduleChangeRequest(
    tutoremail,
    studentemail,
    courseid,
    slotFrom,
    slotTo,
    enrollDate
  ) {
    const url = `${AcceptEnrollScheduleChangeRequest}?tutoremail=${tutoremail}&studentemail=${studentemail}&courseid=${courseid}&slotFrom=${slotFrom}&slotTo=${slotTo}&enrollDate=${enrollDate}`;
    // tutoremail=saud@gmail.com&studentemail=saad@gmail.com&courseid=1&slotFrom=0,1,&slotTo=2,4,&enrollDate=06/11/2023
    return Repository.get(url);
  },
};

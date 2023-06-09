import AddCourse from "../Components/Admin/courses/AddCourse";
import Repository from "./Repository";
const allcoursesStudent = "student/GetCoursesList";
const allcoursesTutor = "tutor/GetCoursesList";
const studentEnlisted = "student/GetStudentEnlistedCourses";
const tutorEnlisted = "tutor/GetTutorEnlistedCourses";
const studentAddCourses = "student/StudentCourseEnlist";
const studentFinishCourse = "student/FinishCourse";
const rateTutor = "student/RateTutor";
const findTutor = "student/FindTutor";
const GetCourseGroup = "tutor/GetCourseGroup";
const SaveCourceGroup = "tutor/SaveCourseGroup";
const addNewCourse = "admin/AddCourse";
const getAdminAllCourses = "admin/GetCourses";
const getAllCourseGroup = "admin/GetAllCourseGroup";
const AdminSaveCourseGroup = "admin/SaveCourseGroup";
const GetCoursesForGroup = "admin/GetCoursesForGroup";
const GetStudentLearning = "student/GetStudentLearningCourses";
const GetTeachingStudents = "tutor/GetTeachingStudents";
const GetEnrolledClasses = "tutor/GetEnrolledClasses";
const GetUpdatedMatchedSlots = "tutor/GetUpdatedMatchedSlots";
const GettingFailedCoursesAll = "student/GettingFailedCoursesAll";
const GetTutorsLearning = "student/GetTutorsLearning";
//Task
const GetCourses = "student/GetCourses";
const FindTutorParent = "student/FindTutorParent";
const GetTutorsForExtraSession = "student/GetTutorsForExtraSession";
const SendRequestToTutorTemporary = "student/SendRequestToTutorTemporary";
export default {
  studentEnrolledCourses(email) {
    const url = `${studentEnlisted}?semail=${email}`;
    return Repository.get(url);
  },
  studentAllCourses(email) {
    const url = `${allcoursesStudent}?email=${email}`;
    return Repository.get(url);
  },
  studentAddCourse(email, courseid) {
    const url = `${studentAddCourses}?semail=${email}&cid=${courseid}`;
    return Repository.post(url);
  },
  findTutor(email, courseid, noOfSlots) {
    const url = `${findTutor}?semail=${email}&cid=${courseid}&noOfSlots=${noOfSlots}`;
    return Repository.get(url);
  },
  getTutorsForExtraSession(courseenrollid, courseid) {
    const url = `${GetTutorsForExtraSession}?courseenrollid=${courseenrollid}&courseid=${courseid}`;
    return Repository.get(url);
  },
  //Task

  getStudentLearning(semail) {
    const url = `${GetStudentLearning}?semail=${semail}`;
    return Repository.get(url);
  },
  getTutorsLearning(semail) {
    const url = `${GetTutorsLearning}?semail=${semail}`;
    return Repository.get(url);
  },
  sendRequestToTutorTemporary(semail, temail, cid, slot, noOfWeek) {
    const url = `${SendRequestToTutorTemporary}?semail=${semail}&temail=${temail}&cid=${cid}&slot=${slot}&noOfWeek=${noOfWeek}`;
    console.log('urkl is ',url);
    return Repository.post(url);
  },
  // Student Finish Course
  finishCourse(course) {
    const url = `${studentFinishCourse}`;
    console.log("Finishing course url", url);
    return Repository.post(url, course);
  },
  RateTutor(tutoremail, studentemail, courseid, rating) {
    const url = `${rateTutor}?tutoremail=${tutoremail}&studentemail=${studentemail}&courseid=${courseid}&rating=${rating}`;
    return Repository.post(url);
  },
  gettingFailedCoursesAll(email) {
    const url = `${GettingFailedCoursesAll}?email=${email}`;
    return Repository.get(url);
  },
  // tutor functions
  tutorAllCourses(email) {
    const url = `${allcoursesTutor}?email=${email}`;
    return Repository.get(url);
  },
  tutorEnrolledCourses(email) {
    const url = `${tutorEnlisted}?email=${email}`;
    return Repository.get(url);
  },
  getCourseGroup(email, course) {
    const url = `${GetCourseGroup}?email=${email}&coursename=${course.coursename}&courseid=${course.courseid}`;
    return Repository.get(url);
  },
  saveCourseGroup(coursegroup) {
    let data = "";
    coursegroup.map(async (item) => {
      const url = `${SaveCourceGroup}`;
      console.log("saving course", url);
      data = Repository.post(url, item);
    });
    return data;
  },
  getTeachingStudents(temail) {
    const url = `${GetTeachingStudents}?temail=${temail}`;
    return Repository.get(url);
  },
  getEnrolledClasses(enrollId) {
    const url = `${GetEnrolledClasses}?enrollId=${enrollId}`;
    return Repository.get(url);
  },
  getUpdatedMatchedSlots(enrollId) {
    const url = `${GetUpdatedMatchedSlots}?enrollId=${enrollId}`;
    return Repository.get(url);
  },
  // Admin functions
  addNewCourse(course) {
    const url = `${addNewCourse}`;
    return Repository.post(url, course);
  },
  adminAllCourses() {
    const url = `${getAdminAllCourses}`;
    return Repository.get(url);
  },
  // admin  course group
  adminAllCourseGroups() {
    const url = `${getAllCourseGroup}`;
    return Repository.get(url);
  },
  SavingCourseGroup(group) {
    console.log("saving group", group);
    let data = "";
    group.map(async (item) => {
      const url = `${AdminSaveCourseGroup}`;
      data = Repository.post(url, item);
    });
    return data;
  },
  SavingSingleCourseGroup(group) {
    const url = `${AdminSaveCourseGroup}`;
    return Repository.post(url, group);
  },
  GetCoursesGroup(groupname) {
    const url = `${GetCoursesForGroup}?groupname=${groupname}`;
    return Repository.get(url);
  },
  //Task
  //Parent getAll courses
  getCourses() {
    const url = `${GetCourses}`;
    return Repository.get(url);
  },
  //getting tutors
  findTutorParent(cid) {
    const url = `${FindTutorParent}?cid=${cid}`;
    return Repository.get(url);
  },
};

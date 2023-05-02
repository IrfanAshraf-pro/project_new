import AddCourse from "../Components/Admin/courses/AddCourse";
import Repository from "./Repository";
const allcoursesStudent = "student/GetCoursesList";
const allcoursesTutor = "tutor/GetCoursesList";
const studentEnlisted = "student/GetStudentEnlistedCourses";
const tutorEnlisted = "tutor/GetTutorEnlistedCourses";
const studentAddCourses = "student/StudentCourseEnlist";
const findTutor = "student/FindTutor";
const GetCourseGroup = "tutor/GetCourseGroup";
const SaveCourceGroup = "tutor/SaveCourseGroup";
const addNewCourse = "admin/AddCourse";
const getAdminAllCourses = "admin/GetCourses";
const getAllCourseGroup = "admin/GetAllCourseGroup";
const AdminSaveCourseGroup = "admin/SaveCourseGroup";
const GetCoursesForGroup="admin/GetCoursesForGroup"
const GetStudentLearning="student/GetStudentLearningCourses"
const GetTeachingStudents="tutor/GetTeachingStudents"
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
  getStudentLearning(semail){
    const url=`${GetStudentLearning}?semail=${semail}`
    return Repository.get(url)
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
  getTeachingStudents(temail){
    const url=`${GetTeachingStudents}?temail=${temail}`
    return Repository.get(url)
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
    console.log('saving group',group);
    let data = "";
    group.map(async (item) => {
      const url = `${AdminSaveCourseGroup}`;
      data = Repository.post(url, item);
    });
    return data;
  },
  SavingSingleCourseGroup(group){
    const url = `${AdminSaveCourseGroup}`;
    return Repository.post(url, group);
  },
  GetCoursesGroup(groupname){
    const url=`${GetCoursesForGroup}?groupname=${groupname}`
    return Repository.get(url)
  }
};
// if (role === 'Student') {
//     console.log('getting all courses');
//     const url = `${baseURl}${funcCallStudentCourses}?email=${email}`
//     const response = await axios.get(url)
//     const data = response.data
//     return data
// }else{
//     console.log('getting all courses tutor');
//     const url = `${baseURl}${funcCallTutorCourse}?email=${email}`
//     console.log(url);
//     const response = await axios.get(url)
//     const data = response.data
//     return data
// }

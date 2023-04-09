import Repository from "./Repository";
const allcoursesStudent="student/GetCoursesList"
const allcoursesTutor="tutor/GetCoursesList"
const studentEnlisted="student/GetStudentEnlistedCourses"
const tutorEnlisted="tutor/GetTutorEnlistedCourses"
const studentAddCourses="student/StudentCourseEnlist"
const findTutor='student/FindTutor'
export default {
    studentEnrolledCourses(email){
        const url=`${studentEnlisted}?semail=${email}`
        return Repository.get(url)
    },
    studentAllCourses(email){
        const url=`${allcoursesStudent}?email=${email}`
        return Repository.get(url)
    },
    studentAddCourse(email,courseid){
        const url=`${studentAddCourses}?semail=${email}&cid=${courseid}`
        console.log(url);
        return Repository.post(url)
    },
    findTutor(email,courseid,noOfSlots){
        const url=`${findTutor}?semail=${email}&cid=${courseid}&noOfSlots=${noOfSlots}`
        console.log(url);
        return Repository.get(url)
    }
}
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
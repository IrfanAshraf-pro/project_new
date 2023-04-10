import Repository from "./Repository";
const allcoursesStudent="student/GetCoursesList"
const allcoursesTutor="tutor/GetCoursesList"
const studentEnlisted="student/GetStudentEnlistedCourses"
const tutorEnlisted="tutor/GetTutorEnlistedCourses"
const studentAddCourses="student/StudentCourseEnlist"
const findTutor='student/FindTutor'
const GetCourseGroup="tutor/GetCourseGroup"
const SaveCourceGroup="tutor/SaveCourseGroup"
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
        return Repository.post(url)
    },
    findTutor(email,courseid,noOfSlots){
        const url=`${findTutor}?semail=${email}&cid=${courseid}&noOfSlots=${noOfSlots}`
        return Repository.get(url)
    },
    // tutor functions
    tutorAllCourses(email){
        const url=`${allcoursesTutor}?email=${email}`
        return Repository.get(url)
    },
    tutorEnrolledCourses(email){
        const url=`${tutorEnlisted}?email=${email}`
        return Repository.get(url)
    },
    getCourseGroup(email,course){
        const url=`${GetCourseGroup}?email=${email}&coursename=${course.coursename}&courseid=${course.courseid}`
        return Repository.get(url)
    },
    saveCourseGroup(coursegroup){
        let data=''
        coursegroup.map(async(item)=>{
            const url = `${SaveCourceGroup}`
            console.log('saving course',url);
            data=Repository.post(url,item)
        })
        return data
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
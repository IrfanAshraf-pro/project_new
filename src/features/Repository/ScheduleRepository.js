import Repository from "./Repository";
const studentSchedule="student/StudentSchedule"
const TutorSchedule="tutor/TutorSchedule"
const GetStudentSchedule="student/GetStudentSchedule"
const GetTutorSchedule="tutor/GetTutorSchedule"
export default{
    getStudentSchedule(email){
        const url= `${GetStudentSchedule}?email=${email}`
        return Repository.get(url)
    },
    getTutorSchedule(email){
        const url= `${GetTutorSchedule}?email=${email}`
        console.log('get tutor schedule',url);
        return Repository.get(url)
    },
    postStudentSchedule(email,details){
        const url=`${studentSchedule}?email=${email}&details=${details}`
        return Repository.post(url)
    },
    postTutorSchedule(email,details){
        const url=`${TutorSchedule}?email=${email}&details=${details}`
        return Repository.post(url)
    }
}
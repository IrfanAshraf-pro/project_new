import Repository from "./Repository";
const TodayClassesStudent = 'student/TodayClasses'
const TodayClassesTutor = 'tutor/TodayClasses'
const TakeClass="tutor/ClassReportTake"

export default {
    todayClassesStudent(email){
        const url=`${TodayClassesStudent}?email=${email}`
        return Repository.get(url)
    },
    todayClassesTutor(email){
        const url=`${TodayClassesTutor}?email=${email}`
        return Repository.get(url)
    },
    takeTodayClass(email,coursename,studentname,slot,isReschedule,isPreSchedule,classDate){
        const url=`${TakeClass}?email=${email}&coursename=${coursename}&studentname=${studentname}&slot=${slot}&isReschedule=${isReschedule}&isPreSchedule=${isPreSchedule}&classDate=${classDate}`
        return Repository.post(url)
    }
}
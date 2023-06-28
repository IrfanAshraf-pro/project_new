import Repository from "./Repository";
const TodayClassesStudent = 'student/TodayClasses'
const TodayClassesTutor = 'tutor/TodayClasses'
const TakeClass="tutor/ClassReportTake"
const ClassReportTakeTemp="tutor/ClassReportTakeTemp"

export default {
    todayClassesStudent(email){
        const url=`${TodayClassesStudent}?email=${email}`
        return Repository.get(url)
    },
    todayClassesTutor(email){
        const url=`${TodayClassesTutor}?email=${email}`
        return Repository.get(url)
    },
    takeTodayClass(email,coursename,semail,slot,isReschedule,isPreSchedule,isStudent,classDate){
        const url=`${TakeClass}?email=${email}&coursename=${coursename}&semail=${semail}&slot=${slot}&isReschedule=${isReschedule}&isPreSchedule=${isPreSchedule}&isStudent=${isStudent}&isTemp=false&classDate=${classDate}`
        return Repository.post(url)
    },

    //
    takeTodayClassTemp(email,coursename,semail,slot,isReschedule,isPreSchedule,isStudent,classDate){
        const url=`${ClassReportTakeTemp}?email=${email}&coursename=${coursename}&semail=${semail}&slot=${slot}&isReschedule=${isReschedule}&isPreSchedule=${isPreSchedule}&isStudent=${isStudent}&isTemp=true&classDate=${classDate}`
        return Repository.post(url)
    },

}
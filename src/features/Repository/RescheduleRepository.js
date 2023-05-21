import Repository from "./Repository";
const GetClassesToReschedule="tutor/GetTutorClassesForRescheduling"
const GetFreeClassesToRescheduleTo="tutor/GetClassesToRescheduleTo"
const GetSuggestedClassesToRescheduleTo="tutor/GetSuggestedClassesToRescheduleTo"
const rescheduleUrl="tutor/reschedule"
const Preschedule="tutor/PreSchedule"
export default{
    getClassesToReschedule(email,date,day){
        const url=`${GetClassesToReschedule}?email=${email}&date=${date}&day=${day}`
        return Repository.get(url)
    },
    getFreeClassesToRescheduleTo(temail,semail,date,day,coursename){
        const url=`${GetFreeClassesToRescheduleTo}?temail=${temail}&semail=${semail}&date=${date}&day=${day}&coursename=${coursename}`
        console.log(url);
        return Repository.get(url)
    },
    rescheduleClass(reschedule){
        const url=`${rescheduleUrl}`
        console.log('reschedule data is ',reschedule);
        return Repository.post(url,reschedule)
    },
    preScheduleClass(preschedule){
        const url=`${Preschedule}`
        console.log('reschedule data is ',preschedule);
        return Repository.post(url,preschedule)
    },
    getSuggestedClasesForRescheduling(temail,semail,date,day,coursename){
        const url=`${GetSuggestedClassesToRescheduleTo}?temail=${temail}&semail=${semail}&date=${date}&day=${day}&coursename=${coursename}`
        return Repository.get(url)

    }
}
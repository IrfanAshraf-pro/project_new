import Repository from "./Repository";
const GetClassesToReschedule="tutor/GetTutorClassesForRescheduling"
const GetFreeClassesToRescheduleTo="tutor/GetClassesToRescheduleTo"
const rescheduleUrl="tutor/reschedule"
export default{
    getClassesToReschedule(email,date,day){
        const url=`${GetClassesToReschedule}?email=${email}&date=${date}&day=${day}`
        return Repository.get(url)
    },
    getFreeClassesToRescheduleTo(temail,semail,date,day,coursename){
        const url=`${GetFreeClassesToRescheduleTo}?temail=${temail}&semail=${semail}&date=${date}&day=${day}&coursename=${coursename}`
        return Repository.get(url)
    },
    rescheduleClass(reschedule){
        const url=`${rescheduleUrl}`
        console.log('reschedule data is ',reschedule);
        return Repository.post(url,reschedule)
    }
}
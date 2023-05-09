import Repository from "./Repository";
const GetClassesToReschedule="tutor/GetTutorClassesForRescheduling"
export default{
    getClassesToReschedule(email,date,day){
        const url=`${GetClassesToReschedule}?email=${email}&date=${date}&day=${day}`
        return Repository.get(url)
    }
}
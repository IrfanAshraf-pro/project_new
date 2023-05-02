import Repository from "./Repository";
const StudentFeeDetails='Student/StudentFeeRecord'
export default{
    GetStudentFeeDetails(semail){
        const url=`${StudentFeeDetails}?semail=${semail}`
        return Repository.get(url)
    }
}
import Repository from "./Repository";
const StudentFeeDetails='Student/StudentFeeRecord'
const getFeeGroups="admin/GetSubjectGroupFeeName"
const saveGroupFee="admin/SaveSubjectFeeGroupName"
export default{
    GetStudentFeeDetails(semail){
        const url=`${StudentFeeDetails}?semail=${semail}`
        return Repository.get(url)
    },
    GetFeeGroups(){
        const url=`${getFeeGroups}`
        return Repository.get(url)
    },
    SaveGroupFee(data){
        const url=`${saveGroupFee}`
        return Repository.post(url,data)
    }
    
}
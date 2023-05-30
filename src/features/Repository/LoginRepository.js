import Repository from "./Repository";
const Login="Login/Login"
const loginParent="Login/ParentLogin"
const GetStudentSettings="student/GetStudentSettings"
const UpdateStudentSettings="student/updateStudentSettings"
export default{
    loginUser(email,password){
        const url=`${Login}?email=${email}&password=${password}`
        return Repository.get(url)
    },
    LoginParent(cnic){
        const url=`${loginParent}?cnic=${cnic}`
        return Repository.get(url)
    },
    getStudentSettings(email){
        const url=`${GetStudentSettings}?email=${email}`
        return Repository.get(url)
    },
    saveSettings(settings){
        const url=`${UpdateStudentSettings}`
        return Repository.post(url,settings)
    }
}
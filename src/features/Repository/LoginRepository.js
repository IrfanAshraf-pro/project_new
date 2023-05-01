import Repository from "./Repository";
const Login="Login/Login"
const loginParent="Login/ParentLogin"
export default{
    loginUser(email,password){
        const url=`${Login}?email=${email}&password=${password}`
        return Repository.get(url)
    },
    LoginParent(cnic){
        const url=`${loginParent}?cnic=${cnic}`
        return Repository.get(url)
    }
}
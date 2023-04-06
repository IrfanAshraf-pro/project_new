import Repository from "./Repository";
const Login="Login/Login"
export default{
    loginUser(email,password){
        const url=`${Login}?email=${email}&password=${password}`
        return Repository.get(url)
    }
}
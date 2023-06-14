import { createContext, useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import {toast} from 'react-toastify'
import {RepositoryFactory} from '../../../Repository/RepositoryFactory'
import { AlreadyExist, AlreadyStudent, AlreadyTutor, SignedUpSuccessful } from "../../../Utils/MatchTypes";
import { useNavigate } from "react-router-dom";
export const StepperContext = createContext();
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
    contact: Yup.string()
    .matches(/^(0)?\d{10}$/, "Contact must be exactly 11 characters")
    .required("Contact is required"),
  
  semester: Yup.number()
    .typeError("Semester must be a number")
    .min(1, "Semester must be at least 1")
    .required("Semester is required"),
    cgpa: Yup.number()
    .typeError("CGPA must be a number")
    .max(4, "CGPA must be lower than 4")
    .required("CGPA is required"),
});
const loginrepo=RepositoryFactory.get('login')
export function UseContextProvider({ children }) {
  const [account,setAccount]=useState('tutor')
  const [gender,setGender]=useState('male')
  const [response,setResponse]=useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigation=useNavigate()
  const formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      contact:"",
      fathercnic:"",
      semester:0,
      cgpa:0,
    },
    validationSchema: validationSchema,
    onSubmit:(values)=>{
      values.gender = gender;
      values.account = account;
      // Remove the fathercnic field if the account is tutor
      if (values.account === "tutor") {
        delete values.fathercnic;
      }
      console.log(values);
      setIsLoading(true)
      const signingUpStudent=async()=>{
        let {data}=await loginrepo.signUpStudent(values);
        if(data.match(SignedUpSuccessful)){
          setResponse(data)
          navigation('/login')
        }else if(data.match(AlreadyExist)){
          setResponse(data)
        }else if(data.match(AlreadyTutor)){
          setResponse(data)
        }else{
          console.log(data);
          setResponse('Error in signing up. Please try later.')
        }
        setIsLoading(false)
      }
      const signingUpTutor=async()=>{
        let {data}=await loginrepo.signUpTutor(values);
        if(data.match(SignedUpSuccessful)){
          setResponse(data)
          navigation('/login')
        }else if(data.match(AlreadyExist)){
          setResponse(data)
        }else if(data.match(AlreadyStudent)){
          setResponse(data)
        }else{
          console.log(data);
          setResponse('Error in signing up. Please try later.')
        }
        setIsLoading(false)
    }
    if (values.account === "tutor") {
      signingUpTutor()
    }else{
      signingUpStudent()
    }
  }
})

  return (
    <StepperContext.Provider value={{formik,account,setAccount,gender,setGender,isLoading,response}}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const formik = useContext(StepperContext);
  return formik
}
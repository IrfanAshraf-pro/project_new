import { createContext, useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import {toast} from 'react-toastify'

export const StepperContext = createContext();

export function UseContextProvider({ children }) {
  const [account,setAccount]=useState('tutor')
  const [gender,setGender]=useState('male')
  const [response,setResponse]=useState('')
  const [isLoading, setIsLoading] = useState(false)
  const formik=useFormik({
    initialValues:{
      name:"saud",
      email:"saud302@gmail.com",
      password:"12345",
      contact:"1213412",
      fathercnic:122321,
      semester:1,
      cgpa:2,
    },
    validationSchema:Yup.object({
      name:Yup.string().min(3,"Name must be minimum 3 characters").required("Name is Required"),
      email:Yup.string().email("Invalid email address").required("Email is Required"),
      password:Yup.string().min(4,"Password must be atleast 4 characters").required("Password is Required"),
      contact:Yup.number().min(9,"Contact no must be minimum 11 characters").positive().required("Contact is Required"),
      fathercnic:Yup.number().min(13,"Father cnic must be 13 characters").positive().required("Father cnic is Required"),
      semester:Yup.number().min(1,"Semester should be minimum 1").positive().required("Semester is Required"),
      cgpa:Yup.number().min(2,"Cgpa must be higher than 2").positive().required("Cgpa is Required")

    }),
    onSubmit:(values)=>{
      console.log(values);
      setIsLoading(true)
      setTimeout(() => {
        setResponse('Submitted Successfully')
        setIsLoading(false)
      }, 2000);
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

// .max(12,"Contact no must not exceed 11 characters").required("Contact no is required")
// .max(13,"Father cnic must be 13 characters").required("Father cnic is required")
// .max(8,"Semester should not be more than 8").required('Semester is Required')
// .max(4,"Cgpa should not be more than 4").required('Cgpa is Required')
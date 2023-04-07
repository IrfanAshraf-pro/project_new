import { useFormik } from "formik";
import * as Yup from "yup"
import React,{useState} from "react";
import {toast} from 'react-toastify'
import { useNavigate,NavLink } from "react-router-dom";
// importing background image for login page
import Background from "../../assests/bg-login.png";

// importing Repositories
import { RepositoryFactory } from "../Repository/RepositoryFactory";
import { Loader } from "../Components";
var login = RepositoryFactory.get("login");

var backgroundStyles = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};
const Login = () => {
  const [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  const formik=useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema:Yup.object({
      email:Yup.string().email("Invalid email address").required("Email is Required"),
      password:Yup.string().min(4,"Password must be atleast 4 characters").required("Password is Required")
    }),
    onSubmit:(values)=>{
      submitHandler(values)
    }
  })
  const submitHandler=async(values)=>{
    setIsLoading(true)
    let {data}=await login.loginUser(values.email,values.password)
    data && setTimeout(()=>setIsLoading(false),500)
    if(typeof data==='object'){
    console.log(data);
    navigate('/app/welcome')
    }
    else{
      toast.warning(data,{
        theme:"colored"
      })
    }
    
  }
  return (
    <>
    {isLoading && <Loader/>}
    <div className="h-screen w-full flex items-center justify-center" style={backgroundStyles}>
      <div className="card text-center bg-base-100 p-3 py-6 max-w-md bg-opacity-90 cshadow">
        <div className="font-bold font-uppercase text-accent text-4xl md:text-5xl mx-auto mt-4">
          Welcome to House of Tutors
        </div>
        <form className="my-6" onSubmit={formik.handleSubmit}>
          <div className="form-control w-full max-w-xs mx-auto">
            <input
              type="text"
              name="email"
              placeholder="Enter your Email"
              className="input w-full max-w-xs input-accent text-gray-600"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="label">
              <span className="label-text text-error">
                {formik.touched.email && formik.errors.email? formik.errors.email:""}
              </span>
            </label>
          </div>
          <div className="form-control w-full max-w-xs mx-auto my-2">
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              className="input w-full max-w-xs input-accent text-gray-600"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="label">
            <span className="label-text text-error">
                {formik.touched.password && formik.errors.password? formik.errors.password:""}
              </span>
            </label>
          </div>
          <button className="btn btn-wide btn-accent text-primary text-lg" type="submit">Login</button>
          <div className="w-full max-w-xs mx-auto mt-4 text-secondary text-lg md:text-xl">
            Don't have an account? 
            <span className="ml-2 text-accent font-bold text-xl md:text-2xl hover:underline">
             <NavLink to='/signup'>SignUp</NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
    
    </>
  );
};

export default Login;

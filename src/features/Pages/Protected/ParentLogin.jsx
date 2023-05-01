import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
// importing background image for login page
import Background from "../../../assests/bg-login.png";

// importing Repositories
import { RepositoryFactory } from "../../Repository/RepositoryFactory";
import { Loader } from "../../Components";
import { useDispatch } from "react-redux";
import { setRole, setUser } from "../../../app/Slices/AuthSlice";
var login = RepositoryFactory.get("login");

var backgroundStyles = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};
const ParentLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      cnic: "",
    },
    validationSchema: Yup.object({
      cnic: Yup.string()
        .max(13,"Invalid cnic address").min(13,"Invalid Cnic")
        .required("cnic is Required"),
    }),
    onSubmit: (values) => {
      submitHandler(values);
    },
  });
  const submitHandler = async (values) => {
    setIsLoading(true);
    console.log(values);
    let { data } = await login.LoginParent(values.cnic);
    data && setTimeout(() => setIsLoading(false), 500);
    if (typeof data === "object") {
        dispatch(setRole({ item: data.Role }));
        dispatch(setUser({ user: data.data }));
      navigate("/app/parentsfee");
    } else {
      toast.warning(data, {
        theme: "colored",
      });
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div
        className="h-screen w-full flex items-center justify-center"
        style={backgroundStyles}
      >
        <div className="card text-center bg-base-100 p-3 py-6 max-w-md bg-opacity-90 cshadow">
          <div className="font-bold font-uppercase text-accent text-4xl md:text-5xl mx-auto mt-4">
            Welcome to House of Tutors
          </div>
          <form className="my-6" onSubmit={formik.handleSubmit}>
            <div className="form-control w-full max-w-xs mx-auto">
              <input
                type="text"
                name="cnic"
                placeholder="Enter your cnic"
                className="input w-full max-w-xs input-accent text-gray-600"
                value={formik.values.cnic}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="label">
                <span className="label-text text-error">
                  {formik.touched.cnic && formik.errors.cnic
                    ? formik.errors.cnic
                    : ""}
                </span>
              </label>
            </div>
            <button
              className="btn btn-wide btn-accent text-primary text-lg"
              type="submit"
            >
              Login
            </button>
            <div className="w-full max-w-xs mx-auto mt-4 text-secondary text-lg md:text-xl">
              <span className="ml-2 text-accent font-bold text-xl md:text-2xl hover:underline">
                <NavLink to="/login">Back to Main Login</NavLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ParentLogin;

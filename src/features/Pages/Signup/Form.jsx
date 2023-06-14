import { Suspense, useState } from "react";
import { useStepperContext } from "./contexts/StepperContext";
import { NavLink } from "react-router-dom";
const Form = () => {
  const { formik, setAccount, account, setGender } = useStepperContext();
  const [tutorChecked, setTutorChecked] = useState(true);
  const [studentChecked, setStudentChecked] = useState(false);
  const [maleChecked, setMaleChecked] = useState(true);
  const [femaleChecked, setFemaleChecked] = useState(false);
  function handleTutorCheck() {
    setTutorChecked(!tutorChecked);
    setAccount("tutor");
    if (studentChecked) setStudentChecked(false);
  }

  function handleStudentCheck() {
    setStudentChecked(!studentChecked);
    setAccount("student");
    if (tutorChecked) setTutorChecked(false);
  }

  function handleMaleCheck() {
    setMaleChecked(!maleChecked);
    setGender("male");
    if (femaleChecked) setFemaleChecked(false);
  }

  function handleFemaleCheck() {
    setFemaleChecked(!femaleChecked);
    setGender("female");
    if (maleChecked) setMaleChecked(false);
  }
  return (
    <div  className="mt-4 card text-center bg-base-100 p-3 py-6 max-w-xl bg-opacity-90 cshadow mx-auto  pb-2  md:w-10/12 h-[90%] shadow-xl shadow-primary  rounded-md ">
      <div className="flex flex-col gap-1">
        {/*  */}
        <div className="flex items-center justify-center gap-4 px-4">
          <div className="mx-2 w-20  mb-2">
            <label
              htmlFor="tutor"
              className="text-secondary text-lg flex items-center justify-between gap-2 w-20 mx-auto"
            >
              <input
                type="radio"
                name="account"
                id="tutor"
                className="radio radio-accent"
                checked={tutorChecked}
                onChange={handleTutorCheck}
              />
              <span>Tutor</span>
            </label>
          </div>
          <div className="mx-2 w-20">
            <label
              htmlFor="student"
              className="text-secondary text-lg flex items-center justify-between gap-2 w-20 mx-auto"
            >
              <input
                type="radio"
                name="account"
                id="student"
                className="radio radio-accent"
                checked={studentChecked}
                onChange={handleStudentCheck}
              />
              <span>Student</span>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 px-4">
          <div className="mx-2 w-20 mb-2">
            <label
              htmlFor="male"
              className="text-secondary text-lg flex items-center justify-between gap-2 w-20 mx-auto"
            >
              <input
                type="radio"
                name="gender"
                id="male"
                className="radio radio-accent"
                checked={maleChecked}
                onChange={handleMaleCheck}
              />
              <span>Male</span>
            </label>
          </div>
          <div className="mx-2 w-20">
            <label
              htmlFor="female"
              className="text-secondary text-lg flex items-center justify-between gap-2 w-20 mx-auto"
            >
              <input
                type="radio"
                name="gender"
                id="female"
                className="radio radio-accent"
                checked={femaleChecked}
                onChange={handleFemaleCheck}
              />
              <span>Female</span>
            </label>
          </div>
        </div>
        {/* // */}
        <div className="flex flex-col md:flex-row justify-between px-10">
          <div className="">
          <div className="form-control w-full max-w-xs mx-auto">
              <span className="label-text text-start mb-1">
                Enter your Name
              </span>
              <input
                type="text"
                name="name"
                placeholder="Enter your Name"
                className="input w-full max-w-xs input-accent text-gray-600"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="label">
                <span className="label-text text-error">
                  {formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : ""}
                </span>
              </label>
            </div>
            <div className="form-control w-full max-w-xs mx-auto">
              <span className="label-text text-start mb-1">
                Enter your Email
              </span>

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
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""}
                </span>
              </label>
            </div>
            <div className="form-control w-full max-w-xs mx-auto">
              <span className="label-text text-start mb-1">
                Enter your Password
              </span>
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
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ""}
                </span>
              </label>
            </div>
          </div>
          <div className="">
            <div className="form-control w-full max-w-xs mx-auto">
              <span className="label-text text-start mb-1">
                Enter your Contact No
              </span>
              <input
                type="number"
                name="contact"
                placeholder="Enter your Contact"
                className="input w-full max-w-xs input-accent text-gray-600"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="label">
                <span className="label-text text-error">
                  {formik.touched.contact && formik.errors.contact
                    ? formik.errors.contact
                    : ""}
                </span>
              </label>
            </div>
            {account === "student" && (
              <div className="form-control w-full max-w-xs mx-auto">
                <span className="label-text text-start mb-1">
                  Enter your Fathercnic
                </span>
                <input
                  type="text"
                  name="fathercnic"
                  placeholder="Enter your Fathercnic"
                  className="input w-full max-w-xs input-accent text-gray-600"
                  value={formik.values.fathercnic}
                  onChange={formik.handleChange}
                //   onBlur={formik.handleBlur}
                />
                {/* <label className="label">
                  <span className="label-text text-error">
                    {formik.touched.fathercnic && formik.errors.fathercnic
                      ? formik.errors.fathercnic
                      : ""}
                  </span>
                </label> */}
              </div>
            )}
            <div className="form-control w-full max-w-xs mx-auto">
              <span className="label-text text-start mb-1">
                Enter your Semester
              </span>
              <input
                type="number"
                name="semester"
                placeholder="Enter your Semester"
                className="input w-full max-w-xs input-accent text-gray-600"
                value={formik.values.semester}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="label">
                <span className="label-text text-error">
                  {formik.touched.semester && formik.errors.semester
                    ? formik.errors.semester
                    : ""}
                </span>
              </label>
            </div>
            <div className="form-control w-full max-w-xs mx-auto">
              <span className="label-text text-start mb-1">
                Enter your CGPA
              </span>

              <input
                type="number"
                name="cgpa"
                placeholder="Enter your cgpa"
                className="input w-full max-w-xs input-accent text-gray-600"
                value={formik.values.cgpa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="label">
                <span className="label-text text-error">
                  {formik.touched.cgpa && formik.errors.cgpa
                    ? formik.errors.cgpa
                    : ""}
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="w-full max-w-xs mx-auto text-secondary text-lg md:text-xl">
          Already have an account?
          <span className="ml-2 text-accent font-bold text-xl md:text-2xl hover:underline">
            <Suspense fallback={<div>Loading..</div>}>
              <NavLink to="/login">LogIn</NavLink>
            </Suspense>
          </span>
        </div>
        <button
          className="btn btn-wide mx-auto btn-accent text-primary text-lg"
          type="submit"
          onClick={formik.handleSubmit}
        >
          SignUp
        </button>
      </div>
    </div>
  );
};

export default Form;

import { useState } from "react";
import { useStepperContext } from "../contexts/StepperContext";

export default function Details() {
  const { formik,setGender } = useStepperContext();
  const [maleChecked, setMaleChecked] = useState(true);
  const [femaleChecked, setFemaleChecked] = useState(false);
  function handleMaleCheck() {
    setMaleChecked(!maleChecked);
    setGender('male')
    if (femaleChecked) setFemaleChecked(false);
  }

  function handleFemaleCheck() {
    setFemaleChecked(!femaleChecked);
    setGender('female')
    if (maleChecked) setMaleChecked(false);
  }
  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="form-control w-full max-w-xs mx-auto">
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
                {formik.touched.name && formik.errors.name? formik.errors.name:""}
              </span>
            </label>
      </div>
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
      <div className="form-control w-full max-w-xs mx-auto">
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
      <div className="flex full mt-2 px-8 md:px-12">
      <div className="mx-2 w-full flex-1 mb-2">
        <label htmlFor="male" className="text-secondary text-lg flex items-center justify-between gap-2 w-20 mx-auto">
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
      <div className="mx-2 w-full flex-1">
      <label htmlFor="female" className="text-secondary text-lg flex items-center justify-between gap-2 w-20 mx-auto">
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
    </div>
  );
}

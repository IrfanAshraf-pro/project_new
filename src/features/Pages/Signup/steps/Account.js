import { Suspense, useState } from "react";
import {  useStepperContext } from "../contexts/StepperContext";
import {NavLink} from 'react-router-dom'
export default function Account() {
  const [tutorChecked, setTutorChecked] = useState(true);
  const [studentChecked, setStudentChecked] = useState(false);
  const {setAccount} = useStepperContext();
function handleTutorCheck() {
  setTutorChecked(!tutorChecked);
  setAccount('tutor')
  if (studentChecked) setStudentChecked(false);
}

function handleStudentCheck() {
  setStudentChecked(!studentChecked);
  setAccount('student')
  if (tutorChecked) setTutorChecked(false);
}
  return (
    <div className="flex flex-col">
      <div className="font-bold font-uppercase text-accent text-xl md:text-3xl mx-auto mb-4 capitalize">Please select account type</div>
      <div className="mx-2 w-full flex-1 mb-2">
        <label htmlFor="tutor" className="text-secondary text-lg flex items-center justify-between gap-2 w-20 mx-auto">
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
      <div className="mx-2 w-full flex-1">
      <label htmlFor="student" className="text-secondary text-lg flex items-center justify-between gap-2 w-20 mx-auto">
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
      <div className="w-full max-w-xs mx-auto mt-4 text-secondary text-lg md:text-xl">
            Already have an account? 
            <span className="ml-2 text-accent font-bold text-xl md:text-2xl hover:underline">
            <Suspense fallback={<div>Loading..</div>}>
            <NavLink to='/login'>LogIn</NavLink>
            </Suspense>
            </span>
          </div>
    </div>
  );
}

import React from "react";
import { useEffect } from "react";
import AddCourseForm from "./AddCourseForm";

const AddCourse = ({ setIsAdded, isAdded,setIsLoading }) => {
    useEffect(() => {
      return () => {
        setIsAdded(false)
      }
    }, [])
    
  return (
    <>
      <input
        type="checkbox"
        checked={isAdded | false}
        onChange={setIsAdded}
        id="admincourse"
        className="modal-toggle"
      />
      <label htmlFor="admincourse" className="modal cursor-pointer">
        <label className="modal-box text-center relative" htmlFor="">
          <h3 className="text-lg font-bold mb-2">Add New Course</h3>
          <AddCourseForm setIsAdded={setIsAdded} setIsLoading={setIsLoading} />
        </label>
      </label>
    </>
  );
};

export default AddCourse;

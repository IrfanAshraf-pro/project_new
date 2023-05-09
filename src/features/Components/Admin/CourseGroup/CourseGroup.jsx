import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const CourseGroupModal = ({ AddGroup,groupNameShow,setGroupNameShow }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length < 10) {
      toast.warn("Please enter valid Groupname", {
        theme: "colored",
      });
    } else {
      AddGroup(value);
    }
  };
  useEffect(() => {
    return () => {
      setValue("");
    };
  }, []);

  return (
    <>
      <input
        type="checkbox"
        id="admincoursegroup"
        className="modal-toggle"
        checked={groupNameShow | false}
        onChange={setGroupNameShow}
      />
      <label
        className="modal modal-bottom sm:modal-middle"
        htmlFor="admincoursegroup"
      >
        <label htmlFor="" className="modal-box ">
          <h3 className="font-bold text-lg text-center mb-6">
            Enter Name of Group
          </h3>
          <form
            className=" flex gap-1 flex-col md:flex-row w-full justify-between"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Enter Group name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input mb-2 w-full max-w-xs mx-auto input-accent text-gray-600"
            />
            <button className="btn max-w-xs w-full mx-auto mb-4  md:btn-md  btn-accent hover:btn-primary">
              Submit
            </button>
          </form>
        </label>
      </label>
    </>
  );
};

export default CourseGroupModal;

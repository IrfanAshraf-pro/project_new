import React, { useState } from "react";
import { Link } from "react-router-dom";

const SelectWeeksModal = ({ selectedCourse }) => {
  const [selectedValue, setSelectedValue] = useState(1);
  console.log(selectedCourse);
  const findTutors = () => {
    console.log(selectedValue);
  };
  return (
    <>
      <input type="checkbox" id="selectweekModal" className="modal-toggle" />
      <label
        className="modal modal-bottom sm:modal-middle"
        htmlFor="selectweekModal"
      >
        <div className="modal-box ">
          <div className="flex  flex-col justify-between gap-4 px-2">
            <h3 className="font-bold text-lg text-center ">
              Please select No of Weeks
            </h3>
            <select
              className="select mr-4 border-2 border-accent w-40"
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option disabled defaultChecked className="w-60">
                Please select a course
              </option>
              <option value={1} className="w-60">
                1
              </option>
              <option value={2} className="w-60">
                2
              </option>
              <option value={3} className="w-60">
                3
              </option>
            </select>
            <Link
              //   htmlFor="selectweekModal"
              to={`/app/GetExtraSessionsTutors/${selectedValue}`}
              state={{ selectedCourse }}
              className="px-6 mt-4 py-1.5 text-accent text-center bg-white shadow-lg rounded-md  font-thin  hover:bg-indigo-600 hover:text-primary"
              onClick={findTutors}
            >
              Find Tutor
            </Link>
          </div>
        </div>
      </label>
    </>
  );
};

export default SelectWeeksModal;

import React, { useState } from "react";
const EnterSlotsToMatch = ({
  noOfSlots,
  setnoOfSlots,
  handleSlotRequest,
  course,
}) => {
  const onClick = () => {
    handleSlotRequest(noOfSlots,course)
  };
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="slotsModal" className="modal-toggle" />
      <label htmlFor="slotsModal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="slotsModal">
          <h3 className="text-lg font-bold">Enter No of slots to be mathced</h3>
          <p>
            {course.coursename} 
          </p>

          <div className="form-control w-full max-w-xs mx-auto my-2">
            <select
              value={noOfSlots} // ...force the select's value to match the state variable...
              onChange={(e) => setnoOfSlots(e.target.value)} // ... and update the state variable on any change!
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                value={1}
                className="p-1 py-2 bg-gray-100 hover:bg-gray-300"
              >
                1
              </option>
              <option
                value={2}
                className="p-1 py-2 bg-gray-100 hover:bg-gray-300"
              >
                2
              </option>
              <option
                value={3}
                className="p-1 py-2 bg-gray-100 hover:bg-gray-300"
              >
                3
              </option>
              <option
                value={4}
                className="p-1 py-2 bg-gray-100 hover:bg-gray-300"
              >
                4
              </option>
              <option
                value={5}
                className="p-1 py-2 bg-gray-100 hover:bg-gray-300"
              >
                5
              </option>
              <option
                value={10}
                className="p-1 py-2 bg-gray-100 hover:bg-gray-300"
              >
                10
              </option>
            </select>

            <label
              htmlFor="slotsModal"
              type="submit"
              className="btn btn-accent mt-2 group btn-sm md:btn-md"
              onClick={onClick}
            >
              Find Tutor
            </label>
          </div>
        </label>
      </label>
    </div>
  );
};

export default EnterSlotsToMatch;

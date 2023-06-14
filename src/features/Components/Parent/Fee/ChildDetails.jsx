import React, { useState } from "react";
import Collapse from "../../Custom/Collapse";
import PayFeeModal from "./PayFeeModal";
const ChildDetails = ({
  childSelected,
  details,
  showDetails,
  setShowDetails,
  isFeePaid,
  setIsFeepaid,
  selected,
  setSelected,
}) => {
  // const [isLoading, setIsLoading] = useState(false);
  const [showPayFeeModal, setPayFeeModal] = useState(false);
  const PayFee = () => {
    setPayFeeModal(true);

    console.log("paying feeeeee");
    console.log("selected is ", selected);
  };
  const setttingSelected = (item) => {
    setSelected(item);
  };
  return (
    <>
      <input
        // checked={showDetails | false}
        // onChange={setShowDetails}
        type="checkbox"
        id="childDetails"
        className="modal-toggle"
      />
      <label
        htmlFor="childDetails"
        className="modal modal-bottom sm:modal-middle cursor-pointer"
      >
        <label className="modal-box  relative">
          <h3 className="font-bold text-lg mb-2 ">
            Fee Details of {childSelected.email}
          </h3>

          <div className="w-full mx-auto p-2 px-4 rounded-md bg-accent text-white">
            <div className="flex items-center justify-between w-[90%]">
              <p className="flex-1">Tutor</p>
              <p className="mr-12">Course</p>
              <p className="ml-2">Lectures</p>
              <p className="ml-6">Remaining</p>
            </div>
          </div>
          <div className="mt-1">
            {details.length > 0 ? (
              details.map((report) => (
                <div onClick={() => setttingSelected(report)}>
                  <Collapse
                    name={report.name}
                    coursename={report.coursename}
                    noOfLectures={report.noOfLectures}
                    totalFee={report.remainingamount}
                    report={report}
                  />
                </div>
              ))
            ) : (
              <p>No detials at the moment</p>
            )}
          </div>
          <div
            className="px-3 py-1.5 text-white bg-accent duration-150 shadow-lg rounded-md  font-thin w-full mt-2 hover:bg-indigo-600 hover:text-primary text-center"
            onClick={() => setPayFeeModal(true)}
          >
            Pay fee {selected.name === undefined ? "" : "to " + selected.name}
          </div>
        </label>
      </label>
      <PayFeeModal
        showPayFeeModal={showPayFeeModal}
        setPayFeeModal={setPayFeeModal}
        selected={selected}
        details={details}
        isFeePaid={isFeePaid}
        setIsFeepaid={setIsFeepaid}
      />
    </>
  );
};

export default ChildDetails;

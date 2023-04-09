import React from "react";

const TutorsModal = ({ tutors, showTutorModal, setShowTutorModal }) => {
  console.log("tutor modal", showTutorModal);
  return (
    <div>
      <input
        checked={showTutorModal | false}
        onChange={setShowTutorModal}
        type="checkbox"
        id="tutorsModal"
        className="modal-toggle"
      />
      {/* <input type="checkbox" id="tutorsModal" className="modal-toggle" /> */}
      <label
        className="modal modal-bottom sm:modal-middle"
        htmlFor="tutorsModal"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Tutors Matched
          </h3>
          <div className="my-4">

          </div>
          <div className="modal-action">
            <label htmlFor="tutorsModal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </label>
    </div>
  );
};

export default TutorsModal;

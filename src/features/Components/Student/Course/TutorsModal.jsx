import React,{useEffect} from "react";
import TutorModalRow from "./TutorModalRow";

const TutorsModal = ({ tutors, showTutorModal, setShowTutorModal,selectedCourse }) => {
  useEffect(() => {
    return () => {
        setShowTutorModal(false)
    }
  }, [])
  
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
      <div
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box relative">
        <label htmlFor="tutorsModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="font-bold text-lg">
            Tutors Matched
          </h3>
          <div className="my-3 flex flex-col items-center h-72 md:h-60 overflow-y-scroll p-2 gap-2 md:px-4">
            {
                tutors.map(tutor=>(
                    <TutorModalRow tutor={tutor} selectedCourse={selectedCourse} key={tutor.email} setShowTutorModal={setShowTutorModal}/>
                ))
            }
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TutorsModal;

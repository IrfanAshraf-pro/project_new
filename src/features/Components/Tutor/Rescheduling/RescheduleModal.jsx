import React from "react";

const RescheduleModal = ({ selected, setIsReschedule,setIsPreschedule}) => {
  return (
    <div>
      <input type="checkbox" id="rescheduleModal" className="modal-toggle" />
      <label htmlFor="rescheduleModal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="font-bold text-lg mb-6">Choose Either One</h3>
          <div className="space-y-6 mx-auto flex flex-col modal-action">
            <label
              className="btn btn-outline btn-outline-accent hover:btn-accent text-accent hover:text-white"
              htmlFor="rescheduleModal"
              onClick={() => setIsReschedule(true)}
            >
              Reschedule
            </label>
            <label
              className="btn btn-outline btn-outline-accent hover:btn-accent text-accent hover:text-white"
              htmlFor="rescheduleModal"
              onClick={()=>setIsPreschedule(true)}
            >
              PreSchedule
            </label>
          </div>
        </label>
      </label>
    </div>
  );
};

export default RescheduleModal;

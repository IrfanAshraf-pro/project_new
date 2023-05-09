import React from "react";

const PreScheduleModal = ({ isPreschedule, setIsPreschedule }) => {
  return (
    <div>
      <input
        checked={isPreschedule | false}
        onChange={setIsPreschedule}
        type="checkbox"
        id="preschedulemodal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Preschedule</h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="preschedulemodal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreScheduleModal;

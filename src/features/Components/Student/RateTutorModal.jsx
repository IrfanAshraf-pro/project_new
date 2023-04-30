import React from "react";
import Rating from 'react-rating'

const RateTutorModal = () => {
  const starIcon=()=>(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>

  )
  return (
    <>
      <input type="checkbox" id="ratetutor" className="modal-toggle" />
      <label
        className="modal modal-bottom sm:modal-middle"
        htmlFor="ratetutor"
      >
        <div className="modal-box ">
          <h3 className="font-bold text-lg text-start">Rate Tutor</h3>
          <div className=" flex flex-col gap-3 ">
            <div>
                <Rating
                  emptySymbol={starIcon}
                />
            </div>
            <button className="btn btn-accent">Rate Tutor</button>
          </div>
        </div>
      </label>
    </>
  );
};

export default RateTutorModal;

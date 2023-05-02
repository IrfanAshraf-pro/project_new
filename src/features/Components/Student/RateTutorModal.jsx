import React from "react";
import Rating from "react-rating";
import GreyStar from '../../../assests/star-grey.png'
import RedStar from '../../../assests/star-red.png'
import YellowStar from '../../../assests/star-yellow.png'

const RateTutorModal = ({ selectedCourse }) => {
  return (
    <>
      <input type="checkbox" id="ratetutor" className="modal-toggle" />
      <label className="modal modal-bottom sm:modal-middle" htmlFor="ratetutor">
        <div className="modal-box ">
          <h3 className="font-bold text-lg text-start">Rate Tutor</h3>
          <div className=" flex flex-col gap-3 ">
            <div>
              <Rating
                placeholderRating={2}
                fractions={2}
                emptySymbol={
                  <img src={GreyStar} className="icon" />
                }
                placeholderSymbol={
                  <img src={RedStar} className="icon" />
                }
                fullSymbol={
                  <img src={YellowStar} className="icon" />
                }
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
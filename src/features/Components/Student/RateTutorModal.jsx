import React,{useState} from "react";
import Rating from "react-rating";
import { FaStar } from 'react-icons/fa';
const RateTutorModal = ({ selectedCourse,RatingTutor }) => {
  const [rating, setRating] = useState(0)
  const handleRatingChange = (value) => {
    setRating(value)
  };
  const rateTutor=()=>{
    RatingTutor(selectedCourse,rating)
  }
  return (
    <>
      <input type="checkbox" id="ratetutor" className="modal-toggle" />
      <label className="modal" htmlFor="ratetutor">
        <div className="modal-box max-w-sm">
          <h3 className="font-bold text-xl text-center">Rate Tutor</h3>
          <div className=" flex  gap-8 my-4 container mx-auto items-center justify-center">
          <p className="text-base text-start font-semibold">
            {selectedCourse.coursename}
          </p>
              <Rating
                initialRating={0}
                fractions={2}
                emptySymbol={<FaStar size={24} color="#ddd" />}
                fullSymbol={<FaStar size={24} color="#ffc107 " />}
                onChange={handleRatingChange}
              />
          </div>
          <div className="w-full flex justify-center items-center">
          <label htmlFor="ratetutor" className="btn btn-accent mb-2 btn-wide" onClick={rateTutor}>Rate Tutor</label>
          </div>
        </div>
      </label>
    </>
  );
};

export default RateTutorModal;

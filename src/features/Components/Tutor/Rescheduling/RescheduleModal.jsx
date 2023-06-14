import React, { useState, useEffect } from "react";

const RescheduleModal = ({
  selected,
  setIsReschedule,
  setIsPreschedule,
  startDate,
}) => {
  const [isGreater, setIsGreater] = useState(false);
  const [isCurrentGreater, setIsCurrentGreater] = useState(false);

  const checkingDateDiff = () => {
    let current = new Date();
    var greater = isEndDateTwoDaysAhead(current, startDate);
    setIsGreater(greater);
    console.log('is Greater for pre ',greater);
  };
  function isEndDateTwoDaysAhead(startDate, endDate) {
    // Calculate the time difference in milliseconds
    const timeDiff = endDate.getTime() - startDate.getTime();
    // Calculate the number of milliseconds in two days
    const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
    const oneDayInMillis = 1000 * 60 * 60 * 24;
    // Compare the time difference with twoDaysInMillis
    console.log('timeDiff', timeDiff)
    console.log('oneDayInMillins', oneDayInMillis)
    return timeDiff >= oneDayInMillis;
  }

  const checkingDateDiffRe = () => {
    let current = new Date();
    let isCurrentGreater = isCurrentDateGreaterThanStartDate(current, startDate);
    setIsCurrentGreater(isCurrentGreater);
    console.log('current', current)
    console.log('startDate', startDate)
    console.log('for reee', isCurrentGreater);
  };
  
  function isCurrentDateGreaterThanStartDate(currentDate, startDate) {
    // Calculate the time difference in milliseconds
    const timeDiff = currentDate.getTime() - startDate.getTime();
    // Compare the time difference with zero
    return timeDiff > 0;
  }
  useEffect(() => {
    checkingDateDiff();
    checkingDateDiffRe()
  }, [selected]);

  // 6/12
  // 6/8
  return (
    <div>
      <input type="checkbox" id="rescheduleModal" className="modal-toggle" />
      <label htmlFor="rescheduleModal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="font-bold text-lg mb-6">Choose Either One</h3>
          <div className="space-y-6 mx-auto flex flex-col modal-action">
            <label
              className={`btn btn-outline btn-outline-accent hover:btn-accent text-accent hover:text-white ${
                !isCurrentGreater && "btn-disabled"
              }`}
              htmlFor="rescheduleModal"
              onClick={() => setIsReschedule(true)}
            >
              Reschedule
            </label>
            <label
              className={`btn btn-outline btn-outline-accent hover:btn-accent text-accent hover:text-white ${
                !isGreater && "btn-disabled"
              }`}
              htmlFor="rescheduleModal"
              onClick={() => setIsPreschedule(true)}
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

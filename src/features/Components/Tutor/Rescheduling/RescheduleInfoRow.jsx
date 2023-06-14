import React from "react";

const RescheduleInfoRow = ({ item, setSelectedSlot ,selectedSlot}) => {
  return (
    <div
      className={`py-1 px-2 rounded-md bg-primary ${selectedSlot.slot===item.slot && 'bg-secondary text-white'} text-accent hover:text-white hover:bg-accent`}
      onClick={() => setSelectedSlot(item)}
    >
      <p>{item.slot}</p>
    </div>
  );
};

export default RescheduleInfoRow;

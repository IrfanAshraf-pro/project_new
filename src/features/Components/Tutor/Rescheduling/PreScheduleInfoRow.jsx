import React from "react";

const PreRescheduleInfoRow = ({ item, setSelectedSlot ,selectedSlot}) => {
  console.log('sadsdsafas',item);
  return (
    <div
      className={`py-1 px-2 flex justify-between rounded-md bg-primary ${selectedSlot.slot===item.slot && 'bg-secondary text-white'} text-accent hover:text-white hover:bg-accent`}
      onClick={() => setSelectedSlot(item)}
    >
      <p>{item.slot}</p>
      <p>{item.classDate}</p>
    </div>
  );
};

export default PreRescheduleInfoRow;

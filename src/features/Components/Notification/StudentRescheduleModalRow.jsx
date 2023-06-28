import React from "react";

const StudentRescheduleModalRow = ({ item, settingSlot, selectedSlot }) => {
  return (
    <div
      className={`py-1 px-2 rounded-md bg-primary ${
        selectedSlot.slot === item.slot && "bg-secondary text-white"
      } text-accent hover:text-white hover:bg-accent`}
      onClick={() => settingSlot(item)}
    >
      <p>{item.slot}</p>
    </div>
  );
};

export default StudentRescheduleModalRow;

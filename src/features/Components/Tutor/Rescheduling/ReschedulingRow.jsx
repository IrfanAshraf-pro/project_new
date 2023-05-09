import React from "react";

const ReschedulingRow = ({ item,setSelected }) => {
  return (
    <label htmlFor="rescheduleModal" className="group" onClick={()=>setSelected(item)}>
      <div className="bg-base-100 w-full p-2 rounded-md flex justify-between md:gap-2 text-secondary group-hover:bg-accent group-hover:text-primary">
        <span className="flex-1">{item.name}</span>
        <span className="mr-12 text-start">{item.coursename}</span>
        <span>{item.slot}</span>
      </div>
    </label>
  );
};

export default ReschedulingRow;

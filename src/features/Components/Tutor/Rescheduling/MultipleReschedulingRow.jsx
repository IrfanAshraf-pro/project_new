import React from "react";

const MultipleReschedulingRow = ({ setSelected, item, selected }) => {
  const onClick = () => {
    setSelected(item);
  };
  return (
    <div className="group">
      <div
      onClick={onClick}
      className={`bg-base-100 w-full p-2 rounded-md flex justify-between md:gap-2 text-secondary group-hover:bg-accent group-hover:text-primary text-xs sm:text-base cursor-pointer ${
        selected.classDate == item.classDate ? "bg-accent" : "bg-base-100 "
      }`}
    >
      <span className="w-[85px]">{item.name}</span>
      <span className="w-5 text-start mr-2">{item.coursename}</span>
      <span className="text-start">{item.classDate}</span>
      <span className=" text-end flex-1">{item.slot}</span>
    </div>
    </div>
  );
};

export default MultipleReschedulingRow;

import React from "react";

const TodaysClassesrow = ({ classes, takeClass }) => {
  const onTake = () => {
    takeClass(classes);
  };
  return (
    <div className="group">
      <div className="bg-base-100 p-2 rounded-md flex flex-col md:flex-row md:gap-2 text-secondary group-hover:bg-accent group-hover:text-primary">
        <div className="flex items-center mb-2 justify-between  md:flex-1">
          <p className="flex-1">{classes.coursename}</p>
          <p className="flex-1">{classes.name}</p>
          <p className="flex-1">{classes.slot}</p>
        </div>
        <div className="flex  pb-2  mt-2">
          <button
            className="btn btn-accent mx-auto w-full md:btn-md group-hover:bg-primary group-hover:text-accent cursor-pointer group-hover:hover:bg-secondary group-hover:hover:text-primary"
            onClick={onTake}
          >
            Take
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodaysClassesrow;

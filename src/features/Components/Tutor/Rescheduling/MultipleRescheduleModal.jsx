import React from "react";

const MultipleRescheduleModal = ({
  isMultiple,
  setIsMultiple,
  classes,
  RescheduleClass,
}) => {
  const onClick = (classs) => {
    RescheduleClass(classs);
  };
  return (
    <>
      <input
        checked={isMultiple | false}
        onChange={setIsMultiple}
        type="checkbox"
        id="multipleRescheduleModal"
        className="modal-toggle"
      />
      <label htmlFor="multipleRescheduleModal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-semibold ml-1 md:ml-3 text-center">Please Select Class for course <span>{classes[0]?.coursename}</span> and<br/> Student <span>{classes[0]?.name}</span></h3>
          <div className="flex flex-col gap-3 p-3 px-4 rounded-md mt-2 shadow-xl shadow-primary w-full md:max-w-lg ">
            {classes.length > 0 ? (
              classes?.map((classs,index) => (
                <label
                  htmlFor="multipleRescheduleModal"
                  className="group"
                  onClick={() => onClick(classs)}
                  key={index}
                >
                  <div className="bg-neutral w-full p-2 rounded-md flex justify-between md:gap-2 text-secondary group-hover:bg-accent group-hover:text-primary text-xs sm:text-base cursor-pointer">
                    <span className="text-start">{classs.classDate}</span>
                    <span className=" text-end flex-1">{classs.slot}</span>
                  </div>
                </label>
              ))
            ) : (
              <p className="font-bold text-lg">No Free Slot</p>
            )}
          </div>
        </label>
      </label>
    </>
  );
};

export default MultipleRescheduleModal;

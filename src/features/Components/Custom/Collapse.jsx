import React, { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
const Collapse = ({ name, coursename, noOfLectures, totalFee, report }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("report is ", report);
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="w-full bg-indigo-500 rounded-md">
        <div
          className="flex justify-between  p-2  items-center text-white"
          onClick={toggleCollapse}
        >
          <span>{name}</span>
          <span>{coursename}</span>
          <span>{noOfLectures}</span>
          <span>{totalFee}</span>
          {isOpen ? (
            <AiOutlineArrowUp size={16} />
          ) : (
            <AiOutlineArrowDown size={16} />
          )}
        </div>
        <div className="bg-white w-full">
          {isOpen && (
            <>
              <div className="bg-white text-secondary overflow-hidden flex flex-col h-full w-full mx-auto ">
                <div className="h-52 overflow-y-scroll flex flex-col gap-3 p-3 px-4 rounded-md shadow-xl shadow-primary bg-neutral">
                  {report.reportList.map((item) => (
                    <div
                      className={`flex justify-between gap-2 p-2 rounded-md bg-base-300  text-primary ${
                        item.classesstatus === 1
                          ? "bg-indigo-500"
                          : item.classesstatus === 3
                          ? "bg-green-600"
                          : item.classesstatus === 5
                          ? "bg-teal-600"
                          : item.classesstatus === 0
                          ? "bg-red-400"
                          : "bg-slate-500"
                      }`}
                      key={item.classdate}
                    >
                      <span className="w-4/12">
                        {item.classesstatus === 1
                          ? "Held"
                          : item.classesstatus === 3
                          ? "PreSchedule"
                          : item.classesstatus === 5
                          ? "Reschedule"
                          : item.classesstatus === 0
                          ? "Cancelled"
                          : "Reschedule Student"}
                      </span>
                      <span>{item.classdate}</span>
                      <span className="w-5/12">{item.classslot}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Collapse;

{
  /* <>
              <div className="collapse-content bg-white text-secondary overflow-hidden flex flex-col h-full w-full mx-auto ">
                <div className="h-52 overflow-y-scroll flex flex-col gap-3 p-3 px-4 rounded-md shadow-xl shadow-primary bg-neutral">
                  {report.reportList.map((item) => (
                    <div
                      className={`flex justify-between gap-2 p-2 rounded-md bg-base-300  text-primary ${
                        item.classesstatus === 1
                          ? "bg-indigo-500"
                          : item.classesstatus === 3
                          ? "bg-green-600"
                          : item.classesstatus === 5
                          ? "bg-teal-600"
                          : "bg-red-400"
                      }`}
                      key={item.classdate}
                    >
                      <span className="w-4/12">
                        {item.classesstatus === 1
                          ? "Held"
                          : item.classesstatus === 3
                          ? "PreSchedule"
                          : item.classesstatus === 5
                          ? "Reschedule"
                          : "Reschedule Student"}
                      </span>
                      <span>{item.classdate}</span>
                      <span className="w-5/12">{item.classslot}</span>
                    </div>
                  ))}
                </div>
              </div>
            </> */
}

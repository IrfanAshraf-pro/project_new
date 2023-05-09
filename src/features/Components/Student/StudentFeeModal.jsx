import React,{useState} from "react";
import { useEffect } from "react";

const StudentFeeModal = ({selectedTutor}) => {

  return (
    <>
      <input type="checkbox" id="studentfeemodal" className="modal-toggle" />
      <label
        htmlFor="studentfeemodal"
        className="modal modal-bottom sm:modal-middle cursor-pointer"
      >
        <label className="modal-box  relative" htmlFor="">
          <h3 className="font-bold text-lg mb-4">
            Fee Details of {selectedTutor.email}
          </h3>
          <div className="mb-8">
             {selectedTutor.reportList?.length>0?
              (
                <div
                tabIndex={0}
                className="collapse collapse-arrow bg-accent text-white mt-1  rounded-box"
              >
                <div className="collapse-title text-base font-medium">
                  <div className="flex justify-between">
                    <span>{selectedTutor.tutoremail}</span>
                    <span>{selectedTutor.totalFee}</span>
                  </div>
                </div>
                <div className="collapse-content bg-primary text-secondary">
                  {selectedTutor.reportList?.map((item) => (
                    <div className="flex justify-between p-2 rounded-md bg-base-300 mt-2" key={item.classslot}>
                      <span>{item.classesstatus}</span>
                      <span>{item.classdate}</span>
                      <span>{item.classslot}</span>
                    </div>
                  ))}
                </div>
              </div>
              ):<p>No Classes taken</p>
             }
          </div>
        </label>
      </label>
    </>
  );
};

export default StudentFeeModal;

import React from "react";
const ChildDetails = ({ childSelected,details }) => {
  // const [details, setDetails] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
console.log(details);
  return (
    <>
      <input type="checkbox" id="childDetails" className="modal-toggle" />
      <label htmlFor="childDetails" className="modal modal-bottom sm:modal-middle cursor-pointer">
        <label className="modal-box  relative" htmlFor="">
          <h3 className="font-bold text-lg mb-4">
            Fee Details of {childSelected.email}
          </h3>
          <div className="">
              {
                details.length>0 ? (details.map((report) => (
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow bg-accent text-white mt-1  rounded-box"
                  >
                    <div className="collapse-title text-base font-medium">
                      <div className="flex justify-between">
                        <span>{report.tutoremail}</span>
                        <span>{report.courseid}</span>
                        <span>{report.totalFee}</span>
  
                      </div>
                    </div>
                    <div className="collapse-content bg-primary text-secondary">
                      {report.reportList.map((item) => (
                        <div className="flex justify-between gap-2 p-2 rounded-md bg-base-300 mt-2" key={item.classslot}>
                          <span className="mr-2">{item.classesstatus}</span>
                          <span>{item.classdate}</span>
                          <span>{item.classslot}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))):<p>No detials at the moment</p>
              }
          </div>
        </label>
      </label>
    </>
  );
};

export default ChildDetails;

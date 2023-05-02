import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { StudentNotEnrolled } from "../../../Utils/MatchTypes";
const ChildDetails = ({ childSelected }) => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const feerepo = RepositoryFactory.get("fee");
  const getDetails = async () => {
    console.log('inside details');
    setIsLoading(true);
    let { data } = await feerepo.GetStudentFeeDetails(childSelected.email);
    if (typeof data === "object") {
      setDetails(data);
    } else if (data.match(StudentNotEnrolled)) {
      toast.info(data, {
        theme: "colored",
      });
    } else {
      console.log(data);
    }
    console.log("details are ", data);
    setIsLoading(false);
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <input type="checkbox" id="childDetails" className="modal-toggle" />
      <label htmlFor="childDetails" className="modal modal-bottom sm:modal-middle cursor-pointer">
        <label className="modal-box  relative" htmlFor="">
          <h3 className="font-bold text-lg mb-4">
            Fee Details of {childSelected.email}
          </h3>
           <div>{isLoading && 'Loading ....'}</div>
          <div className="">
                {
              details.map((report) => (
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
                      <div className="flex justify-between p-2 rounded-md bg-base-300 mt-2">
                        <span>{item.classesstatus}</span>
                        <span>{item.classdate}</span>
                        <span>{item.classslot}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </label>
      </label>
    </>
  );
};

export default ChildDetails;

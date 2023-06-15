import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChildDetails from "../../../Components/Parent/Fee/ChildDetails";
import ParentFeeRow from "../../../Components/Parent/Fee/ParentFeeRow";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { StudentNotEnrolled } from "../../../Utils/MatchTypes";
import { toast } from "react-toastify";
import { setPageTitle } from "../../../../app/Slices/Dashboard/HeaderSlice";

const ParentsFee = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [childrens, setChildrens] = useState(user);
  const [childSelected, setChildSelected] = useState({});
  const [details, setDetails] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [isFeePaid,setIsFeepaid]=useState(false)
  const [selected, setSelected] = useState({});
  const feerepo = RepositoryFactory.get("fee");
  const getDetails = async (email) => {
    setIsFeepaid(false)
    setChildSelected({})
    setDetails([])
    setSelected({})
    console.log("inside details");
    let { data } = await feerepo.getFeeDetailsForParent(email);
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
  };
  useEffect(() => {
    dispatch(setPageTitle({ title: "Fee Details" }));
    getDetails();
  }, []);

useEffect(() => {
    isFeePaid && getDetails();
  }, [isFeePaid]);
  const searchChild = (child) => {
    getDetails(child.email);
    setChildSelected(child);
  };
  return (
    <>
      <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
        {childrens.length > 0 ? (
          <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral ">
            <div className="w-full max-w-2xl mx-auto">
              {childrens.map((child) => (
                <ParentFeeRow
                  child={child}
                  key={child.email}
                  searchChild={searchChild}
                  setShowDetails={setShowDetails}
                />
              ))}
            </div>
          </div>
        ) : (
          <p>Please Enlist some courses</p>
        )}
      </div>
      <ChildDetails
        childSelected={childSelected}
        details={details}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        isFeePaid={isFeePaid}
        setIsFeepaid={setIsFeepaid}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

export default ParentsFee;

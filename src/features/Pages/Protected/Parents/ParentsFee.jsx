import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChildDetails from "../../../Components/Parent/Fee/ChildDetails";
import ParentFeeRow from "../../../Components/Parent/Fee/ParentFeeRow";

const ParentsFee = () => {
  const { user } = useSelector((state) => state.auth);
  const [childrens, setChildrens] = useState(user);
  const [childSelected, setChildSelected] = useState({})
  return (
    <>
    <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
      {childrens.length > 0 ? (
        <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral ">
          <div className="w-full max-w-2xl mx-auto">
            {childrens.map((child) => (
              <ParentFeeRow child={child} key={child.email} setChildSelected={setChildSelected}/>
            ))}
          </div>
        </div>
      ) : (
        <p>Please Enlist some courses</p>
      )}
    </div>
    <ChildDetails childSelected={childSelected}/>
    </>
  );
};

export default ParentsFee;

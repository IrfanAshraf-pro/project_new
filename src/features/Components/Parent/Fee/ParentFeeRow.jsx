import React from "react";
import ProfileImg from "../../../../assests/pp.jpeg";
const ParentFeeRow = ({ child,setChildSelected }) => {
  return (
    <label
      htmlFor="childDetails"
      className="p-2 px-4 rounded-md bg-primary text-accent w-full flex justify-between items-center hover:bg-accent hover:text-white"
      onClick={()=>setChildSelected(child)}
    >
      <div className="rounded-full">
        <img
          src={ProfileImg}
          alt="Proifle Img"
          className="w-14 h-14 rounded-full"
        />
      </div>
      <p className="text-base md:text-lg">{child.email}</p>
    </label>
  );
};

export default ParentFeeRow;

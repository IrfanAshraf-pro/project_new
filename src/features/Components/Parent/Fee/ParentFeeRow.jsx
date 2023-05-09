import React from "react";
import ProfileImg from "../../../../assests/pp.jpeg";
import Saud from "../../../../assests/saud.jpeg";

const ParentFeeRow = ({ child,searchChild }) => {
  return (
    <label
      htmlFor="childDetails"
      className="p-2 px-4 mt-2 rounded-md bg-primary text-accent w-full flex justify-between items-center hover:bg-accent hover:text-white"
      onClick={()=>searchChild(child)}
    >
      <div className="rounded-full">
        <img
          src={"https://source.unsplash.com/random/?person"}
          alt="Proifle Img"
          className="w-14 h-14 rounded-full"
        />
      </div>
      <p className="text-base md:text-lg">{child.email}</p>
    </label>
  );
};

export default ParentFeeRow;

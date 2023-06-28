import React, { useState } from "react";

const ScheduleCheckBox = ({
  item,
  Objkey = 0,
  setRow,
  isAll = false,
  setAllValues = null,
}) => {
  const [value, setvalue] = useState(+item);
  const onChange = (e) => {
    if (value > 1) {
      return;
    } else {
      let val = value === 1 ? 0 : 1;
      console.log(
        `currently checkbox val is ${val} and prev was ${item} and type of item is ${typeof +item}`
      );
      setvalue(val);
      sendingChanges(val);
    }
  };
  const sendingChanges = (val) => {
    isAll ? setAllValues(val) : setRow(val, Objkey);
  };
  return (
    <>
      <input
        id={Objkey}
        value={value}
        onChange={onChange}
        defaultChecked={value !== 0 && "checked"}
        type="checkbox"
        disabled={value > 1 ? true : false}
        className={`w-4 h-4 cursor-pointer ${
          value === 1
            ? "text-green-700 "
            : value === 2
            ? "text-gray-900 opacity-70 cursor-default"
            : value === 3
            ? "text-blue-700 opacity-70 cursor-default"
            : value === 9
            ? "text-error opacity-70 cursor-default"
            : "text-red-700 opacity-70 cursor-default"
        } border-0 rounded focus:ring-0 `}
      />
    </>
  );
};

export default ScheduleCheckBox;

import React, { useState, useEffect } from "react";
import ScheduleCheckBox from "./ScheduleCheckBox";

const ScheduleRow = ({ schedule, handleScheduleUpdate }) => {
  const [srow, setSrow] = useState(schedule);
  const [all, setAll] = useState("0");
  const setAllValues = (value) => {
    let row = srow;
    let ssrow = row.schedule;
    for (let item of Object.keys(ssrow)) {
      ssrow[item] = value.toString();
    }
    setAll(all === "0" ? "1" : "0");
    setSrow({ ...srow, schedule: ssrow });
    // console.log('setting full row',ssrow);
  };
  const setRow = (value, key) => {
    let row = srow;
    let ssrow = row.schedule;
    for (let item of Object.keys(ssrow)) {
      if (item === key) {
        ssrow[item] = value.toString();
      }
    }
    setSrow({ ...srow, schedule: ssrow });
    // console.log('setting single item is ',ssrow);
  };
  const setSchedule = (schedulee) => {
    handleScheduleUpdate(schedulee);
  };
  useEffect(() => {
    setSchedule(srow)
    console.log('inside useEffect of row srow or each row');
  }, [srow]);


  const iteratingOverRow = () => {
    const arr = [];
    for (const key in srow.schedule) {
      arr.push(
        <ScheduleCheckBox
          item={srow.schedule[key]}
          Objkey={key}
          setRow={setRow}
          key={key}
        />
      );
    }
    return arr.map((item) => item);
  };
  return (
    <div className="flex items-start justify-between w-full py-1 lg:pr-2">
      {iteratingOverRow()}
      
      <ScheduleCheckBox
        item={all}
        setRow={setRow}
        isAll={true}
        setAllValues={setAllValues}
      />
    </div>
  );
};

export default ScheduleRow;

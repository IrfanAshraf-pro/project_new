import React, { useState } from "react";
import DatePicker from "react-datepicker";
const RescheduleInfoModal = ({ isReschedule, setIsReschedule }) => {
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(0);
  const searchClasses=()=>{

  }
  //    get both classes from db tutors and student's then populate them in options on button click
  const options = [
    {
      time: "08:00-9:00 AM",
      value: 1,
    },
    {
      time: "09:00-10:00 AM",
      value: 2,
    },
    {
      time: "10:00-11:00 AM",
      value: 3,
    },
    {
      time: "11:00-12:00 AM",
      value: 4,
    },
    {
      time: "12:00-01:00 PM",
      value: 5,
    },
    {
      time: "01:00-02:00 PM",
      value: 6,
    },
    {
      time: "02:00-03:00 PM",
      value: 7,
    },
    {
      time: "03:00-04:00 PM",
      value: 8,
    },
    {
      time: "04:00-05:00 PM",
      value: 9,
    },
    {
      time: "05:00-06:00 PM",
      value: 10,
    },
    {
      time: "06:00-07:00 PM",
      value: 11,
    },
    {
      time: "07:00-08:00 PM",
      value: 12,
    },
    {
      time: "08:00-09:00 PM",
      value: 13,
    },
    {
      time: "09:00-10:00 PM",
      value: 14,
    },
    {
      time: "10:00-11:00 PM",
      value: 15,
    },
    {
      time: "11:00-12:00 PM",
      value: 16,
    },
  ];

  const handleChange = (event) => {
    setSelectedSlot(event.target.value);
  };
  const rescheduleClass = () => {
    const dateJoined =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    const day = getDayCustom(date.getDay());
    if (selectedSlot > 0) {
      console.log(
        `date is ${dateJoined} and day is ${day} and slot is ${selectedSlot}`
      );
    } else {
      console.log("select a slot");
    }
  };
  const getDayCustom = (day) => {
    switch (day) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
    }
  };
  return (
    <div>
      <input
        checked={isReschedule | false}
        onChange={setIsReschedule}
        type="checkbox"
        id="rescheduleinfomodal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box  w-full px-8 ">
          <h3 className="font-bold text-lg">Reschedule</h3>
          <p className="py-1">Select date</p>
          <div className="mt-1 w-full max-w-lg flex flex-col md:flex-row gap-2 ">
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="mx-auto w-56 text-white bg-accent"
            />
            <button
              className="btn btn-outline btn-outline-accent hover:btn-accent text-accent hover:text-white"
              onClick={searchClasses}
            >
              Search Classes
            </button>
          </div>
          <div className="my-4 w-full max-w-lg">
            <select
              className="select-accent rounded-md w-full"
              value={selectedSlot}
              onChange={handleChange}
            >
              <option disabled selected value={0}>
                Select a slot to Reschedule
              </option>
              {options.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.time}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2 flex items-center justify-end mb-16 md:mb-2">
            <label
            htmlFor="rescheduleinfomodal"
              className="btn btn-accent hover:btn-primary text-white hover:text-accent"
              onClick={rescheduleClass}
            >
              Reschedule
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduleInfoModal;

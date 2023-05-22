import React,{useState} from 'react'
import DatePicker from "react-datepicker";

const MultipleScheduling = () => {
  const [startDate, setStartDate] = useState(new Date());

  const onClick=()=>{}
  return (
    <div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="mt-12 space-x-4 flex items-center justify-center flex-col gap-4">
         <div className="flex flex-col md:flex-row gap-3">
         <div className="">
         <p className='text-left text-lg font-semibold text-secondary'>Start Date:</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="mx-auto  w-80 md:w-64 text-white bg-accent "
          />
         </div>
          <div className="">
          <p className='text-left text-lg font-semibold  text-secondary'>End Date:</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="mx-auto w-80 md:w-64 text-white bg-accent"
          />
          </div>
         </div>
          <button
            className="btn btn-primary w-full  hover:btn-accent text-accent hover:text-white"
            onClick={onClick}
          >
            Search Classes
          </button>
        </div>
        {/* {classes.length > 0 && (
          <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral w-full md:max-w-lg">
            {classes.map((classitem) => (
              <ReschedulingRow
                item={classitem}
                key={classitem.slotno}
                setSelected={setSelected}
              />
            ))} */}
          {/* </div> */}
        {/* )} */}
      </div>
    </div>
  )
}

export default MultipleScheduling
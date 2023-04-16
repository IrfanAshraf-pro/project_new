import React from 'react'

const TodaysClassesrow = ({classes}) => {

  return (
    <div className="group">
      <div className='bg-base-100 p-2 rounded-md flex flex-col md:flex-row md:gap-2 text-secondary group-hover:bg-accent group-hover:text-primary'>
      <div className='flex items-center mb-2 justify-between  md:flex-1'>
        <p>{classes.coursename}</p>
        <p>{classes.name}</p>
        <p>{classes.slot}</p>
      </div>
      <div className="flex justify-between pb-2 md:w-4/12">
        
        <button
          className="btn btn-accent group-hover:bg-primary group-hover:text-accent cursor-pointer group-hover:hover:bg-secondary group-hover:hover:text-primary w-5/12 md:w-6/12 md:ml-1 mt-2 group btn-sm md:btn-md"
        >
          Cancel
        </button>
      </div>
    </div>
    </div>
  )
}

export default TodaysClassesrow
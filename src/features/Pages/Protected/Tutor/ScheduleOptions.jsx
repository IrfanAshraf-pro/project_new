import React from 'react'
import { Link } from 'react-router-dom'

const ScheduleOptions = () => {
  return (
    <div className='container mx-auto flex items-center justify-center flex-col mt-10 p-2 '>
        <h1 className='text-2xl md:text-4xl font-bold text-accent'>Choose Rescheduling Mode</h1>
        <div className='flex items-center flex-col justify-between gap-4 mt-4 bg-accent/20 py-6 px-3 rounded-lg shadow-md w-full max-w-md'>
            <Link to="tutorscheduling" className='btn btn-primary hover:btn-accent text-accent hover:text-white'>Single Rescheduling</Link>
            <Link to="tutormultirescheduling" className='btn btn-primary hover:btn-accent text-accent hover:text-white'>Multiple Rescheduling</Link>
        </div>
    </div>
  )
}

export default ScheduleOptions
import React from 'react'

const Loader = () => {

  return (
    <div className='w-full h-full fixed z-50 bg-slate-700 bg-opacity-40 flex items-center justify-center'>
        <div  className="h-60 w-52 loader"></div>
    </div>
  )
}

export default Loader
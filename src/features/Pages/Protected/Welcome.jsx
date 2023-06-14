import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from 'react-router-dom'
import { setPageTitle } from '../../../app/Slices/Dashboard/HeaderSlice'

const Welcome = () => {
  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Welcome"}))
      }, [])
  return (
    <div className='flex items-center w-full '>
        <div className='w-[80%] mx-auto'>
          <div className='text-center mt-16'>
            <p className='text-3xl  text-accent '>Welcome To </p>
            <p className='text-5xl mt-4 font-bold text-accent'>House of Tutor</p>
          </div>
        </div>
    </div>
  )
}

export default Welcome
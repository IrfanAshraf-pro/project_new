import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../app/Slices/Dashboard/HeaderSlice'

const Welcome = () => {
  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Welcome"}))
      }, [])
  return (
    <div className='flex  w-full h-full'>
        <div className='w-full h-screen bg-accent'>
          Welcome
        </div>
    </div>
  )
}

export default Welcome
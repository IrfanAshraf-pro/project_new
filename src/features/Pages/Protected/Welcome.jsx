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
    <div className='flex  w-full '>
        <div className='w-full bg-accent'>
          Welcome
        </div>
    </div>
  )
}

export default Welcome
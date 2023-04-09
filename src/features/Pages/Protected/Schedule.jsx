import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../app/Slices/Dashboard/HeaderSlice'
const Schedule = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Schedule"}))
      }, [])
  return (
    <div>Schedule</div>
  )
}

export default Schedule
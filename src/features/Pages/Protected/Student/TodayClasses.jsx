import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../../app/Slices/Dashboard/HeaderSlice'
const TodayClasses = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Schedule"}))
      }, [])
  return (
    <div>TodayClasses</div>
  )
}

export default TodayClasses
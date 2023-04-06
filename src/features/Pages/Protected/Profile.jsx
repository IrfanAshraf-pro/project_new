import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../app/Slices/Dashboard/HeaderSlice'
const Profile = () => {
  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Profile"}))
      }, [])
  return (
    <div>Profile</div>
  )
}

export default Profile
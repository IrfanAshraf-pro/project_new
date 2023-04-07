import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setPageTitle } from '../../../app/Slices/Dashboard/HeaderSlice'
const Profile = () => {
  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Profile"}))
      }, [])
      const toastmaker=()=>{
        toast.success('Yohoo done',{
          theme:'colored'
        })
      }
  return (
    <div>
      <button onClick={toastmaker} className="btn btn-outline btn-accent">Make Toast</button>
    </div>
  )
}

export default Profile
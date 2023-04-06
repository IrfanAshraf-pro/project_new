import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../app/Slices/Dashboard/HeaderSlice'


function Dashboard(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Dashboard"}))
      }, [])


    return(
        <div className='text-3xl'>
            Dashboard
        </div>
    )
}

export default Dashboard
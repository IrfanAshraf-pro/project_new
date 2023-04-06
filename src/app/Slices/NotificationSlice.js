import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    modal:false,
    notifications:[]
}

const notificationSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        setModal:(state)=>{
            state.modal=!state.modal
        },
        setNotifications:(state,action)=>{
            state.notifications=action.payload.notifications
        }
    }
})

export default notificationSlice.reducer
export const {setModal,setNotifications}=notificationSlice.actions
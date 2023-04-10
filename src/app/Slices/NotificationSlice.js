import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isTutor:false,
    notifications:[],
    notificationlength:0
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
            state.notificationlength=action.payload.notifications.length
        },
        setIsTutor:(state)=>{
            state.isTutor=false
        },
        setTutor:(state)=>{
            state.isTutor=true
        }
    }
})

export default notificationSlice.reducer
export const {setModal,setNotifications,setIsTutor,setTutor}=notificationSlice.actions
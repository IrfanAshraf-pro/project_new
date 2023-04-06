import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isOpen:false
}

const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        openDrawer:(state)=>{
            state.isOpen=true
        },
        closeDrawer:(state)=>{
            state.isOpen=false
        }
    }
})

export default drawerSlice.reducer
export const {openDrawer,closeDrawer}=drawerSlice.actions
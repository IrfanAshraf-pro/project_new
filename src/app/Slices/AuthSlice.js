import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    role:'Student',
    user:{}
}

const AuthSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        setRole:(state,action)=>{
            state.role=action.payload.item
        },
        setUser:(state,action)=>{
            state.user=action.payload.user
        }
    }
})

export default AuthSlice.reducer
export const {setRole,setUser}=AuthSlice.actions
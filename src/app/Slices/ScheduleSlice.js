import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schedule:
    "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  isScheduleUpdated:false
};

const ScheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedule: (state, action) => {
      console.log('action schedule is ',action.payload.schedule);
      state.schedule = action.payload.schedule;
      console.log('after setting state is',state.schedule);
    },
    setIsScheduleUpdate:(state,action)=>{
      console.log('setting is schedule updated');
      state.isScheduleUpdated=action.payload.isScheduleUpdated
    }
  },
});

export default ScheduleSlice.reducer;
export const { setSchedule,setIsScheduleUpdate } = ScheduleSlice.actions;

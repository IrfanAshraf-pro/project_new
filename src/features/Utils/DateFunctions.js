const dateChecker = (startDate) => {
  let month = startDate.getMonth() + 1;
  let day = startDate.getDate();
  let year = startDate.getFullYear();
  if (+month < 10) {
    month = "0" + month;
  }
  if (+day < 10) {
    day = "0" + day;
  }
  const dateJoin = month + "/" + day + "/" + year;
  return dateJoin;
};
const calculateDateBetween = (startDate, endDate) => {
  let startmonth = startDate.getMonth() + 1;
  let startday = startDate.getDate();
  let startyear = startDate.getFullYear();
  //enddate data
  let endmonth = startDate.getMonth() + 1;
  let endday = startDate.getDate();
  let endyear = startDate.getFullYear();
};

const getSlotNo=(slot)=>{
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", ];
    const timeslots = [
      {
        time: "08:00 - 09:00 " ,
      },
      {
        time: "09:00 - 10:00 ",
      },
      {
        time: "10:00 - 11:00 ",
      },
      {
        time: "11:00 - 12:00 ",
      },
      {
        time: "12:00 - 13:00 ",
      },
      {
        time: "13:00 - 14:00 ",
      },
      {
        time: "14:00 - 15:00 ",
      },
      {
        time: "15:00 - 16:00 ",
      },
      {
        time: "16:00 - 17:00 ",
      },
      {
        time: "17:00 - 18:00 ",
      },
      {
        time: "18:00 - 19:00 ",
      },
      {
        time: "19:00 - 20:00 ",
      },
      {
        time: "20:00 - 21:00 ",
      },
      {
        time: "21:00 - 22:00 ",
      },
      {
        time: "22:00 - 23:00 ",
      },
      {
        time: "23:00 - 00:00 ",
      },
    ];
    let slots=[]
    timeslots.map(time=>{
        days.map(day=>{
            let slot=time.time+day
            slots.push(slot)
        })
    })
    let index = 0
    for (let i = 0; i < slots.length; i++) {
        if(slots[i].match(slot)){
            index=i
        }
        
    }
    return index
}

export { dateChecker, getSlotNo };

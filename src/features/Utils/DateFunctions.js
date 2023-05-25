const dateChecker=(startDate)=>{
    let month=startDate.getMonth()+1
    let day=startDate.getDate()
    let year=startDate.getFullYear()
    if(+month<10){
        month="0"+month
    }
    if(+day<10){
    day="0"+day
    }
    const dateJoin=month+"/"+day+"/"+year
    return dateJoin
}
const calculateDateBetween=(startDate,endDate)=>{
    let startmonth=startDate.getMonth()+1
    let startday=startDate.getDate()
    let startyear=startDate.getFullYear()
    //enddate data
    let endmonth=startDate.getMonth()+1
    let endday=startDate.getDate()
    let endyear=startDate.getFullYear()
    
}
export{
    dateChecker
}
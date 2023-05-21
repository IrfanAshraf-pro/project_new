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

export{
    dateChecker
}
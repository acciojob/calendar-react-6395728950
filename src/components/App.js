import React, {Component, useEffect, useMemo, useState} from "react";
import '../styles/App.css';

const App = () => {
  const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const daysOfWeek = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

  const[month,setMonth] = useState(0);
  const[year,setYear] = useState("2025");
  const[flag,setFlag] = useState(false);
  const[days,setDays] = useState(31);
  const[firstday,setFirstday] = useState(3);
  const[dates,setDates]= useState([]);
  console.log('what is come in month',months[month]);
 
  console.log("no of days in month",days);
  console.log("first day of month",firstday);
  console.log("what is come in dates",dates);

  // const getdaysInmonth  = (month,year)=>{
  //    const val = new Date(year,month,0).getDate();
  //    console.log("how many days would be in this month",val);
  //    setDays(val);
  // }

  // useEffect(()=>{
  //   getdaysInmonth(month,year);
  // },[month,year])
      const getdaysInmonth = useMemo(()=>{
          return new Date(year,month+1,0).getDate();
      },[year,month])
    if(getdaysInmonth!==days){
      setDays(getdaysInmonth);
    }
   
     const firstdayofmonth = useMemo(()=>{
      return new Date(year,month,1).getDay();
     },[year,month]);
     if(firstdayofmonth!==firstday){
      setFirstday(firstdayofmonth);
     }
//    const createCalendar = (firstday, days) => {
//   let currentDay = 1;
//   let newDates = [];

//   for (let i = 0; i < 5; i++) {
//     let week = [];

//     for (let j = 0; j < 7; j++) {
//       let index = i * 7 + j;

//       if (index < firstday || currentDay > days) {
//         week.push(null);
//       } else {
//         week.push(currentDay++);
//       }
//     }

//     newDates.push(week);
//   }

//   setDates(newDates); // Call once with full calendar
// };
   

 
    useEffect(()=>{
      setDates([]);
      const newDates = Array.from({length:`${days}`},(_,i)=>i+1);
      setDates(newDates);
      

    },[firstday,days])


   
   return (
    <div id="main">

      <h1>Calendar</h1>
      <select value={month} onChange={(e)=>setMonth(e.target.value)}>
        
        {
          months.map((item,index)=>(
            <option key={index} value={index}>{item}</option>
          ))
        }
      </select>
      <p onDoubleClick={()=>setFlag(true)}>{year}</p>
    {
      flag &&   <input  type="text" value={year} onChange={(e)=>setYear(e.target.value)} onKeyDown={(e)=>e.key==='Enter' && setFlag(false)} ></input>
    }

    {
      daysOfWeek.map((item,index)=>(
        <span key={index} style={{margin:'4px'}}>{item}</span>
      ))
    }
    <br/>
{
   console.log(days)
}
    {
        
          dates.map((item,index)=>(
          <p key={index}>{item}</p>
          ))   
    }
    <br/>
    <button onClick={()=>{
      if(year>1){
        setYear(parseInt(year)-1);
      }else{
        setYear("2025")
      }
    }}>prevYear</button>
    <button onClick={()=>{
     if(month>0){
      setMonth(month-1);
     }else{
      setMonth(11)
     }
    }}>prevMonth</button>
    <button onClick={()=>{
      if(month<11){
        setMonth(parseInt(month)+1);
      }else{
        setMonth(0)
      }
    }}>NextMonth</button>
    <button onClick={()=>setYear(parseInt(year)+1)}>NextYear</button>
    </div>
  )
}


export default App;

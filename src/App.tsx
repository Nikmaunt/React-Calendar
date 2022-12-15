import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker"
import "react-datepicker/src/stylesheets/datepicker.scss";
import 'react-datepicker/dist/react-datepicker';
import "./App.css";




const locales = {
  "en-Us": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
     format,parse,startOfWeek,getDay,locales
})

const events:EventsType[] = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2021, 6, 0),
        end: new Date(2021, 6, 0),
    },
    {
        title: "Vacation",
        start: new Date(2021, 6, 7),
        end: new Date(2021, 6, 10),
    },
    {
        title: "Conference",
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 23),
    },
];

type EventsType ={
    title:string
    allDay?:boolean
    start: string | Date
    end:string | Date
}

function App() {

    type NewEventsType = {
        title:string,
        allDay?:boolean,
        start: Date,
        end:  Date
    }

    const [newEvent , setNewEvent] = useState<NewEventsType>({title:'', start:new Date, end: new Date} )
    const [allEvents , setAllEvents] = useState< EventsType[]>(events)

    function handleAddEvent(){
        setAllEvents([...allEvents, newEvent])
    }

 const onChangeDateHandler = (start:Date) => {
     setNewEvent({...newEvent,start})
 }
    const onChangeEndDateHandler = (end:Date) => {
        setNewEvent({...newEvent,end})
    }
    // style={{marginRight:"10px"}}

  return (
    <div className="App">
        <h1>Calendar </h1>
        <h2>Add New Event</h2>
        <div className={'date-picker'}>
            <input type="text" placeholder={'Add title'} style={{width:'20%',marginRight:"10px"}} value={newEvent.title} onChange={(e)=>setNewEvent({...newEvent,title:e.target.value})}/>
            <DatePicker   onChange={onChangeDateHandler } placeholderText={'Start Date'}  selected={newEvent.start} />
            <DatePicker onChange={ onChangeEndDateHandler } placeholderText={'End Date'} selected={newEvent.end} />
            <button style={{marginTop:"10px"}} onClick={handleAddEvent}> Add event </button>
        </div>
        <Calendar localizer={localizer} events={allEvents} startAccessor={'start'} endAccessor={'end'} style={{height:500, margin:"50px"}}/>
    </div>
  );
}

export default App;

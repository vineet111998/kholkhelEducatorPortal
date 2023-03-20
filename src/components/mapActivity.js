import React, { useState, useEffect } from "react";
import AddActinEvent from './addActinEvent'
import getEvent from "../services/getEvent";
import AddMultiLingunal from "./addMultiLingunal";
import { Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import { Stack} from '@mui/material';
import TextField from '@mui/material/TextField';
import gradeService from "../services/gradeService";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom';
var CryptoJS = require("crypto-js");
const MapActivity = () => {
  const params=useParams();
    const [grade,setGrade]=useState(0);
    const [event,setEvent]=useState('');
    const [active, setActive] = useState("");
    const [gradeinfo, setGradeInfo] = useState([]);
    const [gameEventData, setgameEventData] = useState([]);
    const [selDate, setSelDate] = useState(null);
    const [day, setDay] = useState('');
    const [gameData,setGameData]=useState([]);
    // console.log(params);

    useEffect(() => {
        if(Object.keys(params).length >0 && gameEventData.length===0) setParamsData();
        if(gradeinfo.length===0 && Object.keys(params).length <=0){getGrade();}
        if(gameEventData.length===0 && Object.keys(params).length <=0){getGameEvent();}
      });

      async function setParamsData() {
        var ciphertext=params.cypherData;
        ciphertext = ciphertext.replace(/p1L2u3S/g, '+' ).replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');
        var bytes = CryptoJS.AES.decrypt(ciphertext, 'kholKHEL');
        var userData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        await getEvent.getInstance().getEventByID({tile_id:userData.gameData}).then((res) => {
          var result = JSON.parse(JSON.stringify(res));
          setEvent(userData.gameData);
          setgameEventData(result.data[0]);
        })
      }

      async function getGrade() {
        gradeService.getInstance().getGradeData().then((res) => {
          var result = JSON.parse(JSON.stringify(res));
          setGradeInfo(result.data);
        })
      }

      async function getGameEvent(data) {
        if(data==undefined)
        {
          await getEvent.getInstance().getEventData().then((res) => {
             var result = JSON.parse(JSON.stringify(res));
                setgameEventData(result.data);
          })
        }
        else{
        var grade={"tile_grade_id":data};
        await getEvent.getInstance().getEventByGrade(grade).then((res) => {
          var result = JSON.parse(JSON.stringify(res));
          setgameEventData(result.data);
        })
        }
      }
    const gradeChange = async(e) => {
        setGrade(e);
      }

      const eventChange = (eventId,event) => {
        setEvent(eventId);
        setgameEventData(event)
        
        setActive('cal');
      }
       const dateChange = async (e) => {
        // alert("hello world!");
        var start_date=new Date(gameEventData.tile_start_date);
        var end_date=new Date(gameEventData.tile_end_date);
        var selectedDate = new Date(e);
        // console.log(selectedDate.getDate());
        // console.log(start_date.getDate());
        // console.log(end_date.getDate());
        var d1=selectedDate.getTime() -start_date.getTime();
        var d2= end_date.getTime()-start_date.getTime();
        // console.log(d1);
        // console.log(d2);
        // if( (selectedDate.getMonth()==start_date.getMonth() && selectedDate.getDate()>=start_date.getDate()) && (selectedDate.getMonth()==end_date.getMonth() && selectedDate.getDate()<=end_date.getDate()))
        if(d1>=0 && d1<=d2)
        {
          setSelDate(selectedDate);
          const diffTime = Math.abs(selectedDate - start_date);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))-1; 
          // console.log(diffDays + " days");
          setDay(diffDays)
          setGameData(gameEventData.tile_gameData[diffDays].multiGameData);
        }
        else{
          alert("Date must be between: "+start_date+" - "+end_date)
          setDay('');
          setSelDate(null);
        }
      }
      const changeHandler=(selectedLang,gameData) =>
      {
        gameEventData.tile_gameData[day].multiGameData[selectedLang][1] = gameData;
         setGameEvent(event,gameEventData.tile_gameData)
      }
      async function setGameEvent(eventid, data) {
        console.log(eventid, data);
        var update=[{tile_id:eventid},{$set:{tile_gameData:data}}];
        await getEvent.getInstance().setEventByID(update).then((res) => {
          var result = JSON.parse(JSON.stringify(res));
          alert(result.message);
          window.location.reload(true);
        })
      }
  
  return (
    <>
      <div className="artifactouterdiv">

    {
      (active ==="" && Object.keys(params).length >0 )&&
      <div style={{ textAlign: "center" }}>
      <h1>Grade</h1>
      <TextField   disabled value={gameEventData.tile_grade_id} style={{width:"40%", margin:"0 6%"}}/>
      <h1>Event</h1>
      <TextField   disabled value={gameEventData.tile_desc} style={{width:"40%", margin:"0 6%"}}/>
      </div>
      
    }
    {
        (active === "" &&  Object.keys(params).length <=0 ) &&
        <div style={{ textAlign: "center" }}>
          {/* <h1>Select Grade</h1> */}
          <FormControl sx={{ m: 4, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Select Grade</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={grade}
              onChange={(e)=>{e.preventDefault(); gradeChange(e.target.value)}}
              autoWidth
              label="Select Grade"
            >
              <MenuItem key={0} value={0}>{"All"}</MenuItem>
              {gradeinfo.map(data => (
                <MenuItem key={data.grade_id} value={data.grade_id} >
                  {data.grade_code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      }
      {
        (grade>=0 && active=="" &&  Object.keys(params).length <=0 ) &&
        <AddActinEvent onChange={eventChange} grade={grade}/>
      }
      {
        (active === "cal" || (Object.keys(params).length >0 && active !="lang")) &&
        <div>
          <Stack style={{flexDirection:"row" ,justifyContent:"space-around"}}>
          <Stack >
        <h2>Select Date:</h2>
         <LocalizationProvider dateAdapter={AdapterDateFns} >
         <Stack >
            <DatePicker
                clearable
                value={selDate}
                onChange={async (newValue) => {dateChange(newValue)}}
                renderInput={(params) => (
                  <TextField {...params} helperText="" style={{width:"118%"}}/>

                )}
              />
                </Stack>
            
          </LocalizationProvider>
          </Stack>
          <Stack>
          <h2>Day Number:</h2>
          <TextField   disabled value={day} style={{width:"40%", margin:"0 6%"}}/>
          </Stack>
          </Stack>
          <Button variant="contained" onClick={ ()=>{setActive('lang');}}>
            Next</Button>
          {/* <Button style={{width: "8%",padding: "1% 0",border: "2px solid rgb(25 118 210)",borderRadius: "10px",margin: "5% auto 0 15%"}}
          onClick={ ()=>{setActive('lang');console.log(gameEventData)}}>
            Next</Button> */}
      </div>
      }
      {
        (active === "lang" ) &&
        <AddMultiLingunal day={day} onChange={changeHandler} gameData={gameData}/>
      }
      </div>
    </>
  )
}

export default MapActivity;
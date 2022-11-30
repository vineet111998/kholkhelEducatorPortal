import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ShowEventData from './ShowEventData';
const ShowEvent = (props) => {
  const [value, setValue] = React.useState(-1);
  const [gameType, setGameType] = React.useState([]);
  const [active, setActive] = React.useState("add");
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const convert=(str)=> {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
 
  React.useEffect(()=>{
    if(gameType.length === 0){
    for(let i=0;i<props.value.tile_gameData.length;i++) {
      setValue(0);
      var date=  convert(props.value.tile_gameData[i].forDate)
      gameType.push({forDate: date,multiGameData: props.value.tile_gameData[i].multiGameData})
    }
  }
  });
  const changeHandler=(e)=>{
    setActive(e);
  }

  return (
      <>
      <div className="artifactouterdiv">
      {
        active==="add" &&
          <div style={{ textAlign: "center" }}>
            <FormControl sx={{ m: 4, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Select Date</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={value}
                onChange={handleChange}
                autoWidth
                label="Select Date"
              >
                {gameType.map((data,idx) => (
                  <MenuItem key={idx} value={idx}>
                    {data.forDate}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
    }
     {
        value >=0 &&
        <ShowEventData onChange={changeHandler} value={value} EventData={gameType} name={props.value.tile_desc}/>
      }
      </div>
      </>
  )
      }
      export default ShowEvent
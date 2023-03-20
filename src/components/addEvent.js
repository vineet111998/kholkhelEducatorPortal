import React, { useState, useEffect } from "react";
import MultiLingualEvent from './multiLingualEvent';
import learningOutcomeService from "../services/learningOutcomeService";
import gradeService from "../services/gradeService";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Container from 'react-bootstrap/Container';

const EventList = () => {
  const [outcomeInfo, setOutcomeInfo] = useState([]);
  const [gradeinfo, setGradeInfo] = useState([]);
  const [value, setValue] = useState('');
  const [grade,setGrade]=useState('');
  const [eventTypeData, setEventData] = useState(2);//multilingual is type 2
  useEffect(() => {
    if (outcomeInfo.length === 0) { getLearningData(); }
    if(gradeinfo.length===0){getGrade();}
  },[]);
  async function getGrade() {
    await gradeService.getInstance().getGradeData().then((res) => {
      var result = JSON.parse(JSON.stringify(res));
      setGradeInfo(result.data);
    })
  }

  async function getLearningData() {
    await learningOutcomeService.getInstance().getLearningData().then((res) => {
      var result = JSON.parse(JSON.stringify(res));
      setOutcomeInfo(result.data);
    })
  }
  const handleChange = (e) => {
    setValue(e.target.value);
  }
  const gradeChange = (e) => {
    setGrade(e.target.value);
  }
  
  return (
    <>
<Container style={{padding: '20px'}}>
          <Grid container spacing={0} justifyContent="center">
  <Grid item xs={12} md={8} sm={10}>
    <FormControl sx={{ m: 4, width: '75%',}}>
            <InputLabel id="demo-simple-select-autowidth-label">Select Grade</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={grade}
              onChange={gradeChange}
              autoWidth
              label="Select Grade"
            >

              {gradeinfo.map(data => (
                <MenuItem key={data.grade_id} value={data.grade_id} >
                  {data.grade_code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  </Grid>
  <Grid item xs={12} md={8} sm={10}>
   <FormControl sx={{ m: 4,width: '75%', }}>
            <InputLabel id="demo-simple-select-autowidth-label">Select Learning Outcome</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={value}
              onChange={handleChange}
              autoWidth
              label="Select Learning Outcome"
            >

              {outcomeInfo.map(data => (
                <MenuItem key={data.tile_type_id} value={data.tile_type_id} >
                  {data.tile_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  </Grid>

</Grid>
          <MultiLingualEvent Outcomevalue={value} gradeValue={grade} eventType={eventTypeData} />
        </Container>
    </>
  )
}

export default EventList;

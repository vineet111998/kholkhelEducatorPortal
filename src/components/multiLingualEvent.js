import * as React from 'react';
import EventDialog_box from './eventDialog_box';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/lab';
const MultiLingunal = (props) => {
  
    const [active,setActive]= React.useState("true");
    const [exipryDate, setExpiryDate] = React.useState(null);
    const [startDate, setStartDate] = React.useState(null);
    const [eventDur,setEventDur]=React.useState([]);
    const [cardArray,setCardArray]=React.useState([]);

    React.useEffect(() => {
    
        if (cardArray.length === 0 && eventDur.length !=0) {
          var arr = [];
          for (let i = 0; i < eventDur.length; i++) {
            var temp={status:false,complete:0,gamedata:{},forDate:eventDur[i]};
            arr.push(temp);
          }
          setCardArray(arr);
        }
      })
    
    return (
    <>
    {
      <div>
      
         <LocalizationProvider dateAdapter={AdapterDateFns} >
      
      <Grid container spacing={0} justifyContent="center">
        
  <Grid item xs={12} md={3.4} sm={10}>
            {/* <Stack spacing={3}> */}
              <DatePicker
                clearable
                
                label="Event Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} helperText="" sx={{ m: 4,width: '75%', }} />
                )}
              />
              </Grid>
              <Grid item xs={12} md={3.4} sm={10}>
              <DatePicker
                clearable
              label="Event End Date"
                value={exipryDate}
                onChange={(newValue) => setExpiryDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} helperText="" sx={{ m: 4,width: '75%', }}/>
                )}
              />
              </Grid>
              </Grid>
          
           
          </LocalizationProvider>
      <Grid container spacing={0} justifyContent="center">
          
          <Grid item xs={10} md={1} sm={5} m="32px">
     
          <Button variant="contained" style={{background:"rgb(85 50 40)" , width: "100%",}} 
          onClick={
            async()=>{
              if(exipryDate>=startDate)
              {
                  for (var d =new Date(startDate) ; d <= new Date(exipryDate); d.setDate(d.getDate() + 1)) {
                    eventDur.push(new Date(d));
                  }
        
               setActive("show");
              }
              else{
                alert("Invalid Input!!");
              }
              

          }
          }>
            Next</Button>
            </Grid>
            </Grid>
       
      </div>
      
    }
    {
      active =="show" &&
        <EventDialog_box startDate={startDate} gradeValue={props.gradeValue} endDate={exipryDate} eventType={props.eventType} eventData={cardArray} />
    }
            
        </>
    )
}
export default MultiLingunal;
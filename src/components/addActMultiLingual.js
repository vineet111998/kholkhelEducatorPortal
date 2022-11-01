import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AddEventLangModal from './addEventLangModal';
import EventDialog_box from './eventDialog_box';
const AddMultiLingunal = (props) => {
  const [cardArray,setCardArray]=React.useState([]);
  const [active,setActive]=React.useState("false");
  const [cardID,setCardID]=React.useState(-1);
  const [arrID,setArrID]=React.useState(1);
  
  React.useEffect(() => {
    
    if (cardArray.length === 0) {
      var arr = [];
      for (let i = 0; i < props.eventdur.length; i++) {
        var temp={status:false,complete:0,gamedata:props.selectedLang,forDate:props.eventdur[i]};
        arr.push(temp);
      }
      setCardArray(arr);
    }
    // console.log(cardArray);
  })
  

  const childhandler=(data,id)=>{
    // cardArray[cardID].gamedata[id-1]=data;
    setArrID(arrID+1);
    if(arrID==props.selLanglength.length)
    {
      cardArray[cardID].status=true;
        setActive("false");
        setArrID(1);
    }
    console.log(cardArray)
    console.log(props.selectedLang)
  }
    return (
    <>
    {
        active==="false" &&
        <div>
    <div style={{ width: "50%", margin: "2% auto", display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
           {
             cardArray.map((data,i) =>
             (data.status==false)&&
               <div style={{ flex: "0 0 33.3333333%", margin: "2% auto",textAlign:"center" }} key={i}>
                 <Card  id={i} style={{ width:"140px",height:"140px" ,textAlign:"center", backgroundColor:'#e5e5e5', cursor: "pointer" }} onClick={()=>{setActive("true");setCardID(i)}}>Click to add!!</Card>
               </div>
               ||
               <div style={{ flex: "0 0 33.3333333%", margin: "2% auto",textAlign:"center" }} key={i}>
                 <Card  id={i} style={{ width:"140px",height:"140px" ,textAlign:"center", backgroundColor:'white', cursor: "pointer" }}>Completed!!!</Card>
               </div>
                
             )
             
           }
           
         </div>
         
         <Button onClick={()=>setActive("show")}>Submit</Button>
         </div>
    }
    {
      active=="show" &&
      <EventDialog_box startDate={props.startdate} gradeValue={props.gradeValue} endDate={props.enddate} eventType={props.eventType} eventData={cardArray} />
    }
    {
        active==="true" &&
        <AddEventLangModal selLang={props.selectedLang} value={childhandler} />
    }
    </>
    )
}
export default AddMultiLingunal;
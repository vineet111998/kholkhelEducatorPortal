import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import getEvent from "../services/getEvent";
import { Button } from "@mui/material";
const AddActinEvent = (data) => {
    // console.log(data)
  const columns = [
    {
        name: "id",
        label: "Sl.No",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "tileid",
        label: "tileid",
        options: {
            filter: true,
            sort: false,
            display:false,
        viewColumns:false
          }
      },
      {
        name: "tile",
        label: "Event",
        options: {
            filter: true,
            sort: false,
          }
      },
      
      {
        name: "start_date",
        label: "Start Date",
        options: {
          filter: true,
          sort: false,
        }
      },
      {
        name: "end_date",
        label: "End Date",
        options: {
          filter: true,
          sort: false,
        }
      },
    {
      name: "Add",
      label: "Add",
      options: {
        display: (data.grade !== 0) ? 'true' : 'false',
        customBodyRenderLite(dataI, rowI) {
          return (
            <Button variant="contained" onClick={(e) => { e.preventDefault(); buttonHandler(dataI) }}>
              ADD
            </Button>
          )
        }
      }
    }
  ];
  const buttonHandler = (dataI) => {
    // console.log(console.log(EventData))
    data.onChange(gameEventData[dataI].tileid,EventData[dataI])
  }
  const [gameEventData, setgameEventData] = useState([]);
  const [prevGrade,setprevGrade]=useState(-1);
  const [EventData, setEventData] = useState([]);
  useEffect(() => {
    if(prevGrade!= data.grade)
      {
        setprevGrade(data.grade);
          getGameRepo(); 
      }
  });
  async function getGameRepo() {
    const eventData = [];
    var result;
    if(data.grade==0)
    {
      await getEvent.getInstance().getEventData().then((res) => {
         result = JSON.parse(JSON.stringify(res));
            setEventData(result.data);
      })
    }
    else{
    var grade={"tile_grade_id":data.grade};
    await getEvent.getInstance().getEventByGrade(grade).then((res) => {
      result = JSON.parse(JSON.stringify(res));
      setEventData(result.data);
    })
    }
    for (let i = 0; i < result.data.length; i++) {
        eventData.push({ id: i + 1,tileid:result.data[i].tile_id, tile: result.data[i].tile_desc, start_date: convert(result.data[i].tile_start_date), end_date: convert(result.data[i].tile_end_date) })
      }
      setgameEventData(eventData);
  }
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    fixedHeader: true,
    fixedSelectColumn: false,
    tableBodyHeight: "400px"
  }
  return (
    <>

      <MUIDataTable
        title={"Events List"}
        data={gameEventData}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default AddActinEvent;
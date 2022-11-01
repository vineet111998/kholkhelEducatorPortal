import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import getEvent from "../services/getEvent";
import { Button } from "@mui/material";
var CryptoJS = require("crypto-js");
const ApproveActivity = (data) => {
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
  ];
  const [gameEventData, setgameEventData] = useState([]);
  const [prevGrade,setprevGrade]=useState(-1);
  const [EventData, setEventData] = useState([]);
  const [pendingGameData, setpendingGameData] = useState([]);
  useEffect(() => {
    if(gameEventData.length== 0)
      {
          getGameRepo(); 
      }
      
  },[]);
  async function getGameRepo() {
    const eventData = [];
    var result;
    const ciphertext = localStorage.getItem('user');
    var bytes = CryptoJS.AES.decrypt(ciphertext, 'kholKHEL');
    var userData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    var user={"tile_user_id":userData.userID};
    await getEvent.getInstance().getEventbyUserid(user).then((res) => {
      result = JSON.parse(JSON.stringify(res));
      setEventData(result.data);
    })
      for (let i = 0; i < result.data.length; i++) {
        eventData.push({ id: i + 1,tileid:result.data[i].tile_id, tile: result.data[i].tile_desc, start_date: convert(result.data[i].tile_start_date), end_date: convert(result.data[i].tile_end_date) })
        for(let j=0;j< result.data[i].tile_gameData.length;j++)
        {
            for(let k=0;k<result.data[i].tile_gameData[j].multiGameData.length;k++)
            {
                if(result.data[i].tile_gameData[j].multiGameData[k][2].length >0)
                {   var arr=[];
                        for( let l=0;l<result.data[i].tile_gameData[j].multiGameData[k][2].length;l++)
                        {
                            if(result.data[i].tile_gameData[j].multiGameData[k][2][l].status==-1)
                            {
                                arr.push(result.data[i].tile_gameData[j].multiGameData[k][2][l]);
                            }
                        }
                        result.data[i].tile_game_info.push({forDate:result.data[i].tile_gameData[j].forDate,langData:result.data[i].tile_gameData[j].multiGameData[k][0],gameData:arr});
                }
            }
        }
        if(result.data[i].tile_game_info.length>0)
        {
            pendingGameData.push(result.data[i]);
        }
      }
    //   console.log(pendingGameData)
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
        title={"Events List "}
        data={gameEventData}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default ApproveActivity;
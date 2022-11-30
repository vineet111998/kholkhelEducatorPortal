import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import getEvent from "../services/getEvent";
import { Button } from "@mui/material";
import AddEvent from "./addEvent";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ShowEvent from "./ShowEvent";
import $ from "jquery";
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
  const [active, setActive] = useState("list");
  const [gameEventData, setgameEventData] = useState([]);
  const [prevGrade,setprevGrade]=useState(-1);
  const [EventData, setEventData] = useState([]);
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
      for (let i = 0; i < result.data.length; i++) {
        eventData.push({ id: i + 1,tileid:result.data[i].tile_id, tile: result.data[i].tile_desc, start_date: convert(result.data[i].tile_start_date), end_date: convert(result.data[i].tile_end_date) })
      }
      setgameEventData(eventData);
    })
  }
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  // const options = {
  //   filter: true,
  //   filterType: "dropdown",
  //   responsive: "standard",
  //   fixedHeader: true,
  //   fixedSelectColumn: false,
  //   tableBodyHeight: "400px"
  // }
  const [selectedRow, setSelectedRow] = useState({});

  const options = {
    onRowClick: (curRowSelected) => {
      setSelectedRow(EventData[curRowSelected[0] - 1]);
      setActive("show");
      $('.artifactouterdiv').css({border:"none !important"});
    }
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    display: 'block'
  };
  const handleClose = () => {
    setActive("list");
  }
  return (
    <>
    {
          active === "list" &&
          (
    <div className="artifactouterdiv">
            <div style={{boxShadow: "rgb(0 0 0 / 20%) 0px 20px 30px !important", border: "1px solid rgba(0,0,0,0.1) !important", borderRadius: "20px", padding: "0 !important"}}>
            <div style={{ display: "inline-block", width: "99%", padding: ".75%" }}>
              <Button variant="contained" style={{ float: "right",background:"rgb(85 50 40)" }} onClick={() => setActive("add")}>ADD</Button>
            </div>
        
            <MUIDataTable
          title={"Events List "}
          data={gameEventData}
          columns={columns}
          options={options}
        />
            </div>
            </div>
            )
      }
      {
        active === "add" &&
    <div className="artifactouterdiv">

        <AddEvent/>
        </div>

      }

     {
        active === "show" &&
        <Modal
          open={true}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ShowEvent value={selectedRow}/>
          </Box>
        </Modal>
      }

    </>
  )
}

export default ApproveActivity;
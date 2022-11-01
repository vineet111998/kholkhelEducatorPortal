import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import gameTypeList from "../services/gameTypeList";
import { Button } from '@mui/material';
import GameType from './addGameType';

const GameTypeList = () => {
  const columns = [
    {
      name: "id",
      label: "Sl.No",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "desc",
      label: "Desc",
    },
    {
      name: "status",
      label: "Status",
    }
  ];

  const [gameData, setGameData] = useState([]);
  const [active, setActive] = useState("list");

  const changeHandler = (e) => {
    setActive(e);
  }
  useEffect(() => {
    if (gameData.length == 0) {
      getTypeData();
    }
  });
  async function getTypeData() {
    var gameDataTemp = [];
    await gameTypeList.getInstance().getData().then((res) => {
      let result = JSON.stringify(res);
      let obj = JSON.parse(result);
      console.log();
      for (let i = 0; i < obj.length; i++) {
        gameDataTemp.push({ name: obj[i].game_name, desc: obj[i].game_desc, id: obj[i].game_type_id,status:obj[i].statusdata[0].status_desc });
      }

    });
    setGameData(gameDataTemp);
  }

  return (
    <>
      {
        active === "list" &&
        (<div style={{ display: "inline-block", width: "99%", padding: ".75%" }}>
          <Button variant="contained" style={{ float: "right" }} onClick={() => setActive("add")}>ADD</Button>
        </div>)
      }
      {
        active === "list" &&
        (<MUIDataTable
          title={"Game Type List"}
          data={gameData}
          columns={columns}

        />)
      }
      {
        active === "add" &&
        //child Component
        <GameType onChange={changeHandler} />
      }
      {/* {
        active === "add" &&
        <div style={{ display: "inline-block", width: "99%", padding: ".75%" }}>
          <Button variant="contained" style={{ float: "right" }} onClick={() => setActive("list")}>Back</Button>
        </div>
      } */}
    </>
  )

}

export default GameTypeList;
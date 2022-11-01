import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import gameRepoList from "../services/gameRepoList";
import { Button } from "@mui/material";
const AddEventGameModal = (data) => {
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
      name: "game_name",
      label: "Game",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "game_type",
      label: "Game Type",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "Add",
      label: "Add",
      options: {
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
    // console.log(gameRepoData[dataI])
    data.value(gameRepoData[dataI]);
  }
  const [gameRepoData, setGameRepoData] = useState([]);
  useEffect(() => {
    if (gameRepoData.length === 0) { getGameRepo(); }
  })
  async function getGameRepo() {
    const repoData = [];
    await gameRepoList.getInstance().getRepoData().then((res) => {
      // console.log(JSON.stringify(res))
      let result = JSON.stringify(res);
      let obj = JSON.parse(result);
      console.log(obj);
      for (let i = 0; i < obj.length; i++) {
        repoData.push({ id: obj[i].game_info_id, game_name: obj[i].game_desc, game_type: obj[i].gametypedata[0].game_desc, game_attr: obj[i].game_attr, game_artifact: obj[i].game_artifact, game_answer_status: obj[i].game_answer_status, game_type_id: obj[i].game_type_id, status:-1 })
      }
      setGameRepoData(repoData);
    });
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
        title={"Select Game "}
        data={gameRepoData}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default AddEventGameModal;
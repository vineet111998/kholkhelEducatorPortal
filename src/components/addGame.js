import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button, List } from "@mui/material";
import AddGameInfo from "./addGameInfo";
import gameRepoList from "../services/gameRepoList";
import AvadhanAttr from "./moreAvadhanAttr";
const AddGame = (props) => {
  const [gameInfo, setGameInfo] = React.useState([]);
  const [value,setValue]=React.useState();
  const [active,setActive]=React.useState("list");
  const bttnHandler=(index)=>{
    setGameInfo(gameInfo[index]);
    setActive("show");
    props.onChange("show")
  }
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
        sort: true,
      }
    },
    {
      name: "game_desc",
      label: "Game Description",
      options: {
        filter: false,
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
        name: "game_status",
        label: "Game Status",
        options: {
          filter: true,
          sort: false,
        }
      },
      
      {
          name: "add",
          label:"ADD",
          options: {
            display: (props.value===1) ? 'true' : 'false',
            filter: true,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex, rowIndex) => {
              return (
                gameInfo[dataIndex].status_id===2 &&
                <Button onClick={()=>{bttnHandler(dataIndex)}}>Add</Button>
                
                
              );
            }
        }
      }
  ];

 
  

  React.useEffect(() => {
    // console.log(props.value)
      if(value!= props.value)
      {
          setValue(props.value);
        gameMenu(); 
      }
  })
  //for the menubar
  async function gameMenu() {
    const gameData = [];
    var data={};
    if(props.value!=0){data={master_game_type_id:props.value};}
    await gameRepoList.getInstance().getRepoData(data).then((res) => {
      var obj = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < obj.length; i++) {
        gameData.push({ id: obj[i].game_info_id, game_name: obj[i].gametypedata[0].game_desc,game_desc: obj[i].game_desc, game_type: obj[i].alltypesofgamesdata[0].master_game_type_name,game_type_id:obj[i].master_game_type_id,game_status:obj[i].statusdata[0].status_desc,game_attr:obj[i].game_attr,status_id:obj[i].status_id});
      }
      setGameInfo(gameData);
    })
    
  }
  return (
    <>
          {
              active === "list" &&
              <div>
                {
                  props.value!=0 &&
                  <div style={{ display: "inline-block", width: "99%", padding: ".75%" }}>
                    <Button variant="contained" style={{ float: "right" }} onClick={() => {setActive("add");props.onChange("list")}}>ADD</Button>
                  </div>
                }
              <MUIDataTable
                  title={"Game Repo List"}
                  data={gameInfo}
                  columns={columns}
                />
              </div>
          }

          {
              active==="add" &&
              <AddGameInfo masterID={gameInfo[0].game_type_id}/>
            //   gameInfo.master_game_type_id===2 &&

          }
          {
            active ==="show"&&
          <AvadhanAttr gameData={gameInfo}/>
          }
    </>

          )
}

export default AddGame;
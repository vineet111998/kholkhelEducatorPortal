import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button, List } from "@mui/material";
import WordleAttr from './addWordleAttr';
import QuizAttr from './addQuizAttr';
import HangmanAttr from './addHangmanAttr'
import PictureAttr from './addPictureAttr';
import AvadhanAttr from './addAvadhanAttr';
import AddDragNDropPuzzle from './addDragNdroppuzzle';
import gameDataService from '../services/gameDataService';
import AddSentenceScramble from './AddSentenceScramble';
import AddWordScramble from './AddWordScramble';
import AddElectroGame from './addElectroGame';

const AddGame = (props) => {
  console.log(props);
    const [gameInfo,setGameInfo]=useState([]);
  React.useEffect(() => {
    gameMenu(); 
  },[])
  async function gameMenu() {
    const gameData = [];
    await gameDataService.getInstance().getGameType({master_game_type_id:props.masterID}).then((res) => {
      var obj = JSON.parse(JSON.stringify(res));
        console.log(obj);
        for (let i = 0; i < obj.length; i++) {
            gameData.push({ id: obj[i].game_type_id, game_name: obj[i].game_name,game_desc: obj[i].game_desc, game_type: obj[i].alltypesofgamesdata[0].master_game_type_name,game_type_id:obj[i].master_game_type_id,game_status:obj[i].statusdata[0].status_desc,status_code:obj[i].game_status});
          }
          setGameInfo(gameData);
    })
  };
  const [value,setValue]=useState(0);
  const bttnHandler=(index)=>{
    console.log(gameInfo[index].id)
    setValue(gameInfo[index].id);
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
          options: {
            filter: true,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex, rowIndex) => {
              return (
                <Button onClick={()=>{bttnHandler(dataIndex)}}>Add</Button>
              );
            }
        }
      }
  ];

 function changeHandler(data)
 {
  props.onChange(data);
 }

  return (
   
   <> 
        {
          value<=0 &&   
            <MUIDataTable
              title={"Game Type List"}
              data={gameInfo}
              columns={columns}
              />
        }
        {
                    
            props.masterID===1&&
        <>{
            value === 5 &&
            (
            <AvadhanAttr primaryId={value} masterId={props.masterID} />
            )
        }
       </> 
        }
  {
    props.masterID===2&&
  <>{
    value === 1 &&
    (
      <PictureAttr primaryId={value} masterId={props.masterID} onChange={changeHandler} />
    )
  }
  {
    value === 2 &&
    (
      <WordleAttr primaryId={value} masterId={props.masterID} />
    )
  }
  {
    value === 3 &&
    (
      <QuizAttr primaryId={value} masterId={props.masterID} />
    )
  }
   {
    value === 4 &&
    (
      <HangmanAttr primaryId={value} masterId={props.masterID} />
    )
  }
  {
    value === 6 &&
    (
      <AddDragNDropPuzzle primaryId={value} masterId={props.masterID} />
    )
  }
  {
    value === 7 &&
    (
      <AddSentenceScramble primaryId={value} masterId={props.masterID} />
    )
  }
  {/* {
    value === 8 &&
    (
      <AddWordScramble primaryId={value} masterId={props.masterID} />
    )
  } */}
  {
    value === 8 &&
    (
      <AddElectroGame primaryId={value} masterId={props.masterID} />
    )
  }
  </>
}
</>
          )
          
       
}

export default AddGame;
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
const AddGame = (props) => {
    // console.log(props)
  const [gameInfo, setGameInfo] = React.useState([]);
  const [value,setValue]=React.useState(-1);

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
      name: "lang",
      label: "Language",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
        name: "lang_status",
        label: "Status",
        options: {
          filter: true,
          sort: false,
        }
      }
  ];

  const options={
    filter:true,
    filterType:"dropdown",
    responsive:"standard",
    fixedHeader:true,
    fixedSelectColumn:false,
    tableBodyHeight:"40vh"
}
  

  React.useEffect(() => {
      if(value!= props.value)
      {
        setValue(props.value);
        gameMenu(); 
      }
  });
    
  const gameMenu=async()=> {
    const gameData = [];
    for(let i = 0; i <props.EventData[props.value].multiGameData.length; i++)
    {
        if(Object.keys(props.EventData[props.value].multiGameData[i][1]).length>0)
        {
            gameData.push({id:i+1,lang:props.EventData[props.value].multiGameData[i][0].lang_desc,lang_status:"Configured"})
        }
        else
        {
            gameData.push({id:i+1,lang:props.EventData[props.value].multiGameData[i][0].lang_desc,lang_status:"Not Configured"})

        }
        
    }  
    setGameInfo(gameData);
  }
  return (
              <MUIDataTable
                  title={props.name}
                  data={gameInfo}
                  columns={columns}
                  options={options}
                />

          )
}

export default AddGame;
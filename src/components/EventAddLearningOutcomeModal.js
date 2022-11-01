import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import learningOutcomeService from "../services/learningOutcomeService";
import { Button } from "@mui/material";
import AddLearningOutcome from './addLearningOutcome';
const GameRepoList = (data) => {
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
      name: "outcome_name",
      label: "Learning Outcome Name",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "outcome_desc",
      label: "Learning Outcome Description",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
        name: "Add",
        label: "Add",
        options: {
          customBodyRenderLite(dataI,rowI){
            return(
            <Button  variant="contained" onClick={(e)=>{e.preventDefault();buttonHandler(dataI)}}>
                      ADD
                  </Button>
            )
          }
        }
    }
  ];
  const buttonHandler= (dataI) =>{
    data.value(learningOutcome[dataI]);
  }
  const [learningOutcome, setLearningOutcome] = useState([]);
  const [active, setActive] = useState("list");
  useEffect(() => {
    if (learningOutcome.length === 0) { activityList({ tile_type_id: data.id }); }
  })

  async function activityList(data) {
    console.log(data);
    const outcomeData = [];
    await learningOutcomeService.getInstance().getActivityList(data).then((res) => {
        var result = JSON.parse(JSON.stringify(res));

        for (let i = 0; i < result.data[0].tile_attr.length; i++) {
            outcomeData.push({ id: i + 1, outcome_name: result.data[0].tile_attr[i].activityName, outcome_desc: result.data[0].tile_attr[i].activityDesc });
        }
        console.log(result.data[0].tile_attr);
    })
    setLearningOutcome(outcomeData);
}
const options={
  filter:true,
  filterType:"dropdown",
  responsive:"standard",
  fixedHeader:true,
  fixedSelectColumn:false,
  tableBodyHeight:"400px"
}
  return (
          <MUIDataTable
          title={"Activity List"}
            data={learningOutcome}
            columns={columns}
            options={options}
            />
  )
}

export default GameRepoList;
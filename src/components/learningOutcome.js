import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import learningOutcomeService from "../services/learningOutcomeService";
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
import AddLearningOutcome from './addLearningOutcome';
// import ActivityList from './activitylist'
const LearningOutcome = () => {
  const columns = [
    {
      name: "key",
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
      },
    }
  ];
  const [learningOutcome, setLearningOutcome] = useState([]);
  const [active, setActive] = useState("list");

  // const [selectedRow, setSelectedRow] = useState();
  // const [outcomeName, setOutcomeName] = useState()

  // const options = {
  //   onRowClick: (curRowSelected) => {
  //     setSelectedRow(curRowSelected[0]);
  //     setOutcomeName(curRowSelected[1]);
  //     setActive("show");
  //   },
  // }


  useEffect(() => {
    if (learningOutcome.length === 0) { getGameRepo(); }
  },[])
  const ChangeHandler = (e) => {
    setActive(e);
    window.location.reload(true);
  }

  async function getGameRepo() {
    const repoData = [];
    await learningOutcomeService.getInstance().getLearningData().then((res) => {
      let result = JSON.stringify(res);
      let obj = JSON.parse(result);
      for (let i = 0; i < obj.data.length; i++) {
        repoData.push({ key:i+1,id: obj.data[i].tile_type_id, outcome_name: obj.data[i].tile_name, outcome_desc: obj.data[i].tile_desc })
      }
      setLearningOutcome(repoData);
    });
  }
  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: '50%',
  //   display: 'block'
  // };
  // const handleClose = () => {
  //   setActive("list");
  // }
  return (
    <>
    <div className="artifactouterdiv">
      {
        active === "list" &&
        (
          <div style={{boxShadow: "rgb(0 0 0 / 20%) 0px 20px 30px !important", border: "1px solid rgba(0,0,0,0.1) !important", borderRadius: "20px", padding: "0 !important"}}>
          <div style={{ display: "inline-block", width: "99%", padding: ".75%" }}>
            <Button variant="contained" style={{ float: "right",background:"rgb(85 50 40)" }} onClick={() => setActive("add")}>ADD</Button>
          </div>
      
          <MUIDataTable
            title={"Learning Outcome"}
            data={learningOutcome}
            columns={columns}
            // options={options}
            
          />
          </div>
          )
      }
      {
        active === "add" &&
        //child Component
        <AddLearningOutcome onChange={ChangeHandler} />
      }
      {/* {
        active === "show" &&

        <Modal
          open={true}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ActivityList value={selectedRow} outcomeName={outcomeName} />
          </Box>
        </Modal>
      } */}
      </div>
    </>
  )
}

export default LearningOutcome;
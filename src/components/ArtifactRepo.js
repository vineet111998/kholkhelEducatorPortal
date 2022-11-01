import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import learningOutcomeService from "../services/learningOutcomeService";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddLearningOutcome from './addLearningOutcome';
import ActivityList from './activitylist'
import AddArtifact from './AddArtifact'
import ArtifactService from '../services/artifactService';
import { Image } from "@material-ui/icons";
import { Avatar } from "@mui/material";
const ArtifactRepo = () => {
    const [active, setActive] = useState("list");
    const [artifactInfo, setArtifactInfo] = useState([]);
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
            name: "artifact_name",
            label: "Artifact Name",
            options: {
                filter: true,
                sort: false,
            }

        },
        {
            name: "artifact_prev",
            label: "Artifact Preview",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                        <Avatar variant="rounded" src={"http://localhost:8000/getImage/?imgName=" + artifactInfo[dataIndex].artifact_prev}></Avatar>
                    );
                }
            }
        }
    ];



    // const [selectedRow, setSelectedRow] = useState();
    // const [outcomeName, setOutcomeName] = useState()

    // const options = {
    //     onRowClick: (curRowSelected) => {
    //         setSelectedRow(curRowSelected[0]);
    //         setOutcomeName(curRowSelected[1]);
    //         // setActive("show");
    //     },
    // }
    useEffect(() => {
        if (artifactInfo.length === 0) { getGameRepo(); }
    })
    const ChangeHandler = (e) => {
        setActive(e);
        window.location.reload(true);
    }


    async function getGameRepo() {
        const artifactData = [];
        await ArtifactService.getInstance().getArtifact().then((res) => {
            let result = JSON.stringify(res);
            let obj = JSON.parse(result);
            for (let i = 0; i < obj.data.length; i++) {
                artifactData.push({ id: obj.data[i].artifact_id, artifact_name: obj.data[i].artifact_name, artifact_prev: obj.data[i].artifact_location })
            }
            setArtifactInfo(artifactData);
        });
    }
    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     overflow: 'scroll',
    //     width: '50%',
    //     display: 'block'
    // };
    // const handleClose = () => {
    //     setActive("list");
    // }
    return (
        <>
            {
                active === "list" &&
                (
                <div className="artifactouterdiv">

                    <div style={{ display: "inline-block", width: "99%", padding: ".75%" }}>
                        <Button variant="contained" style={{ float: "right",background:"rgb(85 50 40)" }} onClick={() => setActive("add")}>ADD</Button>
                    </div>
            
                    <MUIDataTable
                        title={"Artifact Repository"}
                        data={artifactInfo}
                        columns={columns}
                        // options={options}
                    />
                    </div>
                    )
            }
            {
                active === "add" &&
                //child Component
                <AddArtifact onChange={ChangeHandler} />
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
        </>
    )
}

export default ArtifactRepo;
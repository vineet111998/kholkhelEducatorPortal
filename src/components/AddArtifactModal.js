import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import gameRepoList from "../services/gameRepoList";
import { Button } from "@mui/material";
import ArtifactService from '../services/artifactService';
import { Avatar } from "@mui/material";
const AddArtifactModal = (data) => {
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
        data.value(artifactInfo[dataI]);
    }
    useEffect(() => {
        if (artifactInfo.length === 0) { getGameRepo(); }
    })
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
                title={"Learning Outcome"}
                data={artifactInfo}
                columns={columns}
                options={options}
            />
        </>
    )
}

export default AddArtifactModal;
import * as React from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Fab } from '@mui/material';

import AddIcon from "@material-ui/icons/Add";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArtifactService from '../services/artifactService';
import {IP} from '../connection';
const AddArtifact = (props) => {
    const [file, setFile] = React.useState();
    const [name, setName] = React.useState("");
    const [imageInfo, setImageInfo] = React.useState({});
    const [State, setState] = React.useState(0);
    const handleClose = (event) => {
        const data = { artifact_name: name, artifact_location: imageInfo };
        uploadArtifact(data);
    };
    async function uploadArtifact(data) {
        await ArtifactService.getInstance().uploadArtifact(data).then((res) => {
            const obj = JSON.parse(JSON.stringify(res));
            console.log(obj);
            if (obj.code === 200) {
                alert(obj.message);
                props.onChange("list")
            }
        })
    }
    const [{ alt, src }, setImg] = React.useState({
        src: '',
        alt: 'Upload an Image'
    });
    const handleImg = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });
        }
    }
    const clickHandler = (event) => {
        var formData = new FormData();
        formData.append('file', file);

        return new Promise((resolve, reject) => {
            axios.post(IP+'uploadArtifact', formData)
                .then(function (response) {
                    let res = JSON.stringify(response);
                    let obj = JSON.parse(res)
                    if (obj.status === 200) {
                        setImageInfo(obj.data);
                        setState(State + 1);

                    }
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
    }
    const changeHandler = (e) => {
        props.onChange(e);
    }
    return (
        <>
            <h2 style={{ textAlign: "center" }}>Upload Artifact</h2>

            {
                State === 1 &&
                <div>
                    <Dialog open={true}>
                        <DialogTitle>Artifact Info</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please provide a name for the artifact
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Artifact Name"
                                type="name"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setName(e.target.value)}

                            />
                        </DialogContent>
                        <DialogActions>
                            {/* <Button onClick={handleClose}>Cancel</Button> */}
                            <Button value="list" onClick={handleClose}>Submit</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
            <Card>
            <div style={{display:"flex"}}>
            <CardContent style={{width: "40%", textAlign: "center", padding: "5% 0",flexDirection:"row", margin: "0 auto" , borderRight: "1px solid",display: "flex",alignItems: "center",flexDirection: "column",justifyContent: "center"}}>
                    <label htmlFor="upload-photo" style={{margin:"40px auto"}}>
                    <input
                            style={{ display: 'none'}}
                            id="upload-photo"
                            name="file"
                            type="file"
                            onChange={handleImg}
                        />

                        
                    <Fab
                            color="default"
                            size="small"
                            component="span"
                            aria-label="add"
                            variant="extended"
                        >
                            <AddIcon /> Upload photo
                        </Fab>
                    </label>
                               <Button style={{margin:"40px auto"}} size="small" onClick={clickHandler}>Submit</Button>
                               </CardContent>

                {
                    <div  style={{width: "60%", textAlign: "center", padding: "8%", margin: "0 auto"}}>
                <img src={src}  alt={"Upload an Image"} style={{width:"500px",height:"500px",display:"block",background:"rgba(0,0,0,0.2)"}}></img>
                </div>
                }
                </div>
            </Card>
        </>
    );
}
export default AddArtifact;
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import * as React from 'react';
import { Fab } from '@mui/material';
import axios from 'axios';
import AddIcon from "@material-ui/icons/Add";
import {IP} from '../connection';
import ElectroDataCard from './ElectoDataCard';
import DialogBox from './dialog_box'
const AddElectroGame=(data)=>{
    const[QImg,setQImg]=React.useState();
    const[AImg,setAImg]=React.useState();
    const[Qfile,setQFile]=React.useState();
    const[Afile,setAFile]=React.useState();
    const [ResultData, setResultData] = React.useState([]);
    const[imageInfo,setImageInfo]=React.useState([]);
    const [Open, setOpen] = React.useState(false);

    const handleQImg = (e) => {
        
        if(e.target.files[0]) {
            setQFile(e.target.files[0]);
            setQImg(e.target.files[0].name);    
        }   
    }

    const handleAImg = (e) => {
        
        if(e.target.files[0]) {
            setAFile(e.target.files[0]);
            setAImg(e.target.files[0].name);     
        }   
    }
    const stateHandler = () => {
        setQImg();
        setAImg();
        setQFile();
        setAFile();
        // setValue();
        // setImageInfo();
    }

    const imageHandler =() =>{
        console.log(imageInfo)
        var formData = new FormData();
        formData.append('file', Qfile);
        formData.append('file', Afile);
        // console.log(formData);
        return new Promise((resolve,reject)=>{
        axios.post(IP+'uploadbulkImage',formData)
          .then(function (response) {
             let res=JSON.stringify(response);
             let obj =JSON.parse(res);
            //  console.log(obj.data)
             if(obj.status===200)
             {
                var imageObj ={"qimg":obj.data[0],"aimg":obj.data[1]}
                imageInfo.push(imageObj);
                alert("Uploaded image successfully");
                stateHandler();
            }
            resolve(response.data);
          })
          .catch(function (error) {
            // console.log(error);
            reject(error);
          });
        })
    }

    const FinishHandler=()=>{
        setOpen(true)
    }

    const exitHandler = (e) => {
        data.onChange(e);
    }

    return (
        <>
        <h1>Electro</h1>
        {
            (<div>
                {
                    imageInfo.length > 0 &&
                     imageInfo.map((e) =>
                         <div style={{ marginTop: "5%" }}>
                             <ElectroDataCard question={e.qimg} answer={e.aimg}/>
                         </div>
                     )
                 }
             </div>)
         }
         {
            Open &&
            <DialogBox value={Open} primaryId={data.primaryId} masterId={data.masterId} QuizData={imageInfo} onChange={exitHandler} />
         }
        <Card>
                        <CardContent style={{width: "40%", textAlign: "center", margin: "0 auto"}}>
                        <div style={{display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "space-evenly"}}>
                            <div style={{display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "center"}}>
                            <label htmlFor="uploadQuestion">
                                <input
                                    style={{ display: 'none'}}
                                    id="uploadQuestion"
                                    name="Qfile"
                                    type="file"
                                    onChange={handleQImg}
                                />

                                <Fab
                                    color="default"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    variant="extended"
                                >
                                    <AddIcon /> Upload
                                </Fab>
                            </label>
                            {

                                <p>{QImg}</p>
                            }
                            </div>
                            <div style={{display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "center"}}>
                            <label htmlFor="uploadAnswer">
                                <input
                                    style={{ display: 'none'}}
                                    id="uploadAnswer"
                                    name="Afile"
                                    type="file"
                                    onChange={handleAImg}
                                />

                                <Fab
                                    color="default"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    variant="extended"
                                >
                                    <AddIcon /> Upload
                                </Fab>
                            </label>
                            {

                                <p>{AImg}</p>
                            }
                            </div>
                            
                            </div>
                            <p style={{fontSize:"12px"}}>*file type must be:jpg/jpeg/png</p>
                        </CardContent>

                        <Button variant="contained" onClick={imageHandler} style={{"margin":"5px 25px 20px 0"}}>ADD</Button>
                        <Button style={{"margin":"5px 0 20px 0"}} variant="contained" onClick={FinishHandler}>Finish</Button>
                    </Card>

        </>
    )
}

export default AddElectroGame;
import * as React from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Fab } from '@mui/material';
import AddIcon from "@material-ui/icons/Add";
import axios from 'axios';
import DialogBox from './dialog_box'
import {IP} from '../connection';
const DragNDropPuzzle = (props) => {
    const[file,setFile]=React.useState();
    const [open, setOpen]=React.useState(false);
    const [{alt, src}, setImg] = React.useState({
        src: '',
        alt: 'Upload an Image'
    });
    const[imageInfo,setImageInfo]=React.useState({});
    const [State,setState]=React.useState(0);

    const handleImg = (e) => {
        if(e.target.files[0]) {
            setFile(e.target.files[0]);
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });    
        }   
    }
    const clickHandler =(event) =>{
        var formData = new FormData();
        formData.append('file', file);
      
        return new Promise((resolve,reject)=>{
        axios.post(IP+'uploadImage',formData)
          .then(function (response) {
             let res=JSON.stringify(response);
             let obj =JSON.parse(res)
             if(obj.status===200)
             {
                setImageInfo(obj.data);
                setState(State+1);
                setOpen(true);
            }
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        })
    }
    const changeHandler=(e)=>{
        console.log(e)
        // props.onChange(e);
    }
       return (
        <>
            <h2 style={{ textAlign: "center" }}>PICTURE GAME ATTRIBUTES</h2>

            {
                State ===1 &&
                <DialogBox value={open} primaryId={props.primaryId} masterId={props.masterId} QuizData={imageInfo} onChange={changeHandler}/>
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
export default DragNDropPuzzle;
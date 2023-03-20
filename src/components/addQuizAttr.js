import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import QuizDataCard from "./QuizDataCard";
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import DialogBox from './QuizDialogBox'
import { Fab } from '@mui/material';
import axios from 'axios';
import AddIcon from "@material-ui/icons/Add";
import {IP} from '../connection';

const SetQuizAttr = (data) => {
    const [State, setState] = useState(1);
    const [Question, setQuestion] = useState("")
    const [Option, setOption] = useState([])
    const [Answer, setAnswer] = useState("")
    const [ResultData, setResultData] = useState([]);
    const [open, setOpen] = useState(false);
    const [value,setValue]=useState(-1);
    const[file,setFile]=React.useState();
    const [{alt, src}, setImg] = React.useState({
        src: '',
        alt: ' '
    });
    const[imageInfo,setImageInfo]=React.useState({});
    
    const changeHandler = async(e) => {
;        if (e.target.id =='obttn' || e.target.id== 'abttn') {
            
            if(e.target.id ==='obttn' && value>=0)
            {
                await imageHandler();
            }
            setState(State + 1);
        }
        else if (e.target.id == 'back1') {
            setState(State - 1);
        }
    }
    const imageHandler =() =>{
        var formData = new FormData();
        formData.append('file', file);
      
        return new Promise((resolve,reject)=>{
        axios.post(IP+'uploadImage',formData)
          .then(function (response) {
             let res=JSON.stringify(response);
             let obj =JSON.parse(res);
             console.log(obj)
             if(obj.status===200)
             {
                setImageInfo(obj.data);
                alert("Uploaded image successfully");
            }
            resolve(response.data);
          })
          .catch(function (error) {
            // console.log(error);
          });
        })
    }

    const exitHandler = (e) => {
        data.onChange(e);
    }
    const OptionHandler = (result) => {
        Option[result.target.id - 1] = result.target.value;
        // console.log(Option);
    }
    const finsihHandler = () => {
        let JosnObj = {
            questions: "",
            answers: "",
            options: [],
            value: -1,
            otherAttr: "",
        }

        JosnObj.questions = Question;
        JosnObj.answers = Answer;
        JosnObj.options = Option;
        JosnObj.value=value;
        JosnObj.otherAttr=imageInfo;
        // console.log(JosnObj)
        ResultData.push(JosnObj);

        setState(State + 1)
    }
    const clickHandle = () => {
        setState(1);
        setQuestion("");
        setOption([]);
        setAnswer("");
        setValue(-1);
        setImageInfo("");
    }
    const submitHandler = () => {
        setState(State + 1);
        setOpen(true);
    }
    const handleImg = (e) => {
        // console.log(e.target.files[0]);
        if(e.target.files[0]) {
            setFile(e.target.files[0]);
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });    
        }   
    }
    

    return (
        <>
            <h2>Quiz Attr</h2>
            {
                (<div>
                    {
                        ResultData.length > 0 &&
                        ResultData.map((e) =>
                            <div style={{ marginTop: "5%" }}>
                                <QuizDataCard question={e.questions} optionsForAnswer={e.options} answer={e.answers} value={e.value} otherAttr={e.otherAttr} />
                            </div>
                        )
                    }
                </div>)
            }
            {
                State === 4 &&
                (<div>
                    <Button variant="contained" onClick={clickHandle} >ADD</Button>
                    <Button variant="contained" onClick={submitHandler}>SUBMIT</Button>
                </div>
                )
            }
            {
                State === 5 &&
                <DialogBox value={open} primaryId={data.primaryId} masterId={data.masterId} QuizData={ResultData} onChange={exitHandler} />
            }

            {
                State === 1 &&
                <div>
                    <div>
                        <Card>
                            <CardContent >
                                <TextField
                                    required
                                    id="question"
                                    name="question"
                                    label="Question"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    onChange={(e) => { setQuestion(e.target.value) }}
                                />
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                    <Grid item xs={12}>
                        <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Want to add?</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={(event)=>{event.preventDefault();setValue(event.target.value);}}
                                style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row',}}
                            >
                                <FormControlLabel value="0" control={<Radio />} label="Image" />
                                <FormControlLabel value="1" control={<Radio />} label="Audio" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    </div>
                    <div>
                        {
                            value >=0 &&
                    <Card>
                        <CardContent style={{width: "40%", textAlign: "center", margin: "0 auto" ,display: "flex",alignItems: "center",flexDirection: "column",justifyContent: "center"}}>
                            <div style={{display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "center"}}>
                            <label htmlFor="upload-photo">
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
                                    <AddIcon /> Upload
                                </Fab>
                            </label>
                            {

                                <p>{alt}</p>
                            }
                            
                            </div>
                            {
                                value==0 &&
                                <p style={{fontSize:"12px"}}>*file type must be:jpg/jpeg/png</p>
                            }
                            {
                                value==1 &&
                                <p style={{fontSize:"12px"}}>*file type must be:mp3</p>
                            }
                        </CardContent>
                    </Card>
                        }
                    </div>
                    <div>
                        <Button variant="contained" onClick={changeHandler} id="obttn">Add Options</Button>
                    </div>
                </div>
            }
            {/* to add options */}
            {
                State === 2 &&

                <div>
                    <Card>
                        <CardContent >
                            <TextField
                                required
                                id="1"
                                name="option1"
                                label="Option:1"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                                onBlur={(e) => { OptionHandler(e) }}
                            />
                            <TextField
                                required
                                id="2"
                                name="option2"
                                label="Option:2"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                                onBlur={(e) => { OptionHandler(e) }}
                            />
                            <TextField
                                required
                                id="3"
                                name="option3"
                                label="Option:3"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                                onBlur={(e) => { OptionHandler(e) }}
                            />
                            <TextField
                                required
                                id="4"
                                name="option4"
                                label="Option:4"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                                onBlur={(e) => { OptionHandler(e) }}
                            />
                        </CardContent>
                    </Card>
                    <div>
                        <Button variant="contained" onClick={changeHandler} id="abttn">Add Answers</Button>
                        <Button variant="contained" onClick={changeHandler} id="back1">Back</Button>
                    </div>
                </div>
            }
            {/* Answers */}
            {
                State === 3 &&
                <div>
                    <FormControl >
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(data) => setAnswer(data.target.value)}
                        >
                            {
                                Option.map((data) => <FormControlLabel value={data} control={<Radio />} label={data} />
                                )
                            }
                        </RadioGroup>
                    </FormControl>
                    <p style={{ fontWeight: "bold", fontSize: "19px" }}>Selected Answer: {Answer}</p>
                </div>
            }
            {
                Answer.length > 0 && State !== 4 &&
                <div>
                    <Button variant="contained" onClick={finsihHandler} id="fbttn">Finish</Button>
                </div>
            }
        </>
    )
}
export default SetQuizAttr;
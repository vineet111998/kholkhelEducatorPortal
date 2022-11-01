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
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DialogBox from './QuizDialogBox'
const SetQuizAttr = (data) => {
    const [State, setState] = useState(1);
    const [Question, setQuestion] = useState("")
    const [Option, setOption] = useState([])
    const [Answer, setAnswer] = useState("")
    const [ResultData, setResultData] = useState([]);
    const [open, setOpen] = useState(false);
    const changeHandler = (e) => {
        if (e.target.id === 'qbttn' || 'obttn' || 'abttn') {
            setState(State + 1);
        }

        else if (e.target.id === 'back1') {
            setState(State - 1);
        }

    }
    const exitHandler = (e) => {
        data.onChange(e);
    }
    const OptionHandler = (result) => {
        Option[result.target.id - 1] = result.target.value;
        console.log(Option);
    }
    const finsihHandler = () => {
        let JosnObj = {
            questions: "",
            answers: "",
            options: []
        }

        JosnObj.questions = Question;
        JosnObj.answers = Answer;
        JosnObj.options = Option;
        ResultData.push(JosnObj);

        setState(State + 1)
    }
    const clickHandle = () => {
        setState(1);
        setQuestion("");
        setOption([]);
        setAnswer("");
    }
    const submitHandler = () => {
        setState(State + 1);
        setOpen(true);
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
                                <QuizDataCard question={e.questions} optionsForAnswer={e.options} answer={e.answers} />
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
                    {/* <div>
                        <Button variant="contained" onClick={changeHandler} id="back1">Back</Button>
                    </div> */}
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
            {/* {
                State == 4 &&
                <QuizDataCard value={ResultData} onClick={propsHandler} />
            } */}
        </>
    )
}
export default SetQuizAttr;
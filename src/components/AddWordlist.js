import * as React from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import WordDataCard from './WordDataCard'
import GameDataService from '../services/gameDataService';

const AddWordList = (props) => {
    const [word_attr, setWordAttr] = React.useState("");
    const [status, setStatus] = React.useState(true);
    const [ResultData, setResultData] = React.useState([]);
    const clickHandler = (event) => {
        let JosnObj = {
            wordAttr: "",
            wordLength: -1
        }
        JosnObj.wordAttr = word_attr;
        JosnObj.wordLength = word_attr.length;
        ResultData.push(JosnObj);
        // console.log(ResultData);
        // setStatus(true)
        setWordAttr("");
    }
    const submitHandler = (e) => {
        for(let i=0;i<ResultData.length;i++){
            var data ={ word_length:ResultData[i].wordLength,word_attr:ResultData[i].wordAttr};
            AddWordToRepo(data,i)
        }
    }

    async function AddWordToRepo(data,loopCount) {
        
        await GameDataService.getInstance().AddWordToRepo(data).then((res) => {
            let result = JSON.parse(JSON.stringify(res));
            if (result.code === 200 && loopCount==ResultData.length-1) {
                alert(result.message);
                props.onChange("list");
            }
        })
    }
    return (
        <>
        <h2 style={{ textAlign: "center" }}>Add Word to the list</h2>
            {
                ResultData.length > 0 &&
                ResultData.map((e, index) =>
                    <div key={index} style={{ marginTop: "5%" }}>
                        <WordDataCard word_attr={e.wordAttr} word_length={e.wordLength} />
                    </div>
                )
            }

            {
                // status &&
                <><br></br>
                <br></br>
                <Card>
                    <CardContent>
                        <TextField style={{ padding: ".6%", marginBottom: "2%",textTransform:'uppercase' }}
                            required
                            id="wordAttr"
                            name="wordAttr"
                            label="Word"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            value={word_attr}
                            onChange={(e) => { setWordAttr(e.target.value.toLowerCase()); }} />
                        <TextField style={{ padding: ".6%", marginBottom: "2%" }}
                            required
                            disabled={true}
                            id="wordLength"
                            name="wordLength"
                            label="Word Length"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            value={word_attr.length}
                            />

                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={clickHandler}>Add Activity</Button>
                    </CardActions>
                </Card></>
            }
            {
                ResultData.length >=1 &&
                <Button size="small" value="list" onClick={submitHandler}>Submit</Button>
            }


        </>
    );
}
export default AddWordList;
import * as React from 'react';
import { Button } from '@mui/material';
import GameDataService from '../services/gameDataService';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AddArtifactModal from './AddArtifactModal';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AddWordList from './AddWordlist'
const WordleAttr = (props) => {
    console.log(props);
    const [word, setWord] = React.useState("");
    const [name, setName] = React.useState("");
    const [state, setState] = React.useState(false);
    const [active, setActive] =React.useState(true);
    const [artifactName, setArtifactName] = React.useState("Select to add artifact");
    const [artifactData, setArtifactData] = React.useState();
    const [checkWord,setCheckWord] = React.useState("");
    const [pageActive, setPageActive] = React.useState("list");
    // Change State Function
    const handleChange = () => {
        setState(true);
    };
    const clickHandler = (event) => {
        var data = { game_type_id: props.primaryId, game_attr: word, game_artifact: artifactData, game_desc: name, master_game_type_id:props.masterId,status_id:0 };
        setAttr(data);
        // console.log(data);
    }
    const wordHandler=()=>{
        var data ={ word_length:checkWord.length,word_attr:checkWord};
        checkWordRepo(data);
        
    }
    async function checkWordRepo(data) {
        await GameDataService.getInstance().checkWordRepo(data).then((res) => {
            let result = JSON.parse(JSON.stringify(res));
            if (result.code === 200) {
                if(result.data.length==0){
                    alert(result.message);
                    AddWordToRepo(data);
                }
                else{
                    alert(result.message);
                    setWord(checkWord);
                    setActive(false);
                }                
            }
        }
        )
    }
    async function AddWordToRepo(data){
        await GameDataService.getInstance().AddWordToRepo(data).then((res) => {
            let result = JSON.parse(JSON.stringify(res));
            if (result.code === 200) {
                alert(result.message);
                setWord(checkWord);
                setActive(false);
            }
        })

    }
    async function setAttr(data) {
        await GameDataService.getInstance().setGameAttr(data).then((res) => {
            let result = JSON.parse(JSON.stringify(res));
            if (result.code === 200) {
                alert(result.message);
                window.location.reload(true);
            }
        }
        )
    }
    const artifactHandler = (data) => {
        setState(false);
        setArtifactName(data.artifact_name)
        setArtifactData(data);

    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        display: 'block'
    };
    const changeHandler=(data)=>{
        setPageActive(data);
    }
    return (
        <>
        {pageActive =="list" &&
         <div>
            <h2 style={{ textAlign: "center" }}>WORD GAME ATTRIBUTES</h2>
            <div style={{ display: "inline-block", width: "99%", padding: ".75%" }}>
            <Button variant="contained" style={{ float: "right" }} onClick={() => setPageActive("add")}>ADD</Button>
          </div>
            <Card>
                <Typography variant="h6" gutterBottom>

                </Typography>
                <CardContent >
                    <TextField style={{ padding: ".6%", marginBottom: "2%" ,}}
                        required
                        id="game_desc"
                        name="game_desc"
                        label="Game Name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={(e) => { setName(e.target.value) }}
                    />
                    <TextField style={{ padding: ".6%", marginBottom: "2%"}}
                        required
                        id="wordGame"
                        name="wordGame"
                        label="Word"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={(e)=>{
                            if(e.target.value != checkWord){setActive(true)}
                            else{
                                setActive(false)
                            }
                            setCheckWord(e.target.value.toLowerCase())}}
                    />
                    {
                        active &&
                    <Button  size="small" value="list" onClick={wordHandler}>Check for word</Button>
                    }
                    <br></br>
                    <Button onClick={handleChange}>Add Artifact</Button>
                    <span>{artifactName}</span>
                </CardContent>
                <CardActions>
                    {
                        !active &&
                    <Button size="small" value="list" onClick={clickHandler}>Submit</Button>
                    }
                </CardActions>
            </Card>
            {state &&
                <div>
                    <Modal
                        open={state}
                        // onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <AddArtifactModal value={artifactHandler} />
                        </Box>
                    </Modal>
                </div>
            }
            </div>
        }
        {
            pageActive=='add' &&
            <AddWordList onChange={changeHandler}/>

        }
        </>
    );
}
export default WordleAttr;
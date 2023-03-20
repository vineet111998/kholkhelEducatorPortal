import React, { useEffect, useState,useRef } from "react";
import GameDataService from '../services/gameDataService';
import "./BigSquare.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

function AddSentenceScramble(props) {
  const [word, setWord] = React.useState("");
  const [name, setName] = React.useState("");
  const [artifactData, setArtifactData] = React.useState();

  const clickHandler = (event) => {
    var data = { game_type_id: props.primaryId, game_attr: word.trim(), game_artifact: artifactData, game_desc: name, master_game_type_id:props.masterId,status_id:0 };
    setAttr(data);
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
  return (
    <>
         <div>
            <h2 style={{ textAlign: "center" }}>SCRAMBLE ATTRIBUTES</h2>
            <Card>
                <Typography variant="h6" gutterBottom>

                </Typography>
                <CardContent style={{textAlign:"left"}}>
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
                        label="Word/Sentence"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={(e)=>{
                          setWord(e.target.value.toUpperCase())}}
                    />
                     {
                        // !active &&
                    <Button size="small" value="list" style={{margin:"0 8% 0 0"}} onClick={clickHandler}>Submit</Button>
                    }
                    {/* <br></br> */}
                    {/* <Button onClick={handleChange}>Add Artifact</Button> */}
                    {/* <span>{artifactName}</span> */}
                </CardContent>
            </Card>
            </div>
        </>
  );
}

export default AddSentenceScramble;

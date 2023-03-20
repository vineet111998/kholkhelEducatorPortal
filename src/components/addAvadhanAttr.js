import * as React from 'react';
import { Button } from '@mui/material';
import GameDataService from '../services/gameDataService';
import Card from '@mui/material/Card';
import { Fab } from '@mui/material';
import axios from 'axios';
import AddIcon from "@material-ui/icons/Add";
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import {IP} from '../connection';
const AvadhanAttr = (props) => {
    const[file,setFile]=React.useState();
    const [{alt, src}, setImg] = React.useState({
        src: '',
        alt: 'Upload an Image'
    });
    const [active,setActive]=React.useState(0);
    const [gamedata,setGamedata]=React.useState([]);
    const[image,setimage]=React.useState("");
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
        axios.post(IP+'uploadImageforAvadhan',formData)
          .then(function (response) {
             let res=JSON.stringify(response);
             let obj =JSON.parse(res)
             if(obj.status===200)
             {
                setActive(1);
                gamedata[0]=obj.data;
                setimage(gamedata[0].slice(gamedata[0].indexOf('/')+1,gamedata[0].length));
                
            }
            resolve(response.data);
          })
          .catch(function (error) {
            reject(error);
          });
        })
    }
    const submitHandler=()=>{
        const gameData={image_loc:gamedata[0],game_desc:gamedata[2],rows:gamedata[3],column:gamedata[4]};
        const data={ game_type_id: props.primaryId, game_attr: gameData,game_desc: gamedata[1],master_game_type_id:props.masterId,status_id:2 }
        setdata(data);
    }
    async function setdata(data){
        await GameDataService.getInstance().setGameAttr(data).then((res) => {
            var result = JSON.parse(JSON.stringify(res));
            if(result.code ===200)
            {
                alert(result.message);
                window.location.reload(true);
            }
          })
    }
    return (
        <>{
            active==0 &&
        <Card>
         <CardContent >
         <label htmlFor="upload-photo" >
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="file"
                            type="file"
                            onChange={handleImg}
                        />

                        <Fab
                            color="secondary"
                            size="small"
                            component="span"
                            aria-label="add"
                            variant="extended"
                        >
                            <AddIcon /> Upload photo
                        </Fab>
                    </label>
                    
         </CardContent>
         <CardActions>
                    <Button size="small" onClick={clickHandler}>NEXT</Button>
                </CardActions>
                {
                    <img src={src} alt={alt} style={{ margin: "3% auto 0", width: "70%", display: "block" }}></img>
                }
        </Card>
    }
    {
        active==1 &&
        <Card>
         <CardContent >
         <TextField style={{ padding: ".6%", marginBottom: "2%" ,}}
                        required
                        id="image_loc"
                        name="image_loc"
                        value={image}
                        label="image"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        disabled
                    />
                      <TextField style={{ padding: ".6%", marginBottom: "2%" ,}}
                        required
                        id="game_name"
                        name="game_name"
                        label="Game Name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={(e) => { gamedata[1]=e.target.value }}
                    />
                      <TextField style={{ padding: ".6%", marginBottom: "2%" ,}}
                        required
                        id="game_desc"
                        name="game_desc"
                        label="Catch Phrase"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={(e) => { gamedata[2]=e.target.value }}
                    />
                      <TextField style={{ padding: ".6%", marginBottom: "2%" ,}}
                        required
                        id="rows"
                        name="rows"
                        label="Number of Rows"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                      onChange={(e) => { gamedata[3]=e.target.value }}
                    />
                     <TextField style={{ padding: ".6%", marginBottom: "2%" ,}}
                        required
                        id="column"
                        name="column"
                        label="Number of columns"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                      onChange={(e) => { gamedata[4]=e.target.value }}
                    />
         </CardContent>
         <CardActions>
                    <Button size="small" onClick={submitHandler}>SUBMIT</Button>
                </CardActions>
        </Card>
    }
    </>
    );
}
export default AvadhanAttr;
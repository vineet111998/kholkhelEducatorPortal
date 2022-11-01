import React,{ useState,useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import addGameService from '../services/addGameService';
import { useNavigate , useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import gameDataService from '../services/gameDataService';
const AddGameType=(props)=> {
    const [gameName,setGameName] =useState("");
    const [gameDesc,setGameDesc] =useState("");
    const [value,setValue]=useState(-2);
    const [gameType,setGameType] = useState([]);
    const navigate= useNavigate();
    const clickHandler=(event)=>{
        var data={game_name:gameName,game_desc:gameDesc,game_status:0,master_game_type_id:value};
        console.log(data);
        GameType(data,event);
    }
    async function GameType(data,event){
        await addGameService.getInstance().setGameType(data).then((res)=>{
         
            let result=JSON.stringify(res);
            let obj =JSON.parse(result);

            if(obj.code=='200')
            {
              alert(obj.message);
              props.onChange(event.target.value);
            }
        })
    }
    const handleChange = (event) => {
      setValue(event.target.value);
    };

    useEffect(() => {
      if(gameType.length <= 0){
        getgameType();
      }
      });
      async function getgameType(){
        await gameDataService.getInstance().getMasterGameType({master_game_type_status:0}).then((res) => {
          var result = JSON.parse(JSON.stringify(res));
            setGameType(result.data);
          })
      }

  return (
    <Card>
    <Typography variant="h6" gutterBottom>
       
      </Typography>
      <CardContent >
          <TextField style={{padding : "1%"}}
            required
            id="gameName"
            name="gameName"
            label="Game Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(e)=>{setGameName(e.target.value)}}
          />
          <TextField
            required
            id="gameDesc"
            name="gameDesc"
            label="Game Desc"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e)=>{setGameDesc(e.target.value)}}
          />
           <FormControl sx={{ m: 5, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Game Type</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={value}
                onChange={handleChange}
                autoWidth
                label="Status"
              >

                {gameType.map(data => (
                  <MenuItem key={data.master_game_type_id} value={data.master_game_type_id}>
                    {data.master_game_type_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
      </CardContent>
      <CardActions>
        <Button size="small" value="list" onClick={clickHandler}>Submit</Button>
      </CardActions>
      </Card>
  )
}
export default AddGameType;
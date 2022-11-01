import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import gameDataService from '../services/gameDataService';
import AddGame from './addGame';
const GameRepoList = (props) => {
  const [value, setValue] = React.useState(0);
  const [gameType, setGameType] = React.useState([]);
  const [active, setActive] = React.useState("add");
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  React.useEffect(() => {
    if (gameType.length === 0) {gameMenu(); 
    }
  })
  async function gameMenu() {
    await gameDataService.getInstance().getMasterGameType({master_game_type_status:0}).then((res) => {
      var result = JSON.parse(JSON.stringify(res));
      setGameType(result.data);
    })
  }
  const changeHandler=(e)=>{
    setActive(e);
  }

  return (
      <>
      <div className="artifactouterdiv">
      {
        active==="add" &&
          <div style={{ textAlign: "center" }}>
            <FormControl sx={{ m: 4, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Select Game Type</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={value}
                onChange={handleChange}
                autoWidth
                // defaultValue={0}
                label="Select Game Type"
              >
                <MenuItem key={0} value={0}>{"All"}</MenuItem>
                {gameType.map(data => (
                  <MenuItem key={data.master_game_type_id} value={data.master_game_type_id}>
                    {data.master_game_type_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
    }
     {
        value >=0 &&
        <AddGame onChange={changeHandler} value={value} />
      }
      </div>
      </>
  )
      }
      export default GameRepoList
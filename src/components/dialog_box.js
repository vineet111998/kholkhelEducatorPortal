import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GameDataService from '../services/gameDataService';
import AddArtifactModal from './AddArtifactModal';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@mui/material/Box';

export default function FormDialog(data) {
  const [name, setName] = React.useState("");
  const [state, setState] = React.useState(false);
  const [artifactName, setArtifactName] = React.useState("Select to add artifact");
  const [artifactData, setArtifactData] = React.useState();

  // Change State Function
  const handleChange = (event) => {
    console.log(event.target.checked)
    setState(event.target.checked);
  };
  const handleClose = (event) => {
    let gameData = { game_type_id: data.primaryId, game_attr: data.QuizData, game_artifact: artifactData, game_desc: name,master_game_type_id:data.masterId,status_id:0 };
//    console.log(gameData)
    setQuizData(gameData, event);
  };

  async function setQuizData(newData, event) {
    await GameDataService.getInstance().setGameAttr(newData).then((res) => {
      // console.log(JSON.stringify(res));
      let result = JSON.parse(JSON.stringify(res));
      if (result.code === 200) {
        alert(result.message);
//        data.onChange(event.target.value);
         window.location.reload(true);
      }
    })
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

  return (
    <div>
      <Dialog open={data.value}>
        <DialogTitle>Game Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a name for the game
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Game Name"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <h4>Want to add artifact?</h4>
          <FormControlLabel
            control={
              <Switch
                checked={state}
                onChange={handleChange}
                color="primary"
                name="status"
              />
            }
            label={artifactName}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <Button value="list" onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
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
  );
}

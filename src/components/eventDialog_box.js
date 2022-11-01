import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import getEvent from '../services/getEvent';
import { Stack } from '@mui/material';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AddArtifactModal from './AddArtifactModal'
import MultiLingunalService from '../services/multiLingunalService';

export default function FormDialog(data) {
  
  const [name, setName] = React.useState("");
  const [exipryDate, setExpiryDate] = React.useState(data.endDate)
  const [startDate, setStartDate] = React.useState(data.startDate)
  const [state, setState] = React.useState(false);
  const [artifactName, setArtifactName] = React.useState("Select to add artifact");
  const [artifactData, setArtifactData] = React.useState();
  const [disabled,setDisabled]= React.useState(startDate ==null && exipryDate==null?false:true);
  const [langArr, setLangArr] = React.useState([]);
  const [url,setURL]=React.useState("");
  var CryptoJS = require("crypto-js");
  React.useEffect(() => {
    // console.log(langArr);
      if (langArr.length === 0) getlanguageData();
    });
  async function getlanguageData() {
      var data={lang_status:0};
      await MultiLingunalService.getInstance().getAllLanguage(data).then((res) => {
        var result = JSON.parse(JSON.stringify(res));
        var gameArr=[];
        for(var i= 0; i<result.data.length;i++)
        {
          var arr=[];
          result.data[i]["selected"]=false;
          var ar={};
          var game=[];
          arr.push(result.data[i]);
          arr.push(ar);
          arr.push(game);
          gameArr.push(arr);
        }
        setLangArr(gameArr);
        console.log(gameArr)
      });
      
    }

  // Change State Function
  const handleChange = (event) => {
    setState(event.target.checked);
  };

  const handleSubmit = async (e) => {
    const ciphertext = await localStorage.getItem('user');
    var bytes = CryptoJS.AES.decrypt(ciphertext, 'kholKHEL');
    var userData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    var tempArr=[];
    for(let i=0;i<data.eventData.length;i++)
    {
       tempArr[i]={forDate:data.eventData[i].forDate, multiGameData:langArr};
    }
    var gameData={tile_desc: name,tile_gameData: tempArr,tile_artifact_info: artifactData,tile_grade_id:data.gradeValue, event_type_id:data.eventType ,event_start: startDate, event_end: exipryDate,user_id:userData.userID}
    setQuizData(gameData, e);
  };
  async function setQuizData(newData, event) {
    await getEvent.getInstance().setEventData(newData).then((res) => {
      var result = JSON.parse(JSON.stringify(res));
      if (result.code === 200) {
        
        var activityData={mode:"MapActivity",gameData:result.data.tile_id}
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(activityData), 'kholKHEL').toString();
      var dataString = ciphertext.replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');
        setURL("http://localhost:3006/home/"+dataString);
        alert(result.message);
        // window.location.reload(true);
      }
    })
  }
  const artifactHandler = (data) => {
    setState(false);
    setArtifactName(data.artifact_name)
    setArtifactData(data);

  }
  const textAreaRef = React.useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    alert('Copied!');
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    display: 'block'
  };
  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
    <div>
      <Dialog open={true} >
        <DialogTitle>Event Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a name for the game
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Event Name"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DatePicker
                disabled={disabled}
                clearable
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} helperText="Start Date" />
                )}
              />
              <DatePicker
                
                disabled={disabled}
                clearable
                value={exipryDate}
                onChange={(newValue) => setExpiryDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} helperText="Expiry Date" />
                )}
              />
            </Stack>
          </LocalizationProvider>
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
          <Button style={{margin: "2% auto"}} value="list" onClick={handleSubmit}>Submit</Button>
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
       {url.length >0 &&
        <div>
          <Modal
            open={true}
            onClose={()=>window.location.reload(true)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style1}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              Share the URL
              </Typography>
                <textarea ref={textAreaRef} value={url} style={{width:"100%",height:"55px",resize:"none"}}></textarea>
                 <Button  style={{float:"right"}} onClick={copyToClipboard} >Copy Link</Button>                 
            </Box>
          </Modal>
        </div>
      }
      
    </div>
    </>
  );
}

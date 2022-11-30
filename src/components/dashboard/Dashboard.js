import React, { useState ,useEffect} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Container from '@mui/material/Container';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GameRepoList from '../gameRepolist';
import EventList from '../eventList';
import MapActivity from '../mapActivity';
import ApproveActivity from '../approveActivity';
import {useNavigate} from 'react-router-dom'
import LearningOutcome from '../learningOutcome';
import ArtifactRepo from '../ArtifactRepo'
// import { Avatar } from "@mui/material";
import BlurOnIcon from '@mui/icons-material/BlurOn';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useParams } from 'react-router-dom';
import {IP} from '../../connection';
var CryptoJS = require("crypto-js");
// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website1
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  background:"#FAF8D9 !important",
  boxShadow: "1px 0 5px rgb(0 0 0 / 50%)",
  // backgroundImage:"http://3.7.18.254:80/getImage/?imgName=artifact/Screenshot_(3).png",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = useState("DashBoard");
  const [userType,setUserType] =useState(-1);
  const [status,setStatus] =useState("0%");
  const [eventData,setEventData] =useState(false);
  const history =useNavigate();

  const params=useParams();
  // console.log(params)
  const toggleDrawer = () => {
    // if(!open)
    //   setStatus("0%");
    //   if(open)
    //   setStatus("40%")
    setOpen(!open);
  };
  useEffect(()=>{
    if(userType===-1) getLoginStatus();
    if(userType===1 && Object.keys(params).length>0) addActivity();
    
  });
  async function checkLoginStatus()
  {
    const ciphertext = localStorage.getItem('user');
    if(typeof(ciphertext)!== 'object')
    {
    var bytes = CryptoJS.AES.decrypt(ciphertext, 'kholKHEL');
    var userData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    else
    {
      var userData = null;
    }
    return userData;
  }
  async function getLoginStatus(){
      var userData= await checkLoginStatus();
    if(userData == null)
    {
      if(Object.keys(params).length>0)
        history('/'+params.cypherData);
        else
        history('/');
    }
    else
    {
      setUserType(userData.userType);
    }
  }
  async function addActivity(){
    var ciphertext = params.cypherData.replace(/p1L2u3S/g, '+' ).replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');
    var bytes = CryptoJS.AES.decrypt(ciphertext, 'kholKHEL');
    var userData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setEventData(userData.gameData);
    
  }

  const logout =(event)=>{
    localStorage.removeItem("user");
    history('/');
  }

  return (

    <>   
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
              <Toolbar
                sx={{
                  pr: '24px', // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  // color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  // console.log()
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none', }),
                  }}
                  style={{color:"rgb(85 50 40)"}}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                  style={{textAlign:"center"}}
                >
                  <img variant="rounded" src={IP+"getImage/?imgName=artifact/logo.png"} style={{width:"200px",height:"auto"}}></img>
                  {/* Dashboard */}
                </Typography>
                {/* <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton> */}
                <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              {/* <Button variant="contained" {...bindTrigger(popupState)}>
                Dashboard
              </Button> */}
              <AccountCircleIcon {...bindTrigger(popupState)} style={{fontSize: "xx-large",color:"rgb(85, 50, 40)",cursor: "pointer"}}/>
              <Menu {...bindMenu(popupState)}>
                {/* <MenuItem onClick={popupState.close}>Profile</MenuItem>
                <MenuItem onClick={popupState.close}>My account</MenuItem> */}
                <MenuItem onClick={(e)=>logout(e)}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
                style={{height:"94px"}}
              >
                <IconButton onClick={toggleDrawer} >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav" style={{paddingTop:status, overflow: 'hidden'}}>
                <ListItemButton onClick={() => setActive("DashBoard")} style={{padding: '8px 16px', display: 'flex', justifyContent: 'flex-start',}}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="DashBoard" />
                </ListItemButton>
                {/* <ListItemButton onClick={() => setActive("GameTypeList")}>
                  <ListItemIcon>
                    <SportsEsportsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Game Type Maker" />
                </ListItemButton> */}
                {
                  userType === 0 &&
                <ListItemButton onClick={() => setActive("LearningOutcome")} style={{padding: '8px 16px', display: 'flex', justifyContent: 'flex-start'}}>
                  <ListItemIcon>
                    <SportsEsportsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Learning Outcome" />
                </ListItemButton>
                }
                <ListItemButton onClick={() => setActive("ArtifactRepo")} style={{padding: '8px 16px', display: 'flex', justifyContent: 'flex-start'}}>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Artifact Repository" />
                </ListItemButton>
                {
                  userType === 1 &&
                <ListItemButton onClick={() => setActive("GameRepoList")} style={{padding: '8px 16px', display: 'flex', justifyContent: 'flex-start'}}>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Game Repository" />
                </ListItemButton>
                }
                {
                  userType === 0 &&
                <ListItemButton onClick={() => setActive("EventList")} style={{padding: '8px 16px', display: 'flex', justifyContent: 'flex-start'}}>
                  <ListItemIcon>
                    <BlurOnIcon />
                  </ListItemIcon>
                  <ListItemText primary="Event Maker" />
                </ListItemButton>
                }
                {/* {
                  userType == 0 &&
                <ListItemButton onClick={() => setActive("ApproveActivity")}>
                  <ListItemIcon>
                    <BlurOnIcon />
                  </ListItemIcon>
                  <ListItemText primary="Approve Activity" />
                </ListItemButton>
                } */}
                {
                  userType ===1 &&
                <ListItemButton onClick={() => setActive("MapActivity")} style={{padding: '8px 16px', display: 'flex', justifyContent: 'flex-start'}}>
                  <ListItemIcon>
                    <BlurOnIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Activity" />
                </ListItemButton>
                }
                <Divider sx={{ my: 1 }} />
    
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                // background:"rgb(250 248 217 / 74%)",
                flexGrow: 1,
                // height: '100vh',
                overflow: 'auto',
                paddingTop:"27px"
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    
                {active === "DashBoard" && <h1>DashBoard</h1>}
                {/* {active === "GameTypeList" && <GameTypeList />} */}
                {active === "GameRepoList" && <GameRepoList />}
                {active === "ArtifactRepo" && <ArtifactRepo />}
                {active === "LearningOutcome" && <LearningOutcome />}
                {active === "EventList" && <EventList />}
                {active === "ApproveActivity" && <ApproveActivity />}
                {active === "MapActivity" && <MapActivity />}
                {/* {active === "MapActivity" && } */}
              </Container>
            </Box>
           
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </ThemeProvider>
     
    </>
    
      );
}

export default function Dashboard() {
  return <DashboardContent />;
}

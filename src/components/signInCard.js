import React,{useState,useEffect} from 'react';
import { useNavigate  } from 'react-router-dom'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userService from '../services/userService';
import { useParams } from 'react-router-dom';
import logo from '../assets/logo.png';
var CryptoJS = require("crypto-js");
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignInCard=(props)=> {
  const params=useParams();
  const [loginUser, setLoginUser]=useState("");
  const [loginPass, setLoginPass]=useState("");
  const [userType,setUserType] =useState(-1);
  const [value,setValue]=useState(-1);

  const history =useNavigate ();
  useEffect(()=>{
	  
    if(userType==-1) getLoginStatus();
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
	  console.log(process.env);
	  console.log("12");
    if(loginPass==="" || loginUser===""||value ===-1)
    { 
      if(loginUser==="" && loginPass  === "")
        alert("Please enter the credentials");
      else if(loginPass==="")
        alert("Please enter the password");
      else if(loginUser==="")
        alert("Please enter the user name");
      else if(value===-1)
      alert("Please select user type");
    }
    else{
    const userCred={user_email:loginUser ,user_pass:loginPass,userType:value};
    getSignInCred(userCred);
  }
  };
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
    history('/home');
  }
}

  async function getSignInCred(data){
    await userService.getInstance().loginService(data).then((res)=>{
      let result=JSON.stringify(res);
        let obj= JSON.parse(result);
        if(obj.code === '200'){
          let date =new Date();
          var sessionData={userType:obj.data.userType, email:obj.data.user_email, userID:obj.data.user_id, loginTime:date };
          var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(sessionData), 'kholKHEL').toString();
          localStorage.setItem("user",ciphertext);
          alert(obj.message);
          if(Object.keys(params).length<=0)
            history("/home");
          else
          history("/home/"+params.cypherData);
        }
        else if(obj.code ==='401')
        {
          alert(obj.message)
        }
        else{
        alert(obj.message);
        history('/register');
        }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <div  style={{alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', display: 'grid',}}>
      <Container component="main" maxWidth="xs" style={{backgroundColor: "#fff",borderRadius: '20px',border: '1px solid rgba(0,0,0,0.2)',
    padding: '2%',}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
           
          }}
        >
          <div className='loginlogo'>
          <img variant="rounded" src={logo} style={{width: '100%'}}></img>
             </div>
        
          <Typography component="h1" variant="h5" style={{margin: '4% auto'}}>
            Sign in {process.env.BackendUrl}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              type='email'
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
              onChange={(e)=>setLoginUser(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e)=>setLoginPass(e.target.value)}
            />
            <Grid item xs={12}>
               <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Type of User</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={(event)=>{event.preventDefault();setValue(event.target.value);}}
                style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row',}}
              >
                <FormControlLabel value="0" control={<Radio />} label="Event Maker" />
                <FormControlLabel value="1" control={<Radio />} label="Activity Maker" />
              </RadioGroup>
            </FormControl>
            </Grid>
            <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            
            <Grid container style={{margin: '10% auto 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              
              
              <Grid item>
                <Link href={Object.keys(params).length<=0 ?  "/register": "/register/"+params.cypherData} variant="body2" style={{fontWeight: '500',}}>
                  {"Create Account"}
                </Link>
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{width: 'auto', margin: '0', textTransform: 'capitalize'}}
            >
              Sign In
            </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
      </div>
    </ThemeProvider>
  );
}
export default SignInCard

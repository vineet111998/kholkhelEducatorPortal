import React,{ useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userService from '../services/userService';
import {useNavigate} from 'react-router-dom'

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

const SignUpCard=()=> {
  const [registerName, setRegisterName]=useState("");
  const [registerNumber, setRegisterNumber]=useState("");
  const [registerLast, setRegisterLast]=useState("");
  const [registerEmail, setRegisterEmail]=useState("");
  const [registerPass, setRegisterPass]=useState("");
  const [value,setValue]=useState("");
  const history =useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const registerCred={user_firstname:registerName,user_lastname: registerLast,user_email:registerEmail ,user_pass:registerPass, userType:value};
    getSignUpCred(registerCred)
  };

    async function getSignUpCred(data){
      await userService.getInstance().registerService(data).then((res)=>{
        let result=JSON.stringify(res);
        let obj= JSON.parse(result);
          alert(obj.message)
          history("/");
      })
    }

    async function checkNumber(data)
    {
      await userService.getInstance().checkNumber(data).then((res)=>{
        // let result=JSON.stringify(res);
        console.log(res);
      });
    }
    
  return (
    <ThemeProvider theme={theme}>
       <div  style={{alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', display: 'grid',}}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         <div className='registerslogo'>
          <img variant="rounded" src={"http://localhost:8000/getImage/?imgName=artifact/logo.png"} style={{width: '100%'}}></img>
             </div>
          <Typography component="h1" variant="h5" style={{margin: '4% auto'}}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e)=>setRegisterName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e)=>setRegisterLast(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="number"
                  label="Contact Number"
                  name="number"
                  // autoComplete="email"
                  onChange={(e)=>checkNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>setRegisterEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=>setRegisterPass(e.target.value)}
                />
              </Grid>
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
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            
            <Grid container justifyContent="flex-end" style={{margin: '10% auto 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',}}>
              <Grid item>
                <Link href="/" variant="body2">
                  Sign in Instead
                </Link>
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{width: 'auto', margin: '0',textTransform: 'capitalize'}}
            >
              Sign Up
            </Button>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
      </div>
    </ThemeProvider>
  );
}
export default SignUpCard;
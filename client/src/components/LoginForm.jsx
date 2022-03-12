//From React
import * as React from "react";

import {USER_LOGIN} from '../utils/mutation'

import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';

//From Material UI
import {
  Avatar,
  Button,
  Typography,
  Container,
  CssBaseline,
  Box,
  TextField,
  InputAdornment,
  FormHelperText,
  IconButton
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginForm() {
  const [formState, setFormState] = React.useState({
    employeeId:'',
    password:''
  })

  const [errorText, setErrorText] = React.useState('')

  const[login,{error,data}] = useMutation(USER_LOGIN)


  const handleChange = (event) =>{
    const{name,value} = event.target

    if(name === 'employeeId'){
      setFormState({
        ...formState,
        [name]:value.toLowerCase(),
     });
    }else{
      setFormState({
        ...formState,
        [name]:value,
     });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
   

    try{
      const { data } = await login({
        variables: {...formState},
      });

      Auth.login(data.login.token);

    }catch(e){
      console.error(e);
      setErrorText('Employee Id or password is incorrect')
    }
    setFormState({
      employeeId:'',
      password:''
    })
  }

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function loginError(){
    if(errorText){
      return(
        <FormHelperText id="component-helper-text" sx={{ 
          color:'red',   
          border: 'solid 0.5px',
          backgroundColor: '#fdbcbc',
          fontSize:'15px',
          textAlign: 'center',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '14px',}}>
          {errorText}
        </FormHelperText>
      )
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1, mb: 5 }}>
          {loginError()}
          <TextField
            margin="normal"
            required
            fullWidth
            variant="filled"
            //color='secondary.main'
            sx={{ backgroundColor: "rgba(255,255,255,0.2)", bgcolor: "primary.light" }}
            id="employeeId"
            label="Employee Id"
            name="employeeId"
            autoComplete="employeeId"
            autoFocus
            value={formState.employeeId.toLowerCase()}  
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            variant="filled"
            name="password"
            label="Password"
            value={formState.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            sx={{ bgcolor: "primary.light" }}
            InputProps={{
            endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, bgcolor: "secondary.main" }}
            onClick={handleFormSubmit}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
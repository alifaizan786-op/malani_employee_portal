//From React
import * as React from "react";

import {UPDATE_PASSWORD} from '../utils/mutation'
import {useMutation} from '@apollo/client';

import { useSnackbar } from 'notistack';
import {
    Button,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    FormHelperText,
    Grid,Snackbar,
    Alert,
    FormControl
} from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function SettingsPage(props) {
  


  const [formState, setFormState] = React.useState({
    oldPassword:'',
    newPassword:''
  })

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  

  const [errorText, setErrorText] = React.useState('')

  const[settingsPage,{error,data}] = useMutation(UPDATE_PASSWORD)

  const handleChange = (event)=>{
    const {name,value} = event.target

    setFormState({
      ...formState,
      _id:props._id,
      [name]:value,
    });

  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
   
    try{
      const { data } = await settingsPage({
        variables: {...formState},
      });
      enqueueSnackbar('Password Changed Successfully',{variant:'success'});
    }catch(e){
      console.error(e);
      setErrorText('password is incorrect')
    }
    setFormState({
      newPassword:'',
      oldPassword:'',
    })
    setConfirmPass('')
    
  }

  const [confirmPass, setConfirmPass] = React.useState('')
  


  function matchPassword(){
    if(formState.newPassword && confirmPass){
      if(formState.newPassword !== confirmPass){
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
          Password is not matching
        </FormHelperText>
      )
    }}
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


    return(
        <Grid
            item
            sm={10}
            xs={10}
            sx={{
                width: '100vw',
                height: '100vh',
                display: "flex",
                flexDirection:'column',
                marginTop: '10%',
                marginLeft: '10%'
            }}>

            {loginError()}
            {matchPassword()}

            <Typography
                    variant="h3"
                    sx={{
                    fontFamily: "Baskervville",
                    textAlign: "center",
                    }}>
                    Change Password
            </Typography>
            
            <FormControl variant="standard" >
                <TextField
                margin="normal"
                required
                variant="standard"
                 name="oldPassword"
                value={formState.oldPassword}
                onChange={handleChange}
                label="Current Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                // autoComplete="current-password"
                sx={{ maxWidth:'30%', marginX:'40%', marginY:'1%' }}
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
          </FormControl>

          <FormControl variant="standard" >
                <TextField
                margin="normal"
                required
                variant="standard"
                name="password"
                label="New Password"
                value={confirmPass}
                
                onChange = {(event) => {setConfirmPass(event.target.value)}}
                type={showPassword ? 'text' : 'password'}
                id="password"
                // autoComplete="current-password"
                sx={{ maxWidth:'30%', marginX:'40%', marginY:'1%' }}
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
          </FormControl>

          <FormControl variant="standard" >
                <TextField
                margin="normal"
                required
                variant="standard"
                name="newPassword"
                value={formState.newPassword}
                onChange={handleChange}
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                
                
                id="password"
                // autoComplete="current-password"
                sx={{ maxWidth:'30%', marginX:'40%', marginY:'1%' }}
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
          </FormControl>

          

          <FormControl variant="standard" sx={{maxWidth: '20%', marginX:'40%',marginY:'1%'  }}>
            <Button
                type="submit"
                variant="contained"
                sx={{
                    fontSize: "20px",
                    bgcolor: "primary.main",
                    color: "primary.light",
                    borderRadius: "10px",
                }}
                onClick={handleFormSubmit}
                // onClick={handleClick}
                >
                
              Save
            </Button>
      
          </FormControl>



          <Typography
            variant="p"
            component="div"
            sx={{
              color: "primary",
              textAlign: "center",
              fontSize: "13px",
              position: 'fixed',
              bottom: '5px',
              width: '80%'
            }}>
            Iruna Digital Inc 2022 - V2.0
          </Typography>

        </Grid>
    )
}
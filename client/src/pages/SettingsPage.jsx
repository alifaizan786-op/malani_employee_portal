//From React
import * as React from "react";

import {
    Button,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Grid,
    FormControl
} from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function SettingsPage () {

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                name="password"
                label="Current Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
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
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
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
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
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
                }}>
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
              position: 'absolute',
              bottom: '5px',
              width: '80%'
            }}>
            Iruna Digital Inc 2022 - V1.0
          </Typography>

        </Grid>
    )
}
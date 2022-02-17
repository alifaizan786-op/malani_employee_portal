//From React
import * as React from 'react'

//From Material UI
import {Avatar, Button, Typography, Container, CssBaseline, Box, TextField} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


export default function LoginForm () {
    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1, mb: 5 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant='filled'
                        //color='secondary.main'
                        sx={{backgroundColor:'rgba(255,255,255,0.2)', }}
                        id="employeeId"
                        label="Employee Id"
                        name="employeeId"
                        autoComplete="employeeId"
                        autoFocus
                        sx={{bgcolor: "primary.light"}}
                        //value={formState.email}
                        //onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant='filled'
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        sx={{bgcolor: "primary.light"}}
                        //value={formState.password}
                        //onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, bgcolor: "secondary.main" }}
                        //onClick={handleFormSubmit}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}
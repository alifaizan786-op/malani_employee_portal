import React from "react";

import Welcome from "../components/Welcome";
import Quote from "../components/Quote";

import { Divider, Grid, Typography } from "@mui/material";

export default function Home(props) {
  
  return (
    <Grid item sm={10} xs={10} margin={"200px"}>
      <Welcome 
      firstName={props.firstName}
      lastName={props.lastName}
      department={props.department}/> 
      <Divider sx={{ width: "50%", margin: "auto", borderBottomWidth: 3 }} />
      <Quote 
      level={props.level}/>
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
        Iruna Digital Inc 2022 - V1.0
      </Typography>
    </Grid>
  );
}

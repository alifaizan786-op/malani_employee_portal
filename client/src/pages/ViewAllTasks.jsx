import React from "react";

import TaskCard from "../components/TaskCard";

import { Divider, Grid } from "@mui/material";

export default function ViewAllTasks(){
    return(
    <Grid item sm={10} xs={10} sx={{marginTop: '100px',marginLeft: '250px', display: 'flex', flexFlow:'wrap'}}>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
    </Grid>
    )
}
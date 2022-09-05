import React from "react";

import { Divider, Grid, Typography } from "@mui/material";

import { useQuery } from "@apollo/client";
import { QUERY_SCHED_BY_UID } from "../utils/queries";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import ViewScheduleEmp from "../components/ViewScheduleEmp";

import ViewScheduleMan from "../components/ViewScheduleMan";

export default function SchedulePage(props) {
  console.log(props.level);
  return (
    <Grid item sm={10} xs={10} margin={"100px 150px 200px 200px"}>
      <Typography
        variant="h3"
        color={"primary.main"}
        textAlign={"center"}
        sx={{ fontFamily: "Baskervville", marginBottom: "15px" }}
      >
        Schedule
      </Typography>
      {/*  */}
      {props.level === 1 ? (
        <ViewScheduleEmp _id={props._id}/>
      ):(
        <ViewScheduleMan _id={props._id}/>
      )}
      <Typography
        variant="p"
        component="div"
        sx={{
          color: "primary",
          textAlign: "center",
          fontSize: "13px",
          position: "fixed",
          bottom: "5px",
          width: "80%",
        }}
      >
        Iruna Digital Inc 2022 - V2.0
      </Typography>
    </Grid>
  );
}

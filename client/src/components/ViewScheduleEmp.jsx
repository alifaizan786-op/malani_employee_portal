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


export default function ViewScheduleEmp(props) {
  const { loading, data } = useQuery(QUERY_SCHED_BY_UID, {
    variables: { emp: props._id },
  });

  const schedule = data?.scheduleByUid.schedule || [];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Day Of The Week</TableCell>
              <TableCell align="center">Scheduled</TableCell>
              <TableCell align="center">Time-In</TableCell>
              <TableCell align="center">Time-Off</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((day) => (
              <TableRow
                key={day._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {capitalizeFirstLetter(day.dayOfWeek)}
                </TableCell>
                <TableCell align="center">
                  {day.isPresent ? "Yes" : "No"}
                </TableCell>
                <TableCell align="center">{day.timeIn}</TableCell>
                <TableCell align="center">{day.timeOff}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

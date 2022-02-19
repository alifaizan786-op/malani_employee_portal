import React from "react";

import {
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
  Divider,
  Card,
} from "@mui/material";

const dateFormat = require("../utils/dateFormat");

export default function TaskCard(props) {
  function borderColorCheck() {
    if (props.status.toLowerCase() === "submitted") {
      let style = {
        boxShadow: "0px 0px 10px #00BC5E",
        minWidth: "300px",
        maxWidth: "300px",
        margin: "25px",
      };
      return style;
    } else if (props.status.toLowerCase() === "pending") {
      let style = {
        boxShadow: "0px 0px 10px #E8FF00",
        minWidth: "300px",
        maxWidth: "300px",
        margin: "25px",
      };
      return style;
    } else {
      let style = {
        boxShadow: "0px 0px 10px #BC0000",
        minWidth: "300px",
        maxWidth: "300px",
        margin: "25px",
      };
      return style;
    }
  }

  return (
    <Card sx={borderColorCheck()}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Baskervville",
          textAlign: "center",
          marginY: "5px",
        }}>
        {props.status}
      </Typography>
      <Divider
        sx={{
          width: "50%",
          margin: "auto",
          borderBottomWidth: 3,
          marginY: "5px",
        }}
      />
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Baskervville",
          textAlign: "center",
          marginY: "5px",
        }}>
        {props.firstName} {props.lastName}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Baskervville",
          textAlign: "center",
          marginY: "5px",
        }}>
        {props.title}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Baskervville",
          textAlign: "center",
          marginY: "5px",
        }}>
        {props.dueDate}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Baskervville",
          textAlign: "center",
          marginY: "5px",
          marginX: "15px",
        }}>
        {props.desc}
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          fontSize: "20px",
          bgcolor: "primary.main",
          color: "primary.light",
          borderRadius: "10px",
        }}>
        Change Status
      </Button>
    </Card>
  );
}

import React from "react";

import { Typography, Button } from "@mui/material";

export default function Quote() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        color={"primary.main"}
        textAlign={"center"}
        sx={{ fontFamily: "Baskervville", marginTop: "30px" }}
      >
        Quote Of The Day
      </Typography>
      <Typography
        variant="h3"
        color={"primary.main"}
        textAlign={"center"}
        sx={{
          fontFamily: "Baskervville",
          marginTop: "15px",
          marginBottom: "30px",
        }}
      >
        May your path be lit by,
        <br />
        the bridges you burned
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          fontSize: "20px",
          bgcolor: "primary.main",
          color: "primary.light",
          width: "15%",
          borderRadius: "10px",
        }}
      >
        Change Quote
      </Button>
    </div>
  );
}

import React from "react";

import { Typography, Divider } from "@mui/material";

export default function Welcome() {
  return (
    <>
      <Typography
        variant="h3"
        color={"primary.main"}
        textAlign={"center"}
        sx={{ fontFamily: "Baskervville", marginBottom: "15px" }}
      >
        Welcome Back !
      </Typography>
      <Typography
        variant="h1"
        color={"primary.main"}
        textAlign={"center"}
        sx={{ fontFamily: "Baskervville", marginBottom: "15px" }}
      >
        Uzair Malani
      </Typography>
      <Typography
        variant="h4"
        color={"primary.main"}
        textAlign={"center"}
        sx={{ fontFamily: "Baskervville", marginBottom: "15px" }}
      >
        Malani Jewelers Inc - Atlanta
      </Typography>
      <Typography
        variant="h4"
        color={"primary.main"}
        textAlign={"center"}
        sx={{ fontFamily: "Baskervville", marginBottom: "30px" }}
      >
        Department : Executive
      </Typography>
    </>
  );
}

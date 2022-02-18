import React from "react";

import Welcome from "../components/Welcome";
import Quote from "../components/Quote";

import { Divider, Grid } from "@mui/material";

export default function Home() {
  return (
    <Grid item sm={10} xs={10} margin={"200px"}>
      <Welcome />
      <Divider sx={{ width: "50%", margin: "auto", borderBottomWidth: 3 }} />
      <Quote />
    </Grid>
  );
}

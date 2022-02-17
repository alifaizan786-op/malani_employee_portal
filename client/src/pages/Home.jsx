//From React
import * as React from "react";

import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";
import Welcome from "../components/Welcome";
import Quote from "../components/Quote";

//From Material UI
import { Grid, Divider } from "@mui/material";

export default function Home() {
  const [draweropen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <Grid container>
      <Header
        open={handleDrawerOpen}
        close={handleDrawerClose}
        current={draweropen}
      />
      <Grid item sm={2} xs={2}>
        <LeftSideBar
          open={handleDrawerOpen}
          close={handleDrawerClose}
          current={draweropen}
        />
      </Grid>
      <Grid  item sm={10} xs={10} margin={"200px"}>
        <Welcome />
        <Divider sx={{width:'50%', margin:'auto', borderBottomWidth: 3}} />
        <Quote/>
      </Grid>
    </Grid>
  );
}

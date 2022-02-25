//From React
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";

import Home from "./Home";
import ViewAllTasks from "./ViewAllTasks";
import ViewAllEmps from "./ViewAllEmps";
import SettingsPage from "./SettingsPage";

//From Material UI
import { Grid, Divider } from "@mui/material";

export default function Main() {
  const [draweropen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <Router>
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
      </Grid>
      <Route exact path={"/"}>
        <Home />
      </Route>
      <Route exact path={"/ViewAllTasks"}>
        <ViewAllTasks />
      </Route>
      <Route exact path={"/ViewAllEmps"}>
        <ViewAllEmps />
      </Route>
      <Route exact path={"/Settings"}>
        <SettingsPage />
      </Route>
    </Router>
  );
}

//From React
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";
import Home from "./Home";
import ViewAllTasks from "./ViewAllTasks";
import ViewAllEmps from "./ViewAllEmps";
import SettingsPage from "./SettingsPage";
import Bulletin from "./Bulletin";


import { useQuery } from '@apollo/client';
import { QUERY_MAIN } from '../utils/queries';

//From Material UI
import { Grid } from "@mui/material";

export default function Main() {
  const [draweropen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const { data } = useQuery(QUERY_MAIN,{pollInterval: 500,})


  const user = data?.userId || [];
  const firstName = user.firstName || ""
  const lastName = user.lastName || ""
  const employeeId = user.employeeId || ""
  const department = user.department || ""
  const level = user.level || ""
  const _id = user._id || ""


  
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
            firstName={firstName}
            lastName={lastName}
            level={level}
            employeeId ={employeeId}
          />
        </Grid>
      </Grid>
      <Route exact path={"/"}>
        <Home 
           firstName={firstName}
           lastName={lastName}
           department={department}
           level={level}
           />
      </Route>
      <Route exact path={"/ViewAllTasks"}>
        <ViewAllTasks
        level={level}
        employeeId ={employeeId}
        current={draweropen}
         />
      </Route>
      <Route exact path={"/ViewAllEmps"}>
        <ViewAllEmps
        level={level}
        _id={_id}
        />
      </Route>
      <Route exact path={"/Settings"}>
        <SettingsPage _id={_id}/>
      </Route>
      <Route exact path={"/Announcement"}>
        <Bulletin _id={_id} level={level}/>
      </Route>
    </Router>
  );
}

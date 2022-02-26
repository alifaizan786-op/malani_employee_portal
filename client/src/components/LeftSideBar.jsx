//From React
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from '../utils/auth';

//From MUI
import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Avatar,
  Typography,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import { Logout } from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';

const useStyles = makeStyles((theme) => ({
  sidebarPadding: {
    paddingTop: "100px",
  },
  root: {
    "& .MuiPaper-root": {
      display: "flex",
      backgroundColor: "rgba(255,255,255,0.7)",
      justifyContent: "space-between",
    },
  },
}));

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,

  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

export default function LeftSideBar(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const classes = useStyles();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{ border: "none" }}
        open={props.current}
        className={classes.root}>
        <List className={classes.sidebarPadding}>
          <ListItem>
            {props.current ? (
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  fontSize: "75px",
                  marginLeft: "47px",
                  bgcolor: "#ffffff",
                  border: "5px solid #D2AB67",
                  fontFamily: "Baskervville",
                  color: "primary.main",
                }}>
                {props.firstName[0]}{props.lastName[0]}
              </Avatar>
            ) : (
              <ListItemIcon>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    fontSize: "20px",
                    marginLeft: "-6px",
                    bgcolor: "#ffffff",
                    border: "3px solid #D2AB67",
                    fontFamily: "Baskervville",
                    color: "primary.main",
                  }}>
                  {props.firstName[0]}{props.lastName[0]}
                </Avatar>
              </ListItemIcon>
            )}
          </ListItem>

          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  style={{ fontSize: "25px", fontFamily: "Baskervville" }}>
                 {props.firstName} {props.lastName}
                </Typography>
              } 
            />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => {
              handleListItemClick(event, 1);
              window.location.assign("/ViewAllTasks");
            }}>
            <ListItemIcon>
              <AssignmentIcon
                sx={{ fontSize: "2.5rem", color: "primary.main" }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Baskervville",
                  }}>
                  View All Tasks
                </Typography>
              }
            />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => {
              handleListItemClick(event, 2);
              window.location.assign("/ViewAllEmps");
            }}>
            <ListItemIcon>
              <PeopleIcon sx={{ fontSize: "2.5rem", color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Baskervville",
                  }}>
                  View All Employees
                </Typography>
              }
            />
          </ListItemButton>
        </List>

        <List>
        <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => {
              handleListItemClick(event, 3);
              window.location.assign("/Settings");
            }}>
            <ListItemIcon>
              <SettingsIcon sx={{ fontSize: "2.5rem", color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Baskervville",
                  }}>
                  Settings
                </Typography>
              }
            />
          </ListItemButton>


          <ListItemButton onClick={Auth.logout}>
            <ListItemIcon>
              <Logout sx={{ fontSize: "2.5rem", color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Baskervville",
                  }}>
                  Logout
                </Typography>
              }
            />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}

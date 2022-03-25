//From React
import React from "react";
import Auth from '../utils/auth';


//From MUI
import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Avatar,
  Typography,
} from "@mui/material";
import TaskIcon from '@mui/icons-material/Task';
import PeopleIcon from "@mui/icons-material/People";
import { Logout } from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';
import NewspaperIcon from '@mui/icons-material/Newspaper';

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

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
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



  function initial(){
    if(props.employeeId){
      return  props.employeeId.split('-')[1].toUpperCase()
    }
  }


  function checkLevel(){
    if(props.level === 2){
     return(
      <HtmlTooltip
      placement="right"
      title={
        <React.Fragment>
          <Typography color="inherit">View All Employees</Typography>
        </React.Fragment>
      }
    >
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
          </HtmlTooltip>
     )
    }
  }

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
                {initial()}
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
                  {initial()}
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

          <HtmlTooltip
              placement="right"
              title={
                <React.Fragment>
                  <Typography color="inherit">View All Tasks</Typography>
                </React.Fragment>
              }
            >

          <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => {
                handleListItemClick(event, 1);
                window.location.assign("/ViewAllTasks");
              }}>
              <ListItemIcon>
                <TaskIcon
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

            </HtmlTooltip>

            <HtmlTooltip
              placement="right"
              title={
                <React.Fragment>
                  <Typography color="inherit">Announcement</Typography>
                </React.Fragment>
              }
            >  

          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => {
              handleListItemClick(event, 1);
              window.location.assign("/Announcement");
            }}>
            <ListItemIcon>
              <NewspaperIcon
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
                  Announcement
                </Typography>
              }
            />
          </ListItemButton>
          </HtmlTooltip>
              {checkLevel()}  
        
        </List>
              
        <List>
        <HtmlTooltip
      placement="right"
      title={
        <React.Fragment>
          <Typography color="inherit">Settings</Typography>
        </React.Fragment>
      }
    >
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
          </HtmlTooltip>

          <HtmlTooltip
      placement="right"
      title={
        <React.Fragment>
          <Typography color="inherit">Logout</Typography>
        </React.Fragment>
      }
    >
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
          </HtmlTooltip>
        </List>
      </Drawer>
    </>
  );
}

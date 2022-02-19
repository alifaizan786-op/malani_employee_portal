//From React
import React, { useState } from "react";
import { Link } from "react-router-dom";

//From MUI
import { alpha, makeStyles } from "@material-ui/core";
import { Button, Grid, AppBar, Avatar, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

//From Assets
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  appbar: {
    zIndex: 1300,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    background: "#008080",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Baskervville",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "left",
    },
  },
  search: {
    margin: "10px 0px 0px 0px",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: 20,

    display: (props) => (props.open ? "flex" : "none"),
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(1),
  },
  searchButton: {
    padding: 10,
    marginRight: theme.spacing(2),
  },
  icons: {
    margin: "5px 10px 0px 0px",
    justifyContent: "right",
    display: (props) => (props.open ? "none" : "flex"),
  },
  MenuIcon: {
    margin: 15,
    color: "#ffffff",
  },
  logoLg: {
    display: "flex",
    justifyContent: "center",
    margin: 5,
    fontWeight: "bolder",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoSm: {
    alignitems: "center",
    justifyContent: "center",
    margin: "5px 5px 0px 0px",
    marginbottom: 0,
    fontWeight: "bolder",
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default function Header(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles({ open });

  return (
    <AppBar position="fixed" className={classes.appbar}>
      <Grid container spacing={3}>
        <Grid item xs={2} sm={3} md={3}>
          {props.current ? (
            <Button className={classes.MenuIcon} onClick={props.close}>
              <ChevronLeftIcon sx={{ fontSize: "2rem" }} />
            </Button>
          ) : (
            <Button className={classes.MenuIcon} onClick={props.open}>
              <ChevronRightIcon sx={{ fontSize: "2rem" }} />
            </Button>
          )}
        </Grid>
        <Grid item xs={4} sm={6} md={6} className={classes.logo}>
          <Link to={"/Home"}>
            <Typography variant="h4" sx={{ fontFamily: "Baskervville" }}>
              Malani Jewelers Inc
            </Typography>
          </Link>
          <Link to={"/Home"}>
            <Avatar
              alt="Remy Sharp"
              src={logo}
              sx={{ width: 65, height: 65, margin: "5px 15px 5px 15px" }}
            />
          </Link>
          <Link to={"/Home"}>
            <Typography variant="h4" sx={{ fontFamily: "Baskervville" }}>
              Employee Portal
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={5.9} sm={3} md={3}></Grid>
      </Grid>
    </AppBar>
  );
}

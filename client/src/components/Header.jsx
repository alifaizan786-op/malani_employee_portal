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
  logoLg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Baskervville",
    [theme.breakpoints.down("md")]: {
      display:'none'
    },
  },
  logoSm: {
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Baskervville",
    [theme.breakpoints.down("md")]: {
      display:'flex'
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

        <Grid item xs={4} sm={6} md={6} className={classes.logoLg}>
          <Link to={"/"}>
            <Typography variant="h4" sx={{ fontFamily: "Baskervville" }}>
              Malani Jewelers Inc
            </Typography>
          </Link>
          <Link to={"/"}>
            <Avatar
              alt="Remy Sharp"
              src={logo}
              sx={{ width: 65, height: 65, margin: "5px 15px 5px 15px" }}
            />
          </Link>
          <Link to={"/"}>
            <Typography variant="h4" sx={{ fontFamily: "Baskervville" }}>
              Employee Portal
            </Typography>
          </Link>
        </Grid>

        <Grid item xs={4} sm={6} md={6} className={classes.logoSm}>
          <Link to={"/"}>
            <Typography variant="h6" sx={{ fontFamily: "Baskervville" }}>
              Malani Jewelers Inc
            </Typography>
          </Link>
          <Link to={"/"}>
            <Avatar
              alt="Remy Sharp"
              src={logo}
              sx={{ width: 45, height: 45, margin: "5px 15px 5px 15px" }}
            />
          </Link>
          <Link to={"/"}>
            <Typography variant="h6" sx={{ fontFamily: "Baskervville" }}>
              Employee Portal
            </Typography>
          </Link>
        </Grid>




        <Grid item xs={0} sm={0} md={0} lg={0}></Grid>
      </Grid>
    </AppBar>
  );
}

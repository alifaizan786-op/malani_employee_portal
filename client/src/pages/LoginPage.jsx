//From React
import * as React from "react";

//From Material UI
import { Grid, Typography, Divider, Avatar } from "@mui/material";
import { makeStyles } from "@material-ui/core";

//From Assets
import logo from "../assets/logo.png";

//From Components
import LoginForm from "../components/LoginForm";

const useStyles = makeStyles((theme) => ({
  parent: {
    backgroundColor: "#0D0039",
    height: "100vh",
  },
  childrenLeft: {
    textAlign: "center",
    color: "white",
    width: "40%",
    display: "block",
    margin: "auto",
  },
  childrenCenter: {
    height: "100vh",
  },
  childrenRight: {
    textAlign: "center",
    color: "white",
    width: "40%",
    display: "block",
    margin: "auto",
  },
}));

const style = {
  height: "85%",
  maxHeight: "32%",
  bgcolor: "background.paper",
  maxWidth: "1px",
  margin: "6% 49%",
};

export default function LoginPage() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles({ open });

  return (
    <div className={classes.parent}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch">
        {/* Left */}
        <Grid
          item
          xs="auto"
          sx={{ margin: "auto" }}
          className={classes.childrenLeft}>
          <Typography variant="h1" component="div">
            Malani Jewelers Inc
          </Typography>
          <Typography variant="h1" component="div">
            Employee Portal
          </Typography>
        </Grid>

        {/* Center */}
        <Grid
          item
          xs="auto"
          sx={{ margin: "auto" }}
          className={classes.childrenCenter}>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={style}
          />
          <Avatar src={logo} sx={{ width: 250, height: 250 }} />
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={style}
          />
          <Typography
            variant="p"
            component="div"
            sx={{
              color: "primary.light",
              textAlign: "center",
              fontSize: "13px",
            }}>
            Iruna Digital Inc 2022 - V2.0
          </Typography>
        </Grid>

        {/* Right */}
        <Grid
          item
          xs="auto"
          sx={{ margin: "auto" }}
          className={classes.childrenLeft}>
          <Typography variant="h2" component="div">
            Welcome Back !
          </Typography>
          <LoginForm />
        </Grid>
      </Grid>
    </div>
  );
}

import React from "react";

import EmployeeCard from "../components/EmployeeCard";
import CreateEmployee from "../components/CreateEmployee";

import {
  Typography,
  Grid,
  Button,
} from "@mui/material";


import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  minWidth: "50%",
  minHeight: "80%",
  borderRadius: "30px",
};



export default function ViewAllEmps() {;

  const [createEmp, setCreateEmp] = React.useState(false);

  const handlecreateEmpOpen = () => setCreateEmp(true);

  const handlecreateEmpClose = () => setCreateEmp(false);


  return (
    <Grid
      item
      sm={10}
      xs={10}
      sx={{
        marginTop: "100px",
        marginLeft: "250px",
        display: "flex",
        flexFlow: "wrap",
      }}>
      <EmployeeCard />
      <EmployeeCard />
      <EmployeeCard />
      <EmployeeCard />
      <EmployeeCard />
      <EmployeeCard />
      <EmployeeCard />
      <EmployeeCard />

      <Button
        type="submit"
        fullWidth
        onClick={handlecreateEmpOpen}
        variant="contained"
        endIcon={<AddIcon />}
        sx={{
          borderRadius: "25px",
          height: "40px",
          width: "250px",
          position: "fixed",
          bottom: "10px",
          right: "20px",
          fontSize: "18px",
          bgcolor: "primary.main",
          color: "primary.light",
          fontFamily: "Baskervville",
        }}>
        Create Employee
      </Button>

      <CreateEmployee  modalState={createEmp} modalClose={handlecreateEmpClose}/>

      <Typography
        variant="p"
        component="div"
        sx={{
          color: "primary",
          textAlign: "center",
          fontSize: "13px",
          position: 'absolute',
          bottom: '5px',
          width: '80%'
        }}>
        Iruna Digital Inc 2022 - V1.0
      </Typography>
    </Grid>
  );
}

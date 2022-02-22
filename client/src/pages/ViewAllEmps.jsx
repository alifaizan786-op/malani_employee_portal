import React from "react";

import EmployeeCard from "../components/EmployeeCard";

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



export default function ViewAllEmps() {
  const [createModal, setCreateModal] = React.useState(false);

  const handleCreateModalOpen = () => setCreateModal(true);

  const handleCreateModalClose = () => setCreateModal(false);

  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

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
        onClick={handleCreateModalOpen}
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
      <Typography
        variant="p"
        component="div"
        sx={{
          textAlign: "center",
          fontSize: "13px",
          width: "80vw",
          position: "fixed",
          bottom: "1px",
        }}>
        Iruna Digital Inc 2022 - V1.0
      </Typography>
    </Grid>
  );
}

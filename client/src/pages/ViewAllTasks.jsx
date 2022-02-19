import React from "react";

import TaskCard from "../components/TaskCard";

import {
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";

const dateFormat = require("../utils/dateFormat");

const tasks = [
  {
    _id: "620f39e1b109bd7aa0d1f80e",
    status: "overdue",
    title: "Deep Cleaning",
    description: "Clean All Shelves in Antiques Section",
    dueDate: "1408410714000",
    user: {
      _id: "620f39e0b109bd7aa0d1f7e2",
      firstName: "Alisha",
      lastName: "Alisha",
    },
  },
  {
    _id: "620f39e1b109bd7aa0d1f811",
    status: "overdue",
    title: "Deep Cleaning",
    description: "Clean All Shelves in Diamond Section",
    dueDate: "1408410714000",
    user: {
      _id: "620f39e0b109bd7aa0d1f7e3",
      firstName: "Janki",
      lastName: "Patel",
    },
  },
  {
    _id: "620f39e1b109bd7aa0d1f814",
    status: "pending",
    title: "Deep Cleaning",
    description: "Clean All Shelves in Kiosk Section",
    dueDate: "1408410714000",
    user: {
      _id: "620f39e0b109bd7aa0d1f7e4",
      firstName: "Mina",
      lastName: "Chauhan",
    },
  },
  {
    _id: "620f39e1b109bd7aa0d1f817",
    status: "submitted",
    title: "Deep Cleaning",
    description: "Clean All Shelves in Gold Section",
    dueDate: "1408410714000",
    user: {
      _id: "620f39e0b109bd7aa0d1f7e7",
      firstName: "Sushma",
      lastName: "Patel",
    },
  },
  {
    _id: "620f39e1b109bd7aa0d1f81a",
    status: "pending",
    title: "Deep Cleaning",
    description: "Clean All Shelves in Diamond Kiosk Section",
    dueDate: "1408410714000",
    user: {
      _id: "620f39e0b109bd7aa0d1f7e7",
      firstName: "Sushma",
      lastName: "Patel",
    },
  },
];

export default function ViewAllTasks() {
  const [status, setStatus] = React.useState("");
  const [employeeId, setEmployeeId] = React.useState("");

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeEmployeeId = (event) => {
    setEmployeeId(event.target.value);
  };

  function filters(id, status) {
    if (id && status) {
      const resultbyuid = tasks.filter((task) => task.user.firstName === id);
      const resultbystatus = resultbyuid.filter(
        (task) => task.status === status
      );
      return resultbystatus;
    } else if (status) {
      const resultbystatus = tasks.filter((task) => task.status === status);
      return resultbystatus;
    } else if (id) {
      const resultbyuid = tasks.filter((task) => task.user.firstName === id);
      return resultbyuid;
    } else {
      return tasks;
    }
  }

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
      <FormControl variant="standard" sx={{ m: 1, minWidth: "600px" }}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChangeStatus}>
          <MenuItem value={"pending"}>Pending</MenuItem>
          <MenuItem value={"overdue"}>Overdue</MenuItem>
          <MenuItem value={"submitted"}>Submitted</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: "600px" }}>
        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={employeeId}
          label="Status"
          onChange={handleChangeEmployeeId}>
          <MenuItem value={"Alisha"}>Alisha</MenuItem>
          <MenuItem value={"Janki"}>Janki</MenuItem>
          <MenuItem value={"Mina"}>Mina</MenuItem>
          <MenuItem value={"Sushma"}>Sushma</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: "100px" }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            fontSize: "20px",
            bgcolor: "primary.main",
            color: "primary.light",
            borderRadius: "10px",
          }}
          onClick={() => {
            setStatus("");
            setEmployeeId("");
          }}>
          Clear
        </Button>
      </FormControl>

      {filters(employeeId, status).map((tasksobj, index) => (
        <TaskCard
          key={tasksobj._id}
          status={tasksobj.status}
          tilte={tasksobj.title}
          desc={tasksobj.description}
          dueDate={tasksobj.dueDate}
          firstName={tasksobj.user.firstName}
          lastName={tasksobj.user.lastName}
        />
      ))}
    </Grid>
  );
}

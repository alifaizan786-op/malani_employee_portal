import React from "react";

import TaskCard from "../components/TaskCard";

import {
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
  Divider,
  Card,
  Modal,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  TextField,
  Switch
  
} from "@mui/material";

import {
  DateTimePicker,
  LocalizationProvider,
} from '@mui/lab';

import AdapterDateFns from '@mui/lab/AdapterDateFns';

import AddIcon from '@mui/icons-material/Add';

const dateFormat = require("../utils/dateFormat");

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 5,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  minWidth: '50%',
  minHeight: '80%',
  borderRadius: '30px'
};

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const tasks = [
  {
    _id: "62108a2d712b0c6b48374c38",
    status: "submitted",
    title: "Deep Cleaning",
    description: "Clean All Shelves in Antiques Section",
    user: {
      _id: "62108a2d712b0c6b48374c0c",
      firstName: "Alisha",
      lastName: "Alisha",
      employeeId: "Alisha-AP"
    },
    dueDate: "1645171914000"
  },
  {
    _id: "62108a2d712b0c6b48374c3b",
    status: "overdue",
    title: "Deep Cleaning",
    description: "Clean All Shelves in Diamond Section",
    user: {
      _id: "62108a2d712b0c6b48374c0d",
      firstName: "Janki",
      lastName: "Patel",
      employeeId: "Janki-JP"
    },
    dueDate: "1645171914000"
  },
  {
    _id: "62108a2d712b0c6b48374c3e",
    status: "pending",
    title: "Deep Cleaning",
    description: "Clean All Shelves in Kiosk Section",
    user: {
      _id: "62108a2d712b0c6b48374c0e",
      firstName: "Mina",
      lastName: "Chauhan",
      employeeId: "Mina-MC"
    },
    dueDate: "1645171914000"
  },
  {
    _id: "62108a2d712b0c6b48374c41",
    status: "submitted",
    title: "Deep Cleaning",
    description: "Clean All Shelves in Gold Section",
    user: {
      _id: "62108a2d712b0c6b48374c10",
      firstName: "Heena",
      lastName: "Heena",
      employeeId: "Heena-HD"
    },
    dueDate: "1645171914000"
  },
  {
    _id: "62108a2d712b0c6b48374c44",
    status: "overdue",
    title: "Deep Cleaning",
    description: "Clean All Shelves in Diamond Kiosk Section",
    user: {
      _id: "62108a2d712b0c6b48374c11",
      firstName: "Sushma",
      lastName: "Patel",
      employeeId: "Sushma-SP"
    },
    dueDate: "1645171914000"
  }
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


  const [createModal, setCreateModal ] = React.useState(false);

  const handleCreateModalOpen = () => setCreateModal(true)

  const handleCreateModalClose = () => setCreateModal(false)

  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

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
      <FormControl variant="standard" sx={{ m: 1, minWidth: "600px" }}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChangeStatus}>
          <MenuItem value={""}>Status</MenuItem>
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
          <MenuItem value={""}>Employee</MenuItem>
          <MenuItem value={"Alisha"}>Alisha</MenuItem>
          <MenuItem value={"Janki"}>Janki</MenuItem>
          <MenuItem value={"Mina"}>Mina</MenuItem>
          <MenuItem value={"Sushma"}>Sushma</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            fontSize: "20px",
            bgcolor: "primary.main",
            color: "primary.light",
            borderRadius: "10px",
            minWidth: '175px',
            maxHeight: '35px',
            borderRadius: '35px'
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
          taskId={tasksobj._id}
          status={tasksobj.status}
          title={tasksobj.title}
          desc={tasksobj.description}
          dueDate={tasksobj.dueDate}
          firstName={tasksobj.user.firstName}
          lastName={tasksobj.user.lastName}
          employeeId={tasksobj.user.employeeId}
        />
      ))}
      <Button type="submit" fullWidth
        onClick={handleCreateModalOpen}
        variant="contained" endIcon={<AddIcon />} sx={{
            borderRadius: '25px',
            height: '40px',
            width: '225px',
            position: 'fixed',
            bottom: '10px',
            right: '20px',
            fontSize: "20px",
            bgcolor: "primary.main",
            color: "primary.light",
          }}>
        Create Task
      </Button>
      <Modal
        open={createModal}
        onClose={handleCreateModalClose}>
          <Box sx={style}>

            <Typography variant="h3"
              sx={{
                fontFamily: "Baskervville",
                textAlign: "center",
                marginY: "5px",
              }}>
              Create & Assign Task
            </Typography>

            <FormControl variant="standard">
              <TextField
                label="Employee Id"
                id="outlined-size-medium"
                size="medium"
              />
              <FormHelperText id="component-helper-text">
                "Employee First Name" - "Employee Initials"
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth:'250px'}}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-size-medium"
                label="Status"
                size="medium"
                //onChange={handleChange}
              >
                <MenuItem value={"pending"}>Pending</MenuItem>
                <MenuItem value={"overdue"}>Overdue</MenuItem>
                <MenuItem value={"submitted"}>Submitted</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Due Date"
                  id="size-medium"
                  value={value}
                  onChange={handleChange}
                  size="medium"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>

            <FormControl variant="standard">
              <TextField
                label="Title"
                id="outlined-size-medium"
                size="medium"
              />
            </FormControl>

            <FormControl>
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                minRows={4}
              />
            </FormControl>

            <FormControl sx={{display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                              minWidth: '100%'
                              }}>
              <Typography variant="p"
              sx={{
                fontFamily: "Baskervville",
                textAlign: "center",
                fontSize:'25px'
              }}>
              Is This Task Recurring?
            </Typography>
              <Switch  size="large" {...label} defaultChecked />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                fontSize: "20px",
                bgcolor: "primary.main",
                color: "primary.light",
                borderRadius: "10px",
              }}>
              Save
            </Button>

          </Box>
      </Modal>
    </Grid>
  );
}

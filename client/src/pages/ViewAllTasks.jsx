import React from "react";

import TaskCard from "../components/TaskCard";
import { useQuery } from '@apollo/client';
import { QUERY_ALLTASKS} from '../utils/queries'
import {
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

import CircularProgress from '@mui/material/CircularProgress';

import CreateTask from "../components/CreateTask";


export default function ViewAllTasks(props) {


 
  const { loading , data } = useQuery(QUERY_ALLTASKS)


  const tasks = data?.tasks || [];

  const user = data?.userActive || [];
  document.title = "View All Tasks";


  const [createModal, setCreateModal ] = React.useState(false);

  const handleCreateModalOpen = () => setCreateModal(true)

  const handleCreateModalClose = () => setCreateModal(false)

  function filters(id, status) {
      if (id && status) {
      const resultbyuid = tasks.filter((task) => task.user.employeeId === id);
      const resultbystatus = resultbyuid.filter(
        (task) => task.status === status
      );
      return resultbystatus;
    } else if (status) {
      const resultbystatus = tasks.filter((task) => task.status === status);
      return resultbystatus;
    } else if (id) {
      const resultbyuid = tasks.filter((task) => task.user.employeeId === id);
      return resultbyuid;
    } else {
      return tasks;
    }
  }



  function taskButton(){
    if(props.level === 2){
        return(<Button type="submit" fullWidth
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
      </Button>)
    }
  }

  const [status, setStatus] = React.useState("");
  const [employeeId, setEmployeeId] = React.useState("");

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeEmployeeId = (event) => {
    setEmployeeId(event.target.value);
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
      <FormControl variant="standard" sx={{ m: 1, minWidth: "40%" }}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChangeStatus}
          >
          <MenuItem value={''}>Status</MenuItem>
          <MenuItem value={'pending'}>Pending</MenuItem>
          <MenuItem value={'overdue'}>Overdue</MenuItem>
          <MenuItem value={'submitted'}>Submitted</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: "40%" }}>
        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={employeeId}
          label="Status"
          onChange={handleChangeEmployeeId}>
          {user.map((employee, index )=>(
          <MenuItem key={employee._id} value ={`${employee.employeeId}`}>{employee.employeeId}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, width:'10%' }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            fontSize: "20px",
            bgcolor: "primary.main",
            color: "primary.light",
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

      {loading ? (
         <CircularProgress />
      ) : (
        filters(employeeId, status).map((tasksobj, index) => (
          <TaskCard
            key={tasksobj._id}
            taskId={tasksobj._id}
            status={tasksobj.status}
            desc={tasksobj.description}
            dueDate={tasksobj.dueDate}
            firstName={tasksobj.user.firstName}
            lastName={tasksobj.user.lastName}
            employeeId={tasksobj.user.employeeId}
          />
        ))
      )}

    
          {taskButton()}
      <CreateTask
       modalState={createModal} 
       closeModal={handleCreateModalClose} 
       user={user}/>


      <Typography
        variant="p"
        component="div"
        sx={{
          color: "primary",
          textAlign: "center",
          fontSize: "13px",
          position: 'fixed',
          bottom: '5px',
          width: '80%'
        }}>
        Iruna Digital Inc 2022 - V1.0
      </Typography>
    </Grid>
  );
}

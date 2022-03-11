import React from "react";

import { useQuery } from '@apollo/client';
import { QUERY_ALLTASKS} from '../utils/queries'
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  Modal,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  TextField,
  Switch,
  Grid
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import CreateTask from "../components/CreateTask";
import { styled, useTheme } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EditIcon from '@mui/icons-material/Edit';
import LinearProgress from '@mui/material/LinearProgress';
import {UPDATE_STATUS} from '../utils/mutation';
import {useMutation} from '@apollo/client';

import EditTaskModal from "../components/EditTaskModal";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import SubmitTask from "../components/SubmitTask";

import ClearIcon from '@mui/icons-material/Clear';

import { DatePicker, LocalizationProvider } from "@mui/lab";

import AdapterDateFns from "@mui/lab/AdapterDateFns";

const dateFormat = require('../utils/dateFormat');





export default function ViewAllTasks(props) {


 
  //   const [formState, setFormState] = React.useState({
  //     _id:'',
  //     status:'submitted'
  //     })
  
    
  //   const handleFormSubmit = async (event) => {
  //   event.preventDefault();
   
  //   try{
  //     const { data } = await updateStatus({
  //       variables: {...formState},

  //     });
  //   }catch(e){
  //     console.error(e);
  //   }
    
  //   console.log(formState);
  // }


  const { loading , data } = useQuery(QUERY_ALLTASKS,{pollInterval: 500,})

  const tasks = data?.tasks || [];

  const user = data?.userActive || [];

  document.title = "View All Tasks";

  const [createModal, setCreateModal ] = React.useState(false);

  const handleCreateModalOpen = () => setCreateModal(true)

  const handleCreateModalClose = () => setCreateModal(false)

  function dotColor(status){  //color or statusbar
    if (status.toLowerCase() === "submitted") {
      let style = {
        color : 'green'
      }
      return style;
    }else if (status.toLowerCase() === "pending"){
      let style = {
        color : 'yellow'
      }
      return style;
    }else{
      let style = {
        color : 'red'
      }
      return style;
    }
  }
  const [status, setStatus] = React.useState("");
  const [employeeId, setEmployeeId] = React.useState("");
  const [dueDate, setDueDate] = React.useState(null);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeEmployeeId = (event) => {
    setEmployeeId(event.target.value);
  };
  const handleChangeDueDate = (event) => {
    setDueDate(event.target.value);
  };

  

  const columns = checkLevelColumn();
   
  function CustomToolbar() { //CustomToolbar for manager & employee
    if(props.level === 2){
    return (
      <GridToolbarContainer sx={{justifyContent: 'space-between',padding: '0% 5%'}}>
        <FormControl sx={{ m: 1, minWidth: "20%" }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            variant="outlined"
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
          <FormControl sx={{ m: 1, minWidth: "20%" }}>
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
          <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ m: 1, minWidth: "20%" }}>
            <DatePicker
              label="Due Date"
              value={dueDate}
              clearable
              error={false}
              onChange={(newValue) => {
                setDueDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        <Button type="submit"
            onClick={() => {
              setStatus("");
              setEmployeeId("");
              setDueDate(null);
            }}
            variant="text" startIcon={<ClearIcon />} sx={{
                fontSize: "0.8125rem",
                bgcolor: "#ffffff",
                color: "primary.main",
              }}>
          Clear Filters
        </Button>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button type="submit"
          onClick={handleCreateModalOpen}
          variant="text" startIcon={<AddIcon />} sx={{
              fontSize: "0.8125rem",
              bgcolor: "#ffffff",
              color: "primary.main",
            }}>
        Create Task
      </Button>
      </GridToolbarContainer>
    )}else{
      return (
        <GridToolbarContainer sx={{justifyContent: 'space-between',padding: '0% 5%'}}>
        <FormControl sx={{ m: 1, minWidth: "20%" }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            variant="outlined"
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
          <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ m: 1, minWidth: "20%" }}>
            <DatePicker
              label="Due Date"
              value={dueDate}
              clearable
              error={false}
              onChange={(newValue) => {
                setDueDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        <Button type="submit"
            onClick={() => {
              setStatus("");
              setEmployeeId("");
              setDueDate(null);
            }}
            variant="text" startIcon={<ClearIcon />} sx={{
                fontSize: "0.8125rem",
                bgcolor: "#ffffff",
                color: "primary.main",
              }}>
          Clear Filters
        </Button>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
      )
    }
  }

  const rows = [...filters(employeeId, status, dueDate)];


  function filters(id, status, dueDate) { //Task Filter bar
      if (id && status && dueDate) {
        console.log(id + status + dueDate);
        const resultbyuid = tasks.filter((task) => task.user.employeeId === id);
        const resultbystatus = resultbyuid.filter((task) => task.status === status);
        const resultbyyear = resultbystatus.filter((task) => new Date(parseInt(task.dueDate)).getYear() === dueDate.getYear())
        const resultbymonth = resultbyyear.filter((task) => new Date(parseInt(task.dueDate)).getMonth() === dueDate.getMonth())
        const resultbydate = resultbymonth.filter((task) => new Date(parseInt(task.dueDate)).getDate() === dueDate.getDate())
        return resultbydate;
    } else if (status && dueDate) {
        const resultbystatus = tasks.filter((task) => task.status === status);
        const resultbyyear = resultbystatus.filter((task) => new Date(parseInt(task.dueDate)).getYear() === dueDate.getYear())
        const resultbymonth = resultbyyear.filter((task) => new Date(parseInt(task.dueDate)).getMonth() === dueDate.getMonth())
        const resultbydate = resultbymonth.filter((task) => new Date(parseInt(task.dueDate)).getDate() === dueDate.getDate())
        return resultbydate;
    } else if (status && id) {
        const resultbystatus = tasks.filter((task) => task.status === status);
        const resultbyuid = resultbystatus.filter((task) => task.user.employeeId === id);
        return resultbyuid;
    }else if (id && dueDate) {
        const resultbyuid = tasks.filter((task) => task.user.employeeId === id);
        const resultbyyear = resultbyuid.filter((task) => new Date(parseInt(task.dueDate)).getYear() === dueDate.getYear())
        const resultbymonth = resultbyyear.filter((task) => new Date(parseInt(task.dueDate)).getMonth() === dueDate.getMonth())
        const resultbydate = resultbymonth.filter((task) => new Date(parseInt(task.dueDate)).getDate() === dueDate.getDate())
        return resultbydate;
    }else if (id) {
        const resultbyuid = tasks.filter((task) => task.user.employeeId === id);
        return resultbyuid;
    }else if (status) {
        const rresultbystatus = tasks.filter((task) => task.status === status);
        return rresultbystatus;
    }else if (dueDate) {
        const resultbyyear = tasks.filter((task) => new Date(parseInt(task.dueDate)).getYear() === dueDate.getYear())
        const resultbymonth = resultbyyear.filter((task) => new Date(parseInt(task.dueDate)).getMonth() === dueDate.getMonth())
        const resultbydate = resultbymonth.filter((task) => new Date(parseInt(task.dueDate)).getDate() === dueDate.getDate())
        return resultbydate;
    } else {
        return tasks;
      }
    }


  
  React.useEffect(() => {
    if(props.level === 1){
      setEmployeeId(props.employeeId)
    }
  });
  

  function checkLevelColumn(){// check and show task according to manager & employee
    if(props.level === 1){
      let columns = [
        {
          field: "",
          renderCell: (params) => {
            return (
              <CircleIcon sx={dotColor(params.row.status)}/>
            );
          }, 
          width: 50 
        },
        { field: 'status', type:'singleSelect', valueOptions: ['Submitted', 'Pending', 'Over Due'], headerName: 'Status', width: 130 },
        { field: 'name', headerName: 'Name', width: 150, valueGetter: (params) => `${params.row.user.firstName} ${params.row.user.lastName}`},
        { field: 'dueDate',tpe:'dateTime', headerName: 'Due Date', width: 195, valueGetter: (params) => `${dateFormat(parseInt(params.row.dueDate))}`},
        { field: 'description', headerName: 'Description', width: 800 },
        {
          field: "Submit",
          renderCell: (params) => {
            if(params.row.status === "submitted"){
            return (
              <Button type="submit"
                  disabled
                  onClick={handleCreateModalOpen}
                  variant="text" startIcon={<ArrowUpwardIcon />} sx={{
                      fontSize: "0.8125rem",
                      bgcolor: "#ffffff",
                      color: "primary.main",
                    }}>
                Submit
              </Button>
            );}else{
              return (
                <SubmitTask _id={ params.row._id}/>
            );}
          }, 
          width: 150 
        },
      ];
      return columns
    }else{
      let columns = [
        {
          field: "",
          renderCell: (params) => {
            return (
              <CircleIcon sx={dotColor(params.row.status)}/>
            );
          }, 
          width: 50 
        },
        { field: 'status', type:'singleSelect', valueOptions: ['submitted', 'pending', 'overdue'], headerName: 'Status', width: 130 },
        { field: 'name', headerName: 'Name', width: 150, valueGetter: (params) => `${params.row.user.firstName} ${params.row.user.lastName}`},
        { field: 'dueDate',tpe:'dateTime', headerName: 'Due Date', width: 195, valueGetter: (params) => `${dateFormat(parseInt(params.row.dueDate))}`},
        { field: 'description', headerName: 'Description', width: 800 },
        {
          field: "Edit",
          renderCell: (params) => {
              return (
                <Button type="submit"
                  onClick={() => {handleEditModal(params.row._id)}}
                  variant="text" startIcon={<EditIcon />} sx={{
                      fontSize: "0.8125rem",
                      bgcolor: "#ffffff",
                      color: "primary.main",
                    }}>
                Edit
              </Button>
            );
          }, 
          width: 150 
        },
      ];
      return columns
    }
  }

  const [editData, setEditData] = React.useState({})

  function handleEditModal(params){
    const thisTask = tasks.filter(task => task._id === params)
    setEditData(thisTask)
    handleEditModalOpen()
  }

  const [editModal, setEditModal] = React.useState(false);

  const handleEditModalOpen = () => setEditModal(true);

  const handleEditModalClose = () => setEditModal(false);

  function gridStyling(){ //grid Styling
    if(props.current){
      let style=(theme) => ({
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,}),
          marginTop: "75px",
          marginLeft: "240px",
          display: "flex",
          flexFlow: "wrap"
      });
      return style
    } else {
      let style=(theme) => ({
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
          marginTop: "75px",
          marginLeft: "80px",
          display: "flex",
          flexFlow: "wrap"
      });
      return style
    }
  }

  function dataGridStyling(){ //data grid of task
    if(props.current){
      let style=(theme) => ({
        transition: theme.transitions.create('minWidth', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,}),
          height: '91.5vh', 
          minWidth: '87vw'
      });
      return style
    } else {
      let style=(theme) => ({
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        height: '91.5vh', 
        minWidth: '95.5vw'
      });
      return style
    }
  }


  
  return (
    <Grid
      item
      sm={10}
      xs={10}
      sx={gridStyling()}>

        <DataGrid
        rows={rows}
        columns={columns}
        sx={dataGridStyling()}
        components={{
          Toolbar: CustomToolbar,
          LoadingOverlay: LinearProgress,
        }}
        loading={loading}
        disableColumnMenu
        getRowId={row => row._id}
      />

      <CreateTask
       modalState={createModal} 
       closeModal={handleCreateModalClose} 
       user={user}/>

       <EditTaskModal current={editModal} open={handleEditModalOpen} close={handleEditModalClose} defData={editData}/>

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

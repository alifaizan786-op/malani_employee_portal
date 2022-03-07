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

import { styled, useTheme } from '@mui/material/styles';

import CircleIcon from '@mui/icons-material/Circle';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import EditIcon from '@mui/icons-material/Edit';

import LinearProgress from '@mui/material/LinearProgress';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

const dateFormat = require('../utils/dateFormat');




export default function ViewAllTasks(props) {

  const { loading , data } = useQuery(QUERY_ALLTASKS,{pollInterval: 500,})


  const tasks = data?.tasks || [];

  const user = data?.userActive || [];

  document.title = "View All Tasks";

  const [createModal, setCreateModal ] = React.useState(false);

  const handleCreateModalOpen = () => setCreateModal(true)

  const handleCreateModalClose = () => setCreateModal(false)

  function dotColor(status){
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


  const columns = checkLevelColumn();
  
  const rows = [...checkLevel()];
  
  function CustomToolbar() {
    if(props.level === 2){
    return (
      <GridToolbarContainer sx={{justifyContent: 'space-between',padding: '0% 10%'}}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
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
        <GridToolbarContainer sx={{justifyContent: 'space-between',padding: '0% 10%'}}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </GridToolbarContainer>
      )
    }
  }

  function checkLevel(){
    if(props.level === 1){
      const userTasks = tasks.filter(task => task.user.employeeId === props.employeeId)
      return userTasks
    }else{
      return tasks
    }
  }

  function checkLevelColumn(){
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
        { field: '_id', headerName: 'ID', width: 50 },
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'name', headerName: 'Name', width: 150, valueGetter: (params) => `${params.row.user.firstName} ${params.row.user.lastName}`},
        { field: 'dueDate', headerName: 'Due Date', width: 195, valueGetter: (params) => `${dateFormat(parseInt(params.row.dueDate))}`},
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
                <Button type="submit"
                  //onClick={handleCreateModalOpen}
                  variant="text" startIcon={<ArrowUpwardIcon />} sx={{
                      fontSize: "0.8125rem",
                      bgcolor: "#ffffff",
                      color: "primary.main",
                    }}>
                Submit
              </Button>
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
        { field: '_id', headerName: 'ID', width: 50 },
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'name', headerName: 'Name', width: 150, valueGetter: (params) => `${params.row.user.firstName} ${params.row.user.lastName}`},
        { field: 'dueDate', headerName: 'Due Date', width: 195, valueGetter: (params) => `${dateFormat(parseInt(params.row.dueDate))}`},
        { field: 'description', headerName: 'Description', width: 800 },
        {
          field: "Edit",
          renderCell: (params) => {
              return (
                <Button type="submit"
                  //onClick={handleCreateModalOpen}
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


  function gridStyling(){
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

  function dataGridStyling(){
    if(props.current){
      let style=(theme) => ({
        transition: theme.transitions.create('minWidth', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,}),
          height: '92vh', 
          minWidth: '85vw'
      });
      return style
    } else {
      let style=(theme) => ({
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        height: '92vh', 
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
        getRowId={row => row._id}
      />

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

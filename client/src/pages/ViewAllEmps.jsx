import React from "react";

import EmployeeCard from "../components/EmployeeCard";
import CreateEmployee from "../components/CreateEmployee";

import {
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

import { useQuery } from '@apollo/client';
import { QUERY_ALLEMPS } from '../utils/queries'


import AddIcon from "@mui/icons-material/Add";


export default function ViewAllEmps(props) {

  const [createEmp, setCreateEmp] = React.useState(false);

  const handlecreateEmpOpen = () => setCreateEmp(true);

  const handlecreateEmpClose = () => setCreateEmp(false);

  const {data, loading} = useQuery(QUERY_ALLEMPS,{pollInterval: 500,})

  const user = data?.users || [];

  document.title = "View All Employees";

  const [employeeId, setEmployeeId] = React.useState("");

  const handleChangeEmployeeId = (event) => {
    setEmployeeId(event.target.value);
  };

  function filters(id) {
    if(id){
      const resultByUId = user.filter((oneUser) => oneUser.employeeId === id)
      return resultByUId
    }else{
      return user
    } 
  }

  let dropdown = () => {
    let arrOfEmps = []
    for (let i = 0; i < user.length; i++){
      arrOfEmps.push(user[i].employeeId)
    }
    arrOfEmps.sort()
    return arrOfEmps
  }
  


  if(props.level === 2){
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

    <FormControl variant="standard" sx={{ m: 1, minWidth: "80%" }}>
        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={employeeId}
          label="Status"
          onChange={handleChangeEmployeeId}>
          {dropdown().map((employee, index )=>(
          <MenuItem key={index} value ={`${employee}`}>{employee}</MenuItem>
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
            setEmployeeId("");
          }}>
          Clear
        </Button>
      </FormControl>

      {filters(employeeId).map((userobj, index) => (
          <EmployeeCard 
          key={userobj._id}
          _id={userobj._id}
          department={userobj.department}
          firstName={userobj.firstName}
          lastName={userobj.lastName}
          employeeId={userobj.employeeId}
          active={userobj.active}
          level={userobj.level}
          managerId={props._id}
          taskStats={userobj.taskStats}
          />
      ))}
      
      
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
          position: 'fixed',
          bottom: '5px',
          width: '80%'
        }}>
        Iruna Digital Inc 2022 - V2.0
      </Typography>
    </Grid>
  )}else{
    return(
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
        <Typography
          variant="h1"
          component="div"
          sx={{
            color: "primary",
            textAlign: "center",
            marginLeft:"5vw",
            width: '80%'
          }}>
          Please Login With Credential with Level 2 or Higher
        </Typography>
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
          Iruna Digital Inc 2022 - V2.0
        </Typography>
      </Grid>
    )
  }
}
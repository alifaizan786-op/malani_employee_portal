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

  console.log(user);

  document.title = "View All Employees";

  const [employeeId, setEmployeeId] = React.useState("");
  const [empStatus, setEmpStatus] = React.useState("true");
  const [empLevel, setEmpLevel] = React.useState("1");
  const [filteredEmps, setFilteredEmps] = React.useState([])

  React.useEffect(()=>{
    setFilteredEmps(filters(employeeId, empStatus, empLevel))
  }, [user])



  const handleChangeEmployeeId = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleChangeEmpStatus = (event) => {
    setEmpStatus(event.target.value);
  };

  const handleChangeEmpLevel = (event) => {
    setEmpLevel(event.target.value);
  };

  function filters(id, active, level) {
    console.log(`--${id}--, --${active}--, --${level.toString()}--`);
      if(id && active && level){
        const resultByLevel = user.filter((oneUser) => oneUser.level.toString() === level)
        const resultByActive = resultByLevel.filter((oneUser) => oneUser.active === active)
        const resultByUId = resultByActive.filter((oneUser) => oneUser.employeeId === id)
        return resultByUId
      }else if (id && active){
        const resultByActive = user.filter((oneUser) => oneUser.active === active)
        const resultByUId = resultByActive.filter((oneUser) => oneUser.employeeId === id)
        return resultByUId
      }else if (id && level){
        const resultByLevel = user.filter((oneUser) => oneUser.level.toString() === level)
        const resultByUId = resultByLevel.filter((oneUser) => oneUser.employeeId === id)
        return resultByUId
      } else if (active && level){
        const resultByLevel = user.filter((oneUser) => oneUser.level.toString() === level)
        const resultByActive = resultByLevel.filter((oneUser) => oneUser.active === active)
        return resultByActive
      } else if(id){
        const resultByUId = user.filter((oneUser) => oneUser.employeeId === id)
        return resultByUId
      } else if(active){
        const resultByActive = user.filter((oneUser) => oneUser.active === active)
        return resultByActive
      } else if (level){
        const resultByLevel = user.filter((oneUser) => oneUser.level.toString() === level)
        return resultByLevel
      } else {
        return user
      }
  }

  console.log(filters(employeeId, empStatus, empLevel));

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

    <FormControl variant="standard" sx={{ m: 1, minWidth: "20%" }}>
        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={employeeId}
          label="Employee"
          onChange={handleChangeEmployeeId}>
          {dropdown().map((employee, index )=>(
          <MenuItem key={index} value ={`${employee}`}>{employee}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: "20%" }}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={empStatus}
          label="Status"
          onChange={handleChangeEmpStatus}>
          <MenuItem value="true">Active</MenuItem>
          <MenuItem value="false">In-Active</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: "20%" }}>
        <InputLabel id="demo-simple-select-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={empLevel}
          label="Level"
          onChange={handleChangeEmpLevel}>
          <MenuItem value='1'>Level 1</MenuItem>
          <MenuItem value='2'>Level 2</MenuItem>
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
            setFilteredEmps(filters())
          }}>
          Clear
        </Button>
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
            setFilteredEmps(filters(employeeId, empStatus, empLevel))
          }}>
          Submit
        </Button>
      </FormControl>

      {filteredEmps.length > 1 ? (
        filteredEmps.map((userobj, index) => (
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
          />
      ))

      ):(
        <div></div>
      )}
      
      
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
        Iruna Digital Inc 2022 - V1.0
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
          Iruna Digital Inc 2022 - V1.0
        </Typography>
      </Grid>
    )
  }
}

import React from "react";

import EmployeeCard from "../components/EmployeeCard";
import CreateEmployee from "../components/CreateEmployee";

import {
  Typography,
  Grid,
  Button,
} from "@mui/material";

import { useQuery } from '@apollo/client';
import { QUERY_ALLEMPS } from '../utils/queries'


import AddIcon from "@mui/icons-material/Add";


export default function ViewAllEmps(props) {;

  const [createEmp, setCreateEmp] = React.useState(false);

  const handlecreateEmpOpen = () => setCreateEmp(true);

  const handlecreateEmpClose = () => setCreateEmp(false);

  const {data, loading} = useQuery(QUERY_ALLEMPS)

  const user = data?.users || [];


  document.title = "View All Employees";

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

      {user.map((userobj, index) => (
          <EmployeeCard 
          key={userobj._id}
          _id={userobj._id}
          department={userobj.department}
          firstName={userobj.firstName}
          lastName={userobj.lastName}
          employeeId={userobj.employeeId}
          active={userobj.active}
          level={userobj.level}
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

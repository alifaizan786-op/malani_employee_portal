import React from "react";

import {
  Typography,
  Button,
  Avatar,
  Divider,
  Card,
} from "@mui/material";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import EmployeeModal from "./EmployeeModal";

import { useQuery } from '@apollo/client';
import { QUERY_TASKBYEMP } from '../utils/queries'

const divStyle = {
  display: "flex",
  justifyContent: "space-between",
  margin: "5px 30px",
};

const dividerStyle = {
  margin: "0px 30px 13px 30px",
};

export default function EmployeeCard(props) {
  const [viewModal, setViewModal] = React.useState(false);

  const handleViewModalOpen = () => setViewModal(true);

  const handleViewModalClose = () => setViewModal(false);

  const { loading, data } = useQuery(QUERY_TASKBYEMP, {
    // pass URL parameter
    variables: { emp: props._id },
  });

  const tasks = data?.taskByEmp || []

  const pending = tasks.filter((task)=> task.status === 'pending')
  const submitted = tasks.filter((task)=> task.status === 'submitted')
  const overdue = tasks.filter((task)=> task.status === 'overdue')  

  function initial(){
    if(props.employeeId){
      return  props.employeeId.split('-')[1].toUpperCase()
    }
  }


  return (
    <>
      <Card
        sx={{
          minHeight: "350px",
          minWidth: "325px",
          margin: "25px",
          boxShadow: "none",
          borderRight: "1px solid black",
        }}>
        <Button onClick={handleViewModalOpen}>
          <Avatar
            sx={{
              width: 50,
              height: 50,
              marginLeft: "250px",
              marginTop: "5px",
              bgcolor: "#ffffff",
              border: "3px solid #D2AB67",
              color: "primary.main",
            }}>
            <RemoveRedEyeIcon sx={{ fontSize: "2rem" }} />
          </Avatar>
        </Button>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            fontSize: "45px",
            bgcolor: "#ffffff",
            border: "3px solid #D2AB67",
            fontFamily: "Baskervville",
            color: "primary.main",
            margin: "auto",
          }}>
          {initial()}
        </Avatar>
        <div style={divStyle}>
          <Typography variant="p">Employee Id</Typography>
          <Typography variant="p">{props.employeeId}</Typography>
        </div>
        <Divider sx={dividerStyle} />
        <div style={divStyle}>
          <Typography variant="p">Tasks Completed</Typography>
          <Typography variant="p">{submitted.length}</Typography>
        </div>
        <Divider sx={dividerStyle} />
        <div style={divStyle}>
          <Typography variant="p">Tasks Pending</Typography>
          <Typography variant="p">{pending.length}</Typography>
        </div>
        <Divider sx={dividerStyle} />
        <div style={divStyle}>
          <Typography variant="p">Tasks Overdue</Typography>
          <Typography variant="p">{overdue.length}</Typography>
        </div>
        <Divider sx={dividerStyle} />
        <div style={divStyle}>
          <Typography variant="p">Tasks Completed YTD</Typography>
          <Typography variant="p">{tasks.length}</Typography>
        </div>
        <Divider sx={dividerStyle} />
      </Card>
      <EmployeeModal
        open={handleViewModalOpen}
        close={handleViewModalClose}
        state={viewModal}
        fName={props.firstName}
        lName={props.lastName}
        empId={props.employeeId}
        pending={pending.length}
        overdue={overdue.length}
        submitted={submitted.length}
        dept={props.department}
        active={props.active}
        yTD={tasks.length}
        _id={props._id}
        level={props.level}

      />
    </>
  );
}

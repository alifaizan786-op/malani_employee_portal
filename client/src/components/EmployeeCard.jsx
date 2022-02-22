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

  return (
    <>
      <Card
        sx={{
          minHeight: "350px",
          minWidth: "325px",
          margin: "25px",
          boxShadow: "none",
          borderRight: "1px solid black",
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
          UM
        </Avatar>
        <div style={divStyle}>
          <Typography variant="p">Employee Id</Typography>
          <Typography variant="p">Faizan-FA</Typography>
        </div>
        <Divider sx={dividerStyle} />
        <div style={divStyle}>
          <Typography variant="p">Tasks Completed</Typography>
          <Typography variant="p">10</Typography>
        </div>
        <Divider sx={dividerStyle} />
        <div style={divStyle}>
          <Typography variant="p">Tasks Pending</Typography>
          <Typography variant="p">5</Typography>
        </div>
        <Divider sx={dividerStyle} />
        <div style={divStyle}>
          <Typography variant="p">Tasks Overdue</Typography>
          <Typography variant="p">3</Typography>
        </div>
        <Divider sx={dividerStyle} />
        <div style={divStyle}>
          <Typography variant="p">Tasks Completed YTD</Typography>
          <Typography variant="p">2</Typography>
        </div>
        <Divider sx={dividerStyle} />
      </Card>
      <EmployeeModal
        open={handleViewModalOpen}
        close={handleViewModalClose}
        state={viewModal}
      />
    </>
  );
}

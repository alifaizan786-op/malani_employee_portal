import React from "react";

import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Modal,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import ReviewCard from "./ReviewCard";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import { UPDATE_USER } from "../utils/mutation";

import { useMutation } from "@apollo/client";

import Schedule from "./Schedule";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  minWidth: "50%",
  borderRadius: "30px",
};

const divStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};

const dividerStyle = {
  margin: "0px 10px 13px 10px",
};

export default function EmployeeModal(props) {
  const schedule = props?.schedule || [];

  const [updateUser, { error, data }] = useMutation(UPDATE_USER);

  const [formState, setFormState] = React.useState({
    _id: props._id,
    firstName: props.fName,
    lastName: props.lName,
    employeeId: props.empId,
    department: props.dept,
    level: props.level,
    active: props.active,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateUser({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }
    setFormState({
      _id: props._id,
      firstName: "",
      lastName: "",
      employeeId: "",
      department: "",
      level: "",
      active: "",
    });
    setEdit(false);
    window.location.assign("/ViewAllEmps");
  };
  const [edit, setEdit] = React.useState(false);

  const setEditTrue = () => {
    setEdit(true);
  };

  function initial() {
    if (props.empId) {
      return props.empId.split("-")[1].toUpperCase();
    }
  }

  function empStatus() {
    if (props.active === "true") {
      return "Yes";
    } else {
      return "No";
    }
  }

  return (
    <>
      <Modal open={props.state} onClose={props.close}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ width: "25%", display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: "45px",
                  bgcolor: "#ffffff",
                  border: "3px solid #D2AB67",
                  fontFamily: "Baskervville",
                  color: "primary.main",
                }}
              >
                {initial()}
              </Avatar>

              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Baskervville",
                  textAlign: "center",
                  marginX: "10px",
                }}
              >
                {props.fName} {props.lName}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "65%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "45%" }}>
                <Box sx={divStyle}>
                  <Typography variant="p">Employee Id</Typography>
                  {edit ? (
                    <TextField
                      sx={{
                        fontFamily: "Baskervville",
                        textAlign: "center",
                        marginX: "10px",
                        padding: "2.5px 14px",
                      }}
                      name="employeeId"
                      onChange={handleChange}
                      defaultValue={props.empId}
                      id="outlined-size-medium"
                      size="medium"
                    />
                  ) : (
                    <Typography variant="p">{props.empId}</Typography>
                  )}
                </Box>
                <Divider sx={dividerStyle} />
                <Box sx={divStyle}>
                  <Typography variant="p">First Name</Typography>
                  {edit ? (
                    <TextField
                      sx={{
                        fontFamily: "Baskervville",
                        textAlign: "center",
                        marginX: "10px",
                        padding: "2.5px 14px",
                      }}
                      name="firstName"
                      onChange={handleChange}
                      defaultValue={props.fName}
                      id="outlined-size-medium"
                      size="medium"
                    />
                  ) : (
                    <Typography variant="p">{props.fName}</Typography>
                  )}
                </Box>
                <Divider sx={dividerStyle} />
                <Box sx={divStyle}>
                  <Typography variant="p">Last Name</Typography>
                  {edit ? (
                    <TextField
                      sx={{
                        fontFamily: "Baskervville",
                        textAlign: "center",
                        marginX: "10px",
                        padding: "2.5px 14px",
                      }}
                      name="lastName"
                      onChange={handleChange}
                      defaultValue={props.lName}
                      id="outlined-size-medium"
                      size="medium"
                    />
                  ) : (
                    <Typography variant="p">{props.lName}</Typography>
                  )}
                </Box>
                <Divider sx={dividerStyle} />
                <Box sx={divStyle}>
                  <Typography variant="p">Department</Typography>
                  {edit ? (
                    <TextField
                      sx={{
                        fontFamily: "Baskervville",
                        textAlign: "center",
                        marginX: "10px",
                        padding: "2.5px 14px",
                      }}
                      name="department"
                      onChange={handleChange}
                      defaultValue={props.dept}
                      id="outlined-size-medium"
                      size="medium"
                    />
                  ) : (
                    <Typography variant="p">{props.dept}</Typography>
                  )}
                </Box>
                <Divider sx={dividerStyle} />
                <Box sx={divStyle}>
                  <Typography variant="p">Active</Typography>
                  {edit ? (
                    <Select
                      sx={{}}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={handleChange}
                      defaultValue={props.active}
                      name="active"
                      label="Status"
                    >
                      <MenuItem value={"true"}>Yes</MenuItem>
                      <MenuItem value={"false"}>No</MenuItem>
                    </Select>
                  ) : (
                    <Typography variant="p">{empStatus()}</Typography>
                  )}
                </Box>
                <Divider sx={dividerStyle} />
                <Box sx={divStyle}>
                  <Typography variant="p">Privilege Level</Typography>
                  {edit ? (
                    <Select
                      sx={{}}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={handleChange}
                      name="level"
                      defaultValue={props.level}
                      label="Status"
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                    </Select>
                  ) : (
                    <Typography variant="p">{props.level}</Typography>
                  )}
                </Box>
                <Divider sx={dividerStyle} />
              </Box>
              <Box sx={{ width: "50%" }}>
                <Box style={divStyle}>
                  <Typography variant="p">Tasks Overdue</Typography>
                  <Typography variant="p">{props.overdue}</Typography>
                </Box>
                <Divider sx={dividerStyle} />
                <Box style={divStyle}>
                  <Typography variant="p">Tasks Completed YTD</Typography>
                  <Typography variant="p">{props.yTD}</Typography>
                </Box>
                <Divider sx={dividerStyle} />
                <Box style={divStyle}>
                  <Typography variant="p">Tasks Completed</Typography>
                  <Typography variant="p">{props.submitted}</Typography>
                </Box>
                <Divider sx={dividerStyle} />
                <Box style={divStyle}>
                  <Typography variant="p">Tasks Pending</Typography>
                  <Typography variant="p">{props.pending}</Typography>
                </Box>
                <Divider sx={dividerStyle} />
                <Schedule schedule={schedule} edit={edit} _id={props._id}/>
              </Box>
            </Box>
            <Box
              sx={{
                width: "5%",
                display: "flex",
                justifyContent: "end",
                alignItems: "flex-start",
              }}
            >
              {edit ? (
                <Button onClick={handleFormSubmit} sx={{ display: "contents" }}>
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: "#ffffff",
                      border: "3px solid #D2AB67",
                      color: "primary.main",
                    }}
                  >
                    <SaveIcon sx={{ fontSize: "2rem" }} />
                  </Avatar>
                </Button>
              ) : (
                <Button onClick={setEditTrue} sx={{ display: "contents" }}>
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: "#ffffff",
                      border: "3px solid #D2AB67",
                      color: "primary.main",
                    }}
                  >
                    <EditIcon sx={{ fontSize: "2rem" }} />
                  </Avatar>
                </Button>
              )}
            </Box>
          </Box>
          {/* Reviews */}
          <ReviewCard empObjId={props._id} managerId={props.managerId} />
        </Box>
      </Modal>
    </>
  );
}

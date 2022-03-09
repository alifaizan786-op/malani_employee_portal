import React from "react";

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
  Switch
} from "@mui/material";

import { DateTimePicker, LocalizationProvider } from "@mui/lab";

import AdapterDateFns from "@mui/lab/AdapterDateFns";

const dateFormat = require('../utils/dateFormat');

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  minWidth: "50%",
  minHeight: "80%",
  borderRadius: "30px",
};

const label = { inputProps: { 'aria-label': 'Switch demo' } };


export default function EditTaskModal(props) {



  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [checked, setChecked] = React.useState(props.defData[0]? (props.defData[0].recurring):(true));

    const handleSwitchChange = (event) => {
      setChecked(event.target.checked);
    };

  function checkChecked(){
    if(checked){
        return(
            <FormControl variant="standard" sx={{ m: 1, minWidth:'250px'}}>
                <InputLabel id="demo-simple-select-label">Renew In</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-size-medium"
                    label="Status"
                    size="medium"
                    defaultValue = {props.defData[0]? (props.defData[0].renewIn):('')}
                    >
                    <MenuItem value={'1'}>Daily</MenuItem>
                    <MenuItem value={'7'}>Weekly</MenuItem>
                    <MenuItem value={'31'}>Monthly</MenuItem>
                    <MenuItem value={'183'}>Every 6-Months</MenuItem>
                    <MenuItem value={'365'}>Yearly</MenuItem>
                </Select>
            </FormControl>
        )
    }
  }


  return (
    <>
      <Modal open={props.current} onClose={props.close}>
        <Box sx={style}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Baskervville",
              textAlign: "center",
              marginY: "5px",
            }}>
            Edit Task
          </Typography>

          <FormControl variant="standard">
            <TextField
              label="Employee Id"
              id="outlined-size-medium"
              defaultValue={props.defData[0]? (props.defData[0].user.employeeId):('')}
              size="medium"
            />
            <FormHelperText id="component-helper-text">
              "Employee First Name" - "Employee Initials"
            </FormHelperText>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: "250px" }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-size-medium"
              defaultValue={props.defData[0]? (props.defData[0].status):('')}
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
                defaultValue={props.defData[0]? (new Date(parseInt(props.defData[0].dueDate))):('')}
                onChange={handleChange}
                size="medium"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              minRows={4}
              defaultValue={props.defData[0]? (props.defData[0].description):('')}
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
              <Switch  
                  size="large" 
                  defaultChecked
                  {...label}
                  onChange={handleSwitchChange} 
                />
            </FormControl>

            {checkChecked()}

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
    </>
  );
}

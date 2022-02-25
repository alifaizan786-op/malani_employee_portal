import React from "react";

import TaskCard from "../components/TaskCard";

import {
  Box,
  Typography,
  Grid,
  Button,
  Modal,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  TextField,
  Switch
} from "@mui/material";

import {
  DateTimePicker,
  LocalizationProvider,
} from '@mui/lab';

import AdapterDateFns from '@mui/lab/AdapterDateFns';

import AddIcon from '@mui/icons-material/Add';

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    minWidth: '50%',
    minHeight: '80%',
    borderRadius: '30px'
  };

export default function CreateTask (props){

    const [dateValue, setDateValue] = React.useState(new Date());

    const [checked, setChecked] = React.useState(true);

    const handleSwitchChange = (event) => {
      setChecked(event.target.checked);
      console.log(event.target.checked);
    };


    const handleDateChange = (newValue) => {
        setDateValue(newValue);
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
                        defaultValue = ""
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

    return(
        <Modal
            open={props.modalState}
            onClose={props.closeModal}>
          <Box sx={style}>

            <Typography variant="h3"
              sx={{
                fontFamily: "Baskervville",
                textAlign: "center",
                marginY: "5px",
              }}>
              Create & Assign Task
            </Typography>

            <FormControl variant="standard">
              <TextField
                label="Employee Id"
                id="outlined-size-medium"
                size="medium"
              />
              <FormHelperText id="component-helper-text">
                "Employee First Name" - "Employee Initials"
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth:'250px'}}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-size-medium"
                label="Status"
                size="medium"
                defaultValue = ""
                >
                <MenuItem value={'pending'}>Pending</MenuItem>
                <MenuItem value={'overdue'}>Overdue</MenuItem>
                <MenuItem value={'submitted'}>Submitted</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Due Date"
                  id="size-medium"
                  value={dateValue}
                  onChange={handleDateChange}
                  size="medium"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>

            <FormControl variant="standard">
              <TextField
                label="Title"
                id="outlined-size-medium"
                size="medium"
              />
            </FormControl>

            <FormControl>
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                minRows={4}
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

    )
}
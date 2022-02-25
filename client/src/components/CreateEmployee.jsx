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

export default function CreateEmployee(props){



    return(
        <Modal
            open={props.modalState}
            onClose={props.modalClose}>
          <Box sx={style}>

          <Typography variant="h3"
              sx={{
                fontFamily: "Baskervville",
                textAlign: "center",
                marginY: "5px",
              }}>
              Create Employee
            </Typography>

            <FormControl variant="standard">
              <TextField
                label="First Name"
                variant="standard"
                size="medium"
              />
            </FormControl>

            <FormControl variant="standard">
              <TextField
                label="Last Name"
                variant="standard"
                size="medium"
              />
            </FormControl>

            <FormControl variant="standard">
              <TextField
                label="Employee Id"
                variant="standard"
                size="medium"
              />
              <FormHelperText id="component-helper-text">
                "Employee First Name" - "Employee Initials"
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth:'250px'}}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-size-medium"
                label="Status"
                size="medium"
                defaultValue = ""
                >
                <MenuItem value={'Sales'}>Sales</MenuItem>
                <MenuItem value={'Tagging'}>Tagging</MenuItem>
                <MenuItem value={'Internet'}>Internet</MenuItem>
                <MenuItem value={'Executive'}>Executive</MenuItem>
                <MenuItem value={'Repair'}>Repair</MenuItem>
                <MenuItem value={'Photography'}>Photography</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth:'250px'}}>
                <InputLabel id="demo-simple-select-label">Privilege Level</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue = ""
                    label="Status">
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="standard">
              <TextField
                label="Password"
                variant="standard"
                size="medium"
              />
            </FormControl>

            <FormControl sx={{flexDirection:'row' ,justifyContent:'center', marginTop:'15px'}}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    fontSize: "20px",
                    bgcolor: "primary.main",
                    color: "primary.light",
                    marginTop:'auto',
                    width: "25%",
                    alignItems:'center',
                    borderRadius: "40px",
                }}>
                Create
                </Button>
            </FormControl>


          </Box>
      </Modal>

    )
}
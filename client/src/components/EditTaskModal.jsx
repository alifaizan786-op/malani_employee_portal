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

import {UPDATE_TASK} from '../utils/mutation';

import {useMutation} from '@apollo/client';

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

  const [formState, setFormState] = React.useState({
    status: '',
    description: '',
    _id: '',
    dueDate: '',
    recurring: '',
    renewIn: '',
  })

  const [date, setDate] = React.useState(null);

  React.useEffect(() => {
    if(props.defData[0]){
      setDate((new Date(parseInt(props.defData[0].dueDate))).toISOString())
    }
  }, [props.current]);
  
  React.useEffect(() => {
    if(props.defData[0]){
      setFormState({
        status: props.defData[0].status,
        description: props.defData[0].description,
        _id: props.defData[0]._id,
        dueDate: new Date(parseInt(props.defData[0].dueDate)).toISOString(),
        recurring: props.defData[0].recurring,
        renewIn: props.defData[0].renewIn,
      })
    }
  }, [props.current]);

  const handleChange = (event) =>{
    const{name,value} = event.target
    setFormState({
      ...formState,
      dueDate: date,
      recurring:checked,
       [name]:value ,
    });
  };

  const[updateTask,{error,data}] = useMutation(UPDATE_TASK)

  console.log(formState);

  const handleDateChange = (newValue) => {
    setDate(newValue);
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
                    name="renewIn"
                    onChange={handleChange}
                    size="medium"
                    defaultValue = {props.defData[0]? (props.defData[0].renewIn):('')}
                    >
                    <MenuItem value={'1'}>Daily</MenuItem>
                    <MenuItem value={'7'}>Weekly</MenuItem>
                    <MenuItem value={'30'}>Monthly</MenuItem>
                    <MenuItem value={'183'}>Every 6-Months</MenuItem>
                    <MenuItem value={'365'}>Yearly</MenuItem>
                </Select>
            </FormControl>
        )
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try{
      const { data } = await updateTask({
        variables: {...formState},
      });

    }catch(e){
      console.error(e);
    }
    setFormState({
      status: '',
      description: '',
      _id: '',
      dueDate: '',
      recurring: '',
      renewIn: '',
    })
    window.location.assign('/ViewAllTasks');
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
              onChange={handleChange}
              name="employeeId"
              disabled
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
              name="status"
              onChange={handleChange}
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
              value={date}  
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
          </FormControl>

          <FormControl>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              name="description"
              onChange={handleChange}
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
                  {...label}
                  onChange={handleSwitchChange} 
                />
            </FormControl>

            {checkChecked()}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleFormSubmit}
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

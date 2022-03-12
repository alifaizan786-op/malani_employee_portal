import React from "react";
import {CREATE_TASK} from '../utils/mutation'

import {useMutation} from '@apollo/client';


import {
  Box,
  Typography,
  Button,
  Modal,
  FormControl,
  InputLabel,
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
  };


  const handleDateChange = (newValue) => {
    setDateValue(new Date(newValue).toISOString());
    setFormState({
      ...formState,
      dueDate:dateValue
    })
  };

  const [createTask, {event,data}] = useMutation(CREATE_TASK);

    const [formState, setFormState] = React.useState({
      description:'',
      user: '',
      dueDate: `${dateValue}`,
      recurring: checked,
      renewIn: ''

  })

  const handleChange = (event) => {
    const { name , value} = event.target

    setFormState({
      ...formState,
      dueDate: dateValue,
      [name] : value,
    });

  }

  const handleFormSubmit = async (event)=>{
    event.preventDefault()
    try{
      const{data} = await createTask({
        variables:{...formState}
      })
      props.closeModal()
    } catch(e){
      console.log(e); 
    }
    setFormState({
      description:'',
      user: '',
      dueDate: `${dateValue}`,
      recurring: checked,
      renewIn: ''

  })
  }

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
                        size="medium"
                        value={formState.renewIn}
                        onChange={handleChange}
                        >
                        <MenuItem value={1}>Daily</MenuItem>
                        <MenuItem value={7}>Weekly</MenuItem>
                        <MenuItem value={31}>Monthly</MenuItem>
                        <MenuItem value={183}>Every 6-Months</MenuItem>
                        <MenuItem value={365}>Yearly</MenuItem>
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

            <FormControl variant="standard" sx={{ m: 1, minWidth: "40%" }}>
        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
          name="user"
          value={formState.user}
          onChange={handleChange}
          >
          {props.user.map((employee, index )=>(
          <MenuItem key={employee._id} 
          value={employee._id}>{employee.employeeId}</MenuItem>
          ))}
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

            <FormControl>
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                name="description"
                multiline
                minRows={4}
                value={formState.description}
                onChange={handleChange}
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

    )
}
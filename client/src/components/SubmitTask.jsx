import React from "react";

import {
    Box,
    Typography,
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

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {UPDATE_STATUS} from '../utils/mutation';
import {useMutation} from '@apollo/client';
import { useSnackbar } from 'notistack';
import SaveIcon from "@mui/icons-material/Save";


export default function SubmitTask(props) { 

    const [submitTask, { error, data }] = useMutation(UPDATE_STATUS);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [formState, setFormState] = React.useState({
    _id:props._id,
    status:'submitted'
    })

    const praise = ['Good Job!', 'Great Job!', 'Awesome Job!', 'Excellent Job!', 'Outstanding Job!', 'Keep it up!'];

    const handleChange = (event) =>{
        const{name,value} = event.target
        setFormState({
            ...formState,
            [name]:value ,
        });
      };

    const handleSubmit = async (event) => { 
        event.preventDefault();
        if(formState.subStatus === 'complete'){
            enqueueSnackbar(praise[Math.floor(Math.random() * praise.length)],{variant:'success'});
        }

        if(formState.subStatus){
            try {
                const { data } = await submitTask({
                    variables: { ...formState },
                });
            } catch (e) {
                console.log(e);
            }
        }else{
            enqueueSnackbar('Please Add Sub Status ',{variant:'error'});
        }
    }
    

    
    
    return (
        <>
            <FormControl variant="standard" sx={{ m: 1, minWidth: "250px" }}>
                <InputLabel id="demo-simple-select-label">Sub Status</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-size-medium"
                label="Sub Status"
                size="medium"
                sx={{border:'none'}}
                defaultValue = {''}
                name="subStatus"
                onChange={handleChange}
                >
                    <MenuItem value={"absent"}>Absent</MenuItem>
                    <MenuItem value={"partially Complete"}>Partially Complete</MenuItem>
                    <MenuItem value={"complete"}>Complete</MenuItem>
                    <MenuItem value={"not applicable"}>Not Applicable</MenuItem>
                </Select>
            </FormControl>
            <Button type="submite"
                  onClick={handleSubmit}
                  variant="text" startIcon={<SaveIcon />} sx={{
                      fontSize: "0.8125rem",
                      bgcolor: "#ffffff",
                      color: "primary.main",
                    }}>
                Save
              </Button>
        </>
    )
}
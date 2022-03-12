import React from "react";

import {
  Button,
} from "@mui/material";

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {UPDATE_STATUS} from '../utils/mutation';
import {useMutation} from '@apollo/client';
import { useSnackbar } from 'notistack';


export default function SubmitTask(props) { 

    const [submitTask, { error, data }] = useMutation(UPDATE_STATUS);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [formState, setFormState] = React.useState({
    _id:props._id,
    status:'submitted'
    })

    const praise = ['Good Job!', 'Great Job!', 'Awesome Job!', 'Excellent Job!', 'Outstanding Job!', 'Keep it up!'];

    const handleSubmit = async (event) => { 
        event.preventDefault();
        enqueueSnackbar(praise[Math.floor(Math.random() * praise.length)],{variant:'success'});
        try {
            const { data } = await submitTask({
                variables: { ...formState },
            });
        } catch (e) {
            console.log(e);
        }
    }
    

    
    
    return (
        <>
            <Button type="submite"
                  onClick={handleSubmit}
                  variant="text" startIcon={<ArrowUpwardIcon />} sx={{
                      fontSize: "0.8125rem",
                      bgcolor: "#ffffff",
                      color: "primary.main",
                    }}>
                Submit
              </Button>
        </>
    )
}
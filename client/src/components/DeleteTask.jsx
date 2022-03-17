import React from "react";

import {
  Button,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {DELETE_TASK} from '../utils/mutation';
import {useMutation} from '@apollo/client';
import { useSnackbar } from 'notistack';


export default function DeleteTask(props) { 

    const [deleteTask, { error, data }] = useMutation(DELETE_TASK);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [formState, setFormState] = React.useState({
    _id:props._id,
    })

    const handleSubmit = async (event) => { 
        event.preventDefault();
        enqueueSnackbar('Task Deleted Successfully',{variant:'success'});
        try {
            const { data } = await deleteTask({
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
                  variant="text" startIcon={<DeleteIcon />} sx={{
                      fontSize: "0.8125rem",
                      bgcolor: "#ffffff",
                      color: "red",
                    }}>
                Delete
              </Button>
        </>
    )
}
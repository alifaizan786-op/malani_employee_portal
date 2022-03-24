import React from "react";

import {
  Button,
} from "@mui/material";

import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import {UPDATE_STATUS} from '../utils/mutation';
import {useMutation} from '@apollo/client';
import { useSnackbar } from 'notistack';


export default function AbsentTask(props) { 

    const [submitTask, { error, data }] = useMutation(UPDATE_STATUS);

    const [formState, setFormState] = React.useState({
    _id:props._id,
    status:'absent'
    })

    const handleSubmit = async (event) => { 
        event.preventDefault();
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
                  variant="text" startIcon={<DirectionsWalkIcon />} sx={{
                      fontSize: "0.8125rem",
                      bgcolor: "#ffffff",
                      color: "primary.main",
                    }}>
                Absent
              </Button>
        </>
    )
}
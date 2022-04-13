import React from "react";

import {Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Button, Typography, Divider} from "@mui/material";
import {  Reply, Forward, Delete } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { teal, grey } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';

import { useSnackbar } from 'notistack';
import {DELETE_BULLETIN} from '../utils/mutation'
import {useMutation} from '@apollo/client';


export default function DeleteBulletin(props){

    // console.log('userId ' + props.curUserId);
    // console.log('bulletInId ' + props.bulletInId);

    const [formState, setFormState] = React.useState({
        _id : props.bulletInId,
    })

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const[deleteBulletin,{error,data}] = useMutation(DELETE_BULLETIN)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try{
          const { data } = await deleteBulletin({
            variables: {...formState},
          });
          enqueueSnackbar('Bulletin Deleted Successfully',{variant:'success'});
        }catch(e){
          console.error(e);
        }
        setFormState({
            _id : props.bulletInId,
        })
    }

    return(
        <Button onClick={handleFormSubmit} sx={{color:'red'}}>
          <DeleteIcon />
          Delete
        </Button>
    )

}
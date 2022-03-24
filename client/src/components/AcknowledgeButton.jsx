import React from "react";

import {Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Button, Typography, Divider} from "@mui/material";
import {  Reply, Forward, Delete } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { teal, grey } from "@mui/material/colors";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import { useSnackbar } from 'notistack';
import {AKNOWLEDGE_BULLETIN} from '../utils/mutation'
import {useMutation} from '@apollo/client';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));


export default function AcknowledgeBtn(props){

    // console.log('userId ' + props.curUserId);
    // console.log('bulletInId ' + props.bulletInId);

    const [formState, setFormState] = React.useState({
        _id : props.bulletInId,
        acknowledge : props.curUserId
    })

    React.useEffect(() => {
        setFormState({
            _id : props.bulletInId,
            acknowledge : props.curUserId
        })
    },[props.curUserId])


    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const[acknowledgeBulletin,{error,data}] = useMutation(AKNOWLEDGE_BULLETIN)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        if(props.acknowledgeArr.filter(e => e._id == props.curUserId).length > 0){
          enqueueSnackbar('You Have Already Acknowledged',{variant:'Error'});
        }else{
          try{
            const { data } = await acknowledgeBulletin({
              variables: {...formState},
            });
            enqueueSnackbar('Thank You For Your Acknowledgement',{variant:'success'});
          }catch(e){
            console.error(e);
          }
          setFormState({
              _id : props.bulletInId,
              acknowledge : props.curUserId
          })
        }
    }

    return(
      <HtmlTooltip
        placement="top"
        title={
          <React.Fragment>
            <Typography color="inherit">Acknowledged</Typography>
            {props.acknowledgeArr.map((user)=>(
              <Typography key={user._id} color="inherit">{user.employeeId}</Typography>

            ))}
          </React.Fragment>
        }
      >
        <Button onClick={handleFormSubmit}>
          <CheckIcon  />
          Acknowledge
        </Button>
      </HtmlTooltip>
    )

}
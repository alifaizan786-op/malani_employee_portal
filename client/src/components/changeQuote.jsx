import React from "react";
import {useMutation} from '@apollo/client';
import {CHANGE_QUOTE} from '../utils/mutation';

import { 
  Typography, 
  Button,
  Modal,
  Box,
  FormControl,
  TextField
} from "@mui/material";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  display: "flex",
  flexDirection: "column",

  minWidth: "50%",
  borderRadius: "30px",
};



export default function ChangeQuote(props){



const [changeQuote, { error, data }] = useMutation(CHANGE_QUOTE);

const [formState, setFormState] = React.useState({
    _id: props.quoteid ,
    quotes:'',
  })

 const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      _id: props.quoteid,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
 

    try {
      const { data } = await changeQuote({
        variables: { ...formState },
      });

    } catch (e) {
      console.error(e);
    }

    setFormState({
    _id: '',
    quotes:'',
    });
    window.location.assign('/');
  };

return(
         <Modal open={props.modalState} onClose={props.modalClose}>
        <Box sx={style}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Baskervville",
              textAlign: "center",
              marginY: "5px",
            }}>
            Change Quote Of The Day
          </Typography>
          <FormControl>
            <TextField
              id="outlined-multiline-flexible"
              sx={{marginTop:'10px', minWidth:'90%'}}
              label="Quote"
              name="quotes"
              value={formState.quotes}
              onChange={handleChange}
              multiline
              minRows={4}
            />
          </FormControl>

          <FormControl sx={{flexDirection:'row' ,justifyContent:'center', marginTop:'15px'}}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleFormSubmit}
              sx={{
                fontSize: "20px",
                bgcolor: "primary.main",
                color: "primary.light",
                marginTop:'auto',
                width: "15%",
                alignItems:'center',
                borderRadius: "10px",
              }}>
              Save
            </Button>
          </FormControl>

        </Box>
      </Modal>

    )
}
import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_QUOTE } from '../utils/queries' 
import {useMutation} from '@apollo/client';
import {CHANGE_QUOTE} from '../utils/mutation'
import ChangeQuote from "./changeQuote";

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

export default function Quote(props) {

 const { data } = useQuery(QUERY_QUOTE,{pollInterval: 1000,})

 const quote = data?.quotes || [] 

  function getQuoteId(){
    if(quote[0]){
      return quote[0]._id
    }
  }



  function qouteText(){
    if(quote[0]){
      return quote[0].quotes
    }else{
      return 'Loading'
    }
  }

  const [edit, setEdit] = React.useState(false);
  const [quoteId, setquoteId] = React.useState('');

  const setEditTrue = () => {
    setEdit(true);
    setquoteId(getQuoteId())
  };

  const setEditFalse = () => {
    setEdit(false);
  };


  function checkLevel(){
    if(props.level === 2){
     return( 
       <Button
        type="submit"
        fullWidth
        onClick={setEditTrue}
        variant="contained"
        sx={{
          fontSize: "20px",
          bgcolor: "primary.main",
          color: "primary.light",
          width: "15%",
          borderRadius: "10px",
        }}>
        Change Quote
      </Button>
      )
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Typography
        variant="h5"
        color={"primary.main"}
        textAlign={"center"}
        sx={{ fontFamily: "Baskervville", marginTop: "30px" }}>
        Qoute of the Day
      </Typography>
      <Typography
        variant="h3"
        color={"primary.main"}
        textAlign={"center"}
        sx={{
          fontFamily: "Baskervville",
          marginTop: "15px",
          marginBottom: "30px",
        }}>
        {qouteText()}
      </Typography>
      
       {checkLevel()}

        <ChangeQuote modalState={edit} modalClose={setEditFalse} quoteid={quoteId}/>
     
    </div>
  );
}

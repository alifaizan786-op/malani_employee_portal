import React from "react";

import { 
  Typography, 
  Button,
  Modal,
  Input,
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
  justifyContent: "center",
  alignItems: 'center',
  minWidth: "50%",
  borderRadius: "30px",
};



export default function Quote() {

  const [edit, setEdit] = React.useState(false);

  const setEditTrue = () => {
    setEdit(true);
  };

  const setEditFalse = () => {
    setEdit(false);
  };

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
        Quote Of The Day
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
        May your path be lit by,
        <br />
        the bridges you burned
      </Typography>
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
      <Modal open={edit} onClose={setEditFalse}>
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
              label="Description"
              multiline
              minRows={4}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            onClick={setEditTrue}
            variant="contained"
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

        </Box>
      </Modal>
    </div>
  );
}

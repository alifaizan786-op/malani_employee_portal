import React from "react";

import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Modal,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

import ReviewCard from "./ReviewCard";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  minWidth: "50%",
  borderRadius: "30px",
};

const divStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};

const dividerStyle = {
  margin: "0px 10px 13px 10px",
};

export default function EmployeeModal(props) {
  const [edit, setEdit] = React.useState(false);

  const setEditTrue = () => {
    setEdit(true);
  };

  const setEditFalse = () => {
    setEdit(false);
  };

  return (
    <>
      <Modal open={props.state} onClose={props.close}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}>
            <Box sx={{ width: "25%", display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: "45px",
                  bgcolor: "#ffffff",
                  border: "3px solid #D2AB67",
                  fontFamily: "Baskervville",
                  color: "primary.main",
                }}>
                FA
              </Avatar>

              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Baskervville",
                  textAlign: "center",
                  marginX: "10px",
                }}>
                Faizan Ali
              </Typography>
            </Box>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "space-between",
              }}>
              <Box sx={{ width: "45%" }}>
                <Box sx={divStyle}>
                  <Typography variant="p">Employee Id</Typography>
                  {edit ? (
                    <TextField
                      sx={{
                        fontFamily: "Baskervville",
                        textAlign: "center",
                        marginX: "10px",
                        padding: "2.5px 14px",
                      }}
                      id="outlined-size-medium"
                      defaultValue="Faizan Ali"
                      size="medium"
                    />
                  ) : (
                    <Typography variant="p">Faizan-FA</Typography>
                  )}
                </Box>
                <Divider sx={dividerStyle} />
                <Box sx={divStyle}>
                  <Typography variant="p">First Name</Typography>
                  {edit ? (
                    <TextField
                      sx={{
                        fontFamily: "Baskervville",
                        textAlign: "center",
                        marginX: "10px",
                        padding: "2.5px 14px",
                      }}
                      id="outlined-size-medium"
                      defaultValue="Faizan"
                      size="medium"
                    />
                  ) : (
                    <Typography variant="p">Faizan</Typography>
                  )}
                </Box>
                <Divider sx={dividerStyle} />
                <Box sx={divStyle}>
                  <Typography variant="p">Last Name</Typography>
                  {edit ? (
                    <TextField
                      sx={{
                        fontFamily: "Baskervville",
                        textAlign: "center",
                        marginX: "10px",
                        padding: "2.5px 14px",
                      }}
                      id="outlined-size-medium"
                      defaultValue="Ali"
                      size="medium"
                    />
                  ) : (
                    <Typography variant="p">Ali</Typography>
                  )}
                </Box>
                <Divider sx={dividerStyle} />
                <Box sx={divStyle}>
                  <Typography variant="p">Privilege Level</Typography>
                  {edit ? (
                    <Select
                      sx={{}}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={"2"}
                      label="Status">
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                    </Select>
                  ) : (
                    <Typography variant="p">2</Typography>
                  )}
                </Box>
                <Divider sx={dividerStyle} />
              </Box>
              <Box sx={{ width: "45%" }}>
                <Box style={divStyle}>
                  <Typography variant="p">Tasks Overdue</Typography>
                  <Typography variant="p">3</Typography>
                </Box>
                <Divider sx={dividerStyle} />
                <Box style={divStyle}>
                  <Typography variant="p">Tasks Completed YTD</Typography>
                  <Typography variant="p">2</Typography>
                </Box>
                <Divider sx={dividerStyle} />
                <Box style={divStyle}>
                  <Typography variant="p">Tasks Completed</Typography>
                  <Typography variant="p">10</Typography>
                </Box>
                <Divider sx={dividerStyle} />
                <Box style={divStyle}>
                  <Typography variant="p">Tasks Pending</Typography>
                  <Typography variant="p">5</Typography>
                </Box>
                <Divider sx={dividerStyle} />
              </Box>
            </Box>
            <Box
              sx={{
                width: "15%",
                display: "flex",
                justifyContent: "end",
                alignItems: "flex-start",
              }}>
              {edit ? (
                <Button onClick={setEditFalse} sx={{ display: "contents" }}>
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: "#ffffff",
                      border: "3px solid #D2AB67",
                      color: "primary.main",
                    }}>
                    <SaveIcon sx={{ fontSize: "2rem" }} />
                  </Avatar>
                </Button>
              ) : (
                <Button onClick={setEditTrue} sx={{ display: "contents" }}>
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: "#ffffff",
                      border: "3px solid #D2AB67",
                      color: "primary.main",
                    }}>
                    <EditIcon sx={{ fontSize: "2rem" }} />
                  </Avatar>
                </Button>
              )}
            </Box>
          </Box>
          {/* Reviews */}
          <ReviewCard />
        </Box>
      </Modal>
    </>
  );
}

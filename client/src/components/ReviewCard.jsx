import React from "react";

import {
  Box,
  Typography,
  Button,
  FormControl,
  Input,
  InputLabel,
  Collapse,
  InputAdornment,
  IconButton,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const reviews = [
  {
    manager: {
      employeeId: "Aliammar-AR",
    },
    month: "January 2022",
    review: "Alway using his phone",
  },
  {
    manager: {
      employeeId: "Uzair-UM",
    },
    month: "January 2022",
    review: "Coming Late",
  },
  {
    manager: {
      employeeId: "Zanir-ZM",
    },
    month: "January 2022",
    review: "Need to Talk About Photography",
  },
  {
    manager: {
      employeeId: "Iqbal-IK",
    },
    month: "December 2021",
    review: "Good job!",
  },
  {
    manager: {
      employeeId: "Zanir-ZM",
    },
    month: "December 2021",
    review: "Well Done",
  },
  {
    manager: {
      employeeId: "Aliammar-AR",
    },
    month: "December 2021",
    review: "Coming Late",
  },
  {
    manager: {
      employeeId: "Shermyn-SM",
    },
    month: "November 2021",
    review: "Takes long Breaks",
  },
  {
    manager: {
      employeeId: "Zanir-ZM",
    },
    month: "November 2021",
    review: "Talk About Future Plans",
  },
  {
    manager: {
      employeeId: "Iqbal-IK",
    },
    month: "November 2021",
    review: "Picture Quality is bad",
  },
];

export default function ReviewCard() {
  const [cardMonth, setCardMonth] = React.useState("");

  const monthsarr = [];

  for (let i = 0; i < reviews.length; i++) {
    monthsarr.push(reviews[i].month);
  }

  const uniquemonthsarr = [...new Set(monthsarr)];

  function filter(monthparam) {
    const newArr = reviews.filter(
      (oneReview) => oneReview.month === monthparam
    );
    return newArr;
  }

  return (
    <>
      {uniquemonthsarr.map((month, index) => (
        <Box sx={{ marginTop: "10px" }} key={index}>
          <Box
            sx={{
              backgroundColor: "#F1EEEE",
              display: "flex",
              justifyContent: "space-between",
              height: "60px",
              alignItems: "center",
              padding: "0px 15px",
            }}>
            <Typography variant="h6">{month}</Typography>
            {cardMonth ? (
              <Button
                fullWidth
                sx={{ display: "contents" }}
                onClick={() => {
                  setCardMonth("");
                }}>
                <ArrowDropUpIcon sx={{ fontSize: "3rem" }} />
              </Button>
            ) : (
              <Button
                fullWidth
                sx={{ display: "contents" }}
                onClick={() => {
                  setCardMonth(month);
                }}>
                <ArrowDropDownIcon sx={{ fontSize: "3rem" }} />
              </Button>
            )}
          </Box>
          <Collapse in={cardMonth === month}>
            <Box
              sx={{
                backgroundColor: "#F6F6F6",
                padding: "20px 40px",
                display: "grid",
              }}>
              <FormControl variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Add Review
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility">
                        <SaveIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {filter(month).map((reviewChild, index) => (
                <Typography variant="p" sx={{ paddingTop: "10px" }}>
                  {`${reviewChild.manager.employeeId}---${reviewChild.review}`}
                </Typography>
              ))}
            </Box>
          </Collapse>
        </Box>
      ))}
    </>
  );
}

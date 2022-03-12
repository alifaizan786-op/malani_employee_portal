import React from "react";

import {
  Box,
  Typography,
  Button,
  Collapse,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { useQuery } from "@apollo/client";
import { QUERY_REVIEWBYUID } from '../utils/queries'


import CreateReview from "./CreateReview";








export default function ReviewCard(props) {

  const { loading, data} = useQuery(QUERY_REVIEWBYUID, {
    // pass URL parameter
    variables: { employeeUId: props.empObjId },
    pollInterval: 500,
  });


  const reviews = data?.reviewUId || []
  


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
      <CreateReview empObjId={props.empObjId} managerId={props.managerId}/>
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
              {filter(month).map((reviewChild, index) => (
                <Typography variant="p" sx={{ paddingTop: "10px" }}>
                  {`${reviewChild.manager.employeeId.toUpperCase()} : "${reviewChild.review}"`}
                </Typography>
              ))}
            </Box>
          </Collapse>
        </Box>
      ))}
    </>
  );
}

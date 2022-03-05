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

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_REVIEWBYUID } from "../utils/queries";
import { ADD_REVIEW } from "../utils/mutation";

const formattedMonth = (
  timestamp,
  { monthLength = "", dateSuffix = true } = {}
) => {
  // create month object
  const months = {
    0: monthLength === "short" ? "Jan" : "January",
    1: monthLength === "short" ? "Feb" : "February",
    2: monthLength === "short" ? "Mar" : "March",
    3: monthLength === "short" ? "Apr" : "April",
    4: monthLength === "short" ? "May" : "May",
    5: monthLength === "short" ? "Jun" : "June",
    6: monthLength === "short" ? "Jul" : "July",
    7: monthLength === "short" ? "Aug" : "August",
    8: monthLength === "short" ? "Sep" : "September",
    9: monthLength === "short" ? "Oct" : "October",
    10: monthLength === "short" ? "Nov" : "November",
    11: monthLength === "short" ? "Dec" : "December",
  };

  const dateObj = new Date(timestamp);

  const formattedMonth = months[dateObj.getMonth()];

  const year = dateObj.getFullYear();

  const formattedTimeStamp = `${formattedMonth} ${year}`;

  return formattedTimeStamp;
};

console.log(formattedMonth(new Date()));

export default function CreateReview(props) {

    const [formState, setFormState] = React.useState({
        manager: props.managerId ,
        employee:props.empObjId,
        month: formattedMonth(new Date),
        review:''
    })

    const [addReview, { error, data }] = useMutation(ADD_REVIEW);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          manager: props.managerId ,
          employee:props.empObjId,
          month: formattedMonth(new Date),
          [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        try {
            const { data } = await addReview({
            variables: { ...formState },
            });

        } catch (e) {
            console.error(e);
        }

        setFormState({
            manager: props.managerId ,
            employee:props.empObjId,
            month: formattedMonth(new Date),
            review:''
        });
    };


  return (
    <>
      <FormControl variant="standard">
        <InputLabel htmlFor="standard-adornment-password">
          Add Review
        </InputLabel>
        <Input
          id="standard-adornment-password"
          name="review"
          onChange={handleChange}
          value={formState.review}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleFormSubmit}
                aria-label="toggle password visibility"
              >
                <SaveIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
}

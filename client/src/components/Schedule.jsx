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
  Checkbox,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import ReviewCard from "./ReviewCard";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import { UPDATE_SCHEDULE } from "../utils/mutation";

import { useMutation } from "@apollo/client";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

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

export default function Schedule(props) {
  const schedule = props?.schedule || [];

  const [formState, setFormState] = React.useState([]);

  console.log(props._id);

  // const sorter = {
  //     // "sunday": 0, // << if sunday is first day of week
  //     "monday": 1,
  //     "tuesday": 2,
  //     "wednesday": 3,
  //     "thursday": 4,
  //     "friday": 5,
  //     "saturday": 6,
  //     "sunday": 7
  //   }
  // React.useEffect(()=>{
  //     schedule.sort(function sortByDay(a, b) {
  //       let day1 = a.dayOfWeek.toLowerCase();
  //       let day2 = b.dayOfWeek.toLowerCase();
  //       return sorter[day1] - sorter[day2];
  //     });
  //   }, [props])

  React.useEffect(() => {
    setFormState([...schedule]);
  }, schedule);

  const handleChange = (event) => {
    const { name, value } = event.target;

    let tempArr = [...formState];

    let tempObj = {
      ...tempArr.filter((sched) => name.split("-")[1] === sched.dayOfWeek)[0],
    };

    let objKey = name.split("-")[0];

    let objIndex = tempArr.findIndex(
      (sched) => name.split("-")[1] === sched.dayOfWeek
    );

    Object.defineProperties(tempObj, {
      [objKey.toString()]: {
        value: value,
      },
    });

    tempArr[objIndex] = tempObj;

    setFormState([...tempArr]);
  };

  console.log(formState);
  return (
    <>
      {props.edit ? (
        <FormControl component="fieldset">
          <FormLabel component="legend">Schedule</FormLabel>
          <FormGroup
            aria-label="position"
            id="heeee"
            sx={{
              marginLeft: "10%",
            }}
          >
            {formState.map((aSchedule, index) => (
              <FormControlLabel
                key={index}
                value="top"
                control={
                  <>
                    <TextField
                      sx={{
                        fontFamily: "Baskervville",
                        textAlign: "center",
                        marginX: "10px",
                        marginY: "10px",
                        minWidth: "40%",
                      }}
                      name={`timeOff-${aSchedule.dayOfWeek}`}
                      onChange={handleChange}
                      label="Time-Off"
                      id="outlined-size-medium"
                      size="medium"
                      defaultValue={aSchedule.timeOff}
                    />
                    <TextField
                      sx={{
                        fontFamily: "Baskervville",
                        textAlign: "center",
                        marginX: "10px",
                        marginY: "10px",
                        minWidth: "40%",
                      }}
                      name={`timeIn-${aSchedule.dayOfWeek}`}
                      onChange={handleChange}
                      label="Time-In"
                      id="outlined-size-medium"
                      size="medium"
                      defaultValue={aSchedule.timeIn}
                    />
                    <Checkbox
                      checked={aSchedule.isPresent}
                      name={`isPresent-${aSchedule.dayOfWeek}`}
                      sx={{
                        marginX: "10px",
                        minWidth: "10%",
                      }}
                    />
                  </>
                }
                label={
                  aSchedule.dayOfWeek[0].toUpperCase() +
                  aSchedule.dayOfWeek[1] +
                  aSchedule.dayOfWeek[2]
                }
                labelPlacement="start"
              />
            ))}
          </FormGroup>
        </FormControl>
      ) : (
        <FormControl component="fieldset">
          <FormLabel component="legend">Schedule</FormLabel>
          <FormGroup aria-label="position" row>
            {schedule.map((aSchedule) => (
              <HtmlTooltip
                key={aSchedule._id}
                placement="bottom"
                title={
                  <React.Fragment>
                    <Typography variant="caption" color="inherit">
                      <strong>Time In : </strong>
                      {aSchedule.timeIn}
                      <br />
                      <strong>Time Out : </strong>
                      {aSchedule.timeOff}
                    </Typography>
                  </React.Fragment>
                }
              >
                <FormControlLabel
                  value="top"
                  control={<Checkbox disabled checked={aSchedule.isPresent} />}
                  label={
                    aSchedule.dayOfWeek[0].toUpperCase() +
                    aSchedule.dayOfWeek[1] +
                    aSchedule.dayOfWeek[2]
                  }
                  labelPlacement="top"
                />
              </HtmlTooltip>
            ))}
          </FormGroup>
        </FormControl>
      )}
    </>
  );
}

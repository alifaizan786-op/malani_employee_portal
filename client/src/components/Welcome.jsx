import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_WELCOME } from '../utils/queries'

import { Typography } from "@mui/material";

export default function Welcome() {

  const { data } = useQuery(QUERY_WELCOME)

  const user = data?.userId || [];

  console.log(user);



  return (
    <>
      <Typography
        variant="h3"
        color={"primary.main"}
        textAlign={"center"}
        sx={{ fontFamily: "Baskervville", marginBottom: "15px" }}>
        Welcome Back !
      </Typography>
      <Typography
        variant="h1"
        color={"primary.main"}
        textAlign={"center"}
        sx={{ fontFamily: "Baskervville", marginBottom: "15px" }}>
        {user.firstName} {user.lastName}
      </Typography>
      <Typography
        variant="h4"
        color={"primary.main"}
        textAlign={"center"}
        sx={{ fontFamily: "Baskervville", marginBottom: "15px" }}>
        Malani Jewelers Inc - Atlanta
      </Typography>
      <Typography
        variant="h4"
        color={"primary.main"}
        textAlign={"center"}
        sx={{ fontFamily: "Baskervville", marginBottom: "30px" }}>
        Department : {user.department}
      </Typography>
    </>
  );
}

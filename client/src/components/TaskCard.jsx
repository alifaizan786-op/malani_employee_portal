import React from "react";

import { Box, Typography, Grid, Button, Avatar, Divider, Card } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';

export default function TaskCard() {
    return(
        <Card sx={{boxShadow: '0px 0px 10px #00BC5E', minWidth:'300px',maxWidth:'300px', margin:'25px'}}>
            <Typography variant="h4" sx={{fontFamily: "Baskervville", textAlign:'center', marginY:'5px'}}>
                Submitted
            </Typography>
            <Divider sx={{ width: "50%", margin: "auto", borderBottomWidth: 3, marginY:'5px' }}/>
            <Typography variant="h5" sx={{fontFamily: "Baskervville", textAlign:'center', marginY:'5px'}}>
                Faizan Ali
            </Typography>
            <Typography variant="h4" sx={{fontFamily: "Baskervville", textAlign:'center', marginY:'5px'}}>
                Lorem Ipsum
            </Typography>
            <Typography variant="h6" sx={{fontFamily: "Baskervville", textAlign:'center', marginY:'5px'}}>
                20th Feb 2022 at 03:00pm
            </Typography>
            <Typography variant="h6" sx={{fontFamily: "Baskervville", textAlign:'center', marginY:'5px', marginX:'15px'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </Typography>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                fontSize: "20px",
                bgcolor: "primary.main",
                color: "primary.light",
                borderRadius: "10px",
                }}
            >
                Change Status
            </Button>
        </Card>
    )
}
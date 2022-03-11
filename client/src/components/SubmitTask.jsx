import React from "react";

import { useQuery } from '@apollo/client';
import { QUERY_ALLTASKS} from '../utils/queries'
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  Modal,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  TextField,
  Switch,
    Grid,
    Snackbar,
  Alert
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import CreateTask from "../components/CreateTask";
import { styled, useTheme } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EditIcon from '@mui/icons-material/Edit';
import LinearProgress from '@mui/material/LinearProgress';
import {UPDATE_STATUS} from '../utils/mutation';
import {useMutation} from '@apollo/client';

import EditTaskModal from "../components/EditTaskModal";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import ClearIcon from '@mui/icons-material/Clear';

import { DatePicker, LocalizationProvider } from "@mui/lab";

import AdapterDateFns from "@mui/lab/AdapterDateFns";

const dateFormat = require('../utils/dateFormat');


export default function SubmitTask(props) { 

    const [submitTask, { error, data }] = useMutation(UPDATE_STATUS);

    const [formState, setFormState] = React.useState({
    _id:props._id,
    status:'submitted'
    })

    const handleSubmit = async (event) => { 
        event.preventDefault();
        try {
            const { data } = await submitTask({
                variables: { ...formState },
            });
            props.open();

        } catch (e) {
            console.log(e);
        }
    }

    
    
    return (
        <>
            <Button type="submite"
                  onClick={handleSubmit}
                  variant="text" startIcon={<ArrowUpwardIcon />} sx={{
                      fontSize: "0.8125rem",
                      bgcolor: "#ffffff",
                      color: "primary.main",
                    }}>
                Submit
              </Button>
        </>
    )
}
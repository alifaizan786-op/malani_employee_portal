import React from 'react';

import { Grid } from '@mui/material';

import { useQuery } from '@apollo/client';
import { QUERY_SCHED_BY_UID } from '../utils/queries';
import { NEW_TIME_OFF_REQUEST } from '../utils/mutation';
import { useMutation } from '@apollo/client';
import dateFormat from '../utils/dateFormat';
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
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
	QUERY_TIME_OFF_REQ_BY_UID,
	QUERY_ALL_TIME_OFF_REQS,
} from '../utils/queries';

import { DateRange } from 'react-date-range';
import { addDays, format, isWeekend } from 'date-fns';
import NewTimeOffRequest from '../components/newTimeOffRequest';

import AllTimeOffReqs from '../components/AllTimeOffReqs';

import EmpTimeOffReq from '../components/EmpTimeOffReq';

export default function TimeOffRequest(props) {
	const { loading, data, refetch } = useQuery(QUERY_TIME_OFF_REQ_BY_UID, {
		variables: { employeeUId: props._id },
	});


	const timeOffReqs = data?.timeOffReqByUid || [];

	function gridStyling() {
		//grid Styling
		if (props.current) {
			let style = (theme) => ({
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginTop: '140px',
				marginLeft: '240px',
				display: 'flex',
				flexFlow: 'wrap',
			});
			return style;
		} else {
			let style = (theme) => ({
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				marginTop: '140px',
				marginLeft: '175px',
				display: 'flex',
				flexFlow: 'wrap',
			});
			return style;
		}
	}
	return (
		<Grid item sm={10} xs={10} sx={gridStyling()}>
			{/* <Typography
				variant='h3'
				color={'primary.main'}
				textAlign={'center'}
				sx={{ fontFamily: 'Baskervville', marginBottom: '30px', marginLeft: "32vw" }}>
				Time Off Request
			</Typography> */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column-reverse',
					width: '85vw',
					height: '80vh',
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}>
				<Box>
					{props.level === 2 ? (
						<AllTimeOffReqs current={props.current} level={props.level} />
					):(
						<EmpTimeOffReq  current={props.current} level={props.level}/>
					)}
					
				</Box>
				<NewTimeOffRequest
					_id={props._id}
					level={props.level}
					themeColor={props.themeColor}
					refetch={refetch}
				/>
			</Box>
			<Typography
				variant='p'
				component='div'
				sx={{
					color: 'primary',
					textAlign: 'center',
					fontSize: '13px',
					position: 'fixed',
					bottom: '5px',
					width: '80%',
				}}>
				Iruna Digital Inc 2022 - V2.0
			</Typography>
		</Grid>
	);
}

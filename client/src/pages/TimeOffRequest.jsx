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
import { QUERY_TIME_OFF_REQ_BY_UID, QUERY_ALL_TIME_OFF_REQS } from '../utils/queries';

import { DateRange } from 'react-date-range';
import { addDays, format, isWeekend } from 'date-fns';
import NewTimeOffRequest from '../components/newTimeOffRequest';

import AllTimeOffReqs from '../components/AllTimeOffReqs';

export default function TimeOffRequest(props) {
	const { loading, data, refetch } = useQuery(QUERY_TIME_OFF_REQ_BY_UID, {
		variables: { employeeUId: props._id },
	});

	const timeOffReqs = data?.timeOffReqByUid || [];
	return (
		<Grid
			item
			sm={10}
			xs={10}
			margin={'100px 150px 200px 200px'}
			sx={{ width: '100%', height: '100%' }}>
			<Typography
				variant='h3'
				color={'primary.main'}
				textAlign={'center'}
				sx={{ fontFamily: 'Baskervville', marginBottom: '15px' }}>
				Time Off Request
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					width: '85vw',
					height: '80vh',
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}>
				<Box sx={{ width: '45%' }}>
					<TableContainer>
						<Table aria-label='simple table'>
							<TableHead>
								<TableRow>
								{props.level === 2 ? (
									<TableCell align='center'>Employee</TableCell>
								):(
									<div></div>
								)}
									<TableCell align='center'>Start Date</TableCell>
									<TableCell align='center'>End Date</TableCell>
									<TableCell align='center'>Reason</TableCell>
									<TableCell align='center'>Status</TableCell>
									{props.level === 2 ? (
									<TableCell align='center'>Approver</TableCell>
								):(
									<div></div>
								)}
								</TableRow>
							</TableHead>
							{props.level === 2 ? (
								<AllTimeOffReqs/>
							) : (
								<TableBody>
									{timeOffReqs.map((req) => (
										<TableRow
											// onClick={(event) => {
											// 	console.log(event.target.parentNode.dataset.id);
											// }}
											hover={true}
											data-id={req._id}
											key={req._id}
											sx={{
												'&:last-child td, &:last-child th': { border: 0 },
											}}>
											<TableCell align='center'>
												{dateFormat(parseInt(req.startingDate)).split('at')[0]}
											</TableCell>
											<TableCell align='center'>
												{dateFormat(parseInt(req.endDate)).split('at')[0]}
											</TableCell>
											<TableCell align='center'>{req.reason}</TableCell>
											<TableCell align='center'>{req.status}</TableCell>
										</TableRow>
									))}
								</TableBody>
							)}
						</Table>
					</TableContainer>
				</Box>
				<NewTimeOffRequest
					_id={props._id}
					level={props.level}
					themeColor={props.themeColor}
					refetch={refetch}
				/>
			</Box>
		</Grid>
	);
}

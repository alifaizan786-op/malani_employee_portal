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

export default function AllTimeOffReqs() {
	const { loading, data, refetch } = useQuery(QUERY_ALL_TIME_OFF_REQS);

	const timeOffReqs = data?.timeOffReq || [];

    console.log(timeOffReqs);

	return (
		<TableBody>
			{timeOffReqs.map((req) => (
				<TableRow
					onClick={(event) => {
						console.log(event.target.parentNode.dataset.id);
					}}
					hover={true}
					data-id={req._id}
					key={req._id}
					sx={{
						'&:last-child td, &:last-child th': { border: 0 },
					}}>
                        <TableCell align='center'>{req.employee.employeeId}</TableCell>
                    
					<TableCell align='center'>
						{dateFormat(parseInt(req.startingDate)).split('at')[0]}
					</TableCell>
					<TableCell align='center'>
						{dateFormat(parseInt(req.endDate)).split('at')[0]}
					</TableCell>
					<TableCell align='center'>{req.reason}</TableCell>
					<TableCell align='center'>{req.status}</TableCell>
                    <TableCell align='center'>{req.approver?.employeeId ? req.approver.employeeId : "Null"}</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

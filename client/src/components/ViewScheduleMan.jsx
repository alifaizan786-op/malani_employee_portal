import React from 'react';

import { Box } from '@mui/material';

import { useQuery } from '@apollo/client';
import { QUERY_ALL_ACTIVE_SCHED } from '../utils/queries';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TextField from '@mui/material/TextField';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

export default function ViewScheduleMan(props) {
	const { loading, data } = useQuery(QUERY_ALL_ACTIVE_SCHED);

	const schedule = data?.schedule || [];

	const [value, setValue] = React.useState(Dayjs);

	const [dayOfWeek, setdayOfWeek] = React.useState(
		getTodayDay(new Date().getDay())
	);

	function getTodayDay(getDayParam) {
		if (getDayParam === 0) {
			return 'sunday';
		} else if (getDayParam === 1) {
			return 'monday';
		} else if (getDayParam === 2) {
			return 'tuesday';
		} else if (getDayParam === 3) {
			return 'wednesday';
		} else if (getDayParam === 4) {
			return 'thursday';
		} else if (getDayParam === 5) {
			return 'friday';
		} else {
			return 'saturday';
		}
	}



	function tableObj(day) {
		let tempArr = [];
		for (let i = 0; i < schedule.length; i++) {
			let todaySched = schedule[i].schedule.filter(
				(sched) => sched.dayOfWeek === day
			)[0];
			if (todaySched.isPresent === true) {
				let tempObj = {
					emp: schedule[i].employee.employeeId,
					timeIn: todaySched.timeIn,
					timeOff: todaySched.timeIn,
				};
				tempArr.push(tempObj);
			}
		}
		return tempArr;
	}



	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return (
		<Box sx={{ display: 'flex', minHeight: '80vh' }}>
			<Box sx={{ width: '50%', margin: 'auto' }}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<StaticDatePicker
						orientation='portrait'
						openTo='day'
						value={value}
						onChange={(newValue) => {
							setValue(newValue);
							setdayOfWeek(getTodayDay(newValue.day()));
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
			</Box>

			<Box sx={{ width: '50%', margin: 'auto' }}>
				<TableContainer component={Paper}>
					<Table aria-label='simple table' size='small'>
						<TableHead>
							<TableRow>
								<TableCell align='center'>Employee Id</TableCell>
								<TableCell align='center'>Time-In</TableCell>
								<TableCell align='center'>Time-Off</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tableObj(dayOfWeek).map((emp, index) => (
								<TableRow
									key={index}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row' align='center'>
										{emp.emp}
									</TableCell>
									<TableCell align='center'>{emp.timeIn}</TableCell>
									<TableCell align='center'>{emp.timeOff}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
}

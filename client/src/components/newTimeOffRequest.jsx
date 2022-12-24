import React from 'react';

import { useMutation } from '@apollo/client';
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from '@mui/material';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Auth from '../utils/auth';
import { NEW_TIME_OFF_REQUEST } from '../utils/mutation';
import { QUERY_ALL_TIME_OFF_REQS } from '../utils/queries';


import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';

export default function NewTimeOffRequest(props) {
	const [newTimeOffRequest, { event, data }] =
		useMutation(NEW_TIME_OFF_REQUEST, {
			update(cache, { data: { newTimeOffRequest } }) {
				try {
					const { timeOffReq } = cache.readQuery({
						query: QUERY_ALL_TIME_OFF_REQS,
					});

					cache.writeQuery({
						query: QUERY_ALL_TIME_OFF_REQS,
						data: { timeOffReq: [newTimeOffRequest, ...timeOffReq] },
					});
				} catch (e) {
					console.error(e);
				}
			}
		});

	const [dateRange, setDateRange] = React.useState([
		{
			startDate: addDays(new Date(), 31),
			endDate: addDays(new Date(), 37),
			key: 'selection',
		},
	]);

	// const [employee, setEmployee] = React.useState(props.level == 1 ? props._id : '');

	React.useEffect(() => {
		handleDateChange();
	}, dateRange);

	React.useEffect(() => {
		if (Auth.getProfile().data.level === 1) {
			setFormState({
				employee: Auth.getProfile().data._id,
				startingDate: dateRange[0].startDate.toISOString(),
				endDate: dateRange[0].endDate.toISOString(),
				reason: '',
				status: 'pending',
			});
		} else {
			setFormState({
				employee: '',
				startingDate: dateRange[0].startDate.toISOString(),
				endDate: dateRange[0].endDate.toISOString(),
				reason: '',
				status: 'approved',
				approver: Auth.getProfile().data._id,
			});
		}
	}, []);

	const [formState, setFormState] = React.useState({
		employee: Auth.getProfile().data._id,
		startingDate: dateRange[0].startDate.toISOString(),
		endDate: dateRange[0].endDate.toISOString(),
		reason: '',
		status: 'pending',
	});

	const handleDateChange = () => {
		setFormState({
			...formState,
			startingDate: dateRange[0].startDate.toISOString(),
			endDate: dateRange[0].endDate.toISOString(),
		});
	};

	const handleFormChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleEmployeeChange = (event) => {
		setFormState({
			...formState,
			employee: event.target.value,
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await newTimeOffRequest({
				variables: { ...formState },
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				{props.level === 1 ? (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-evenly',
							alignItems: 'center',
							width: '80vw',
						}}>
						<DateRange
							editableDateInputs={true}
							onChange={(item) => {
								setDateRange([item.selection]);
							}}
							ranges={dateRange}
							rangeColors={[props.themeColor]}
							color={props.themeColor}
							minDate={addDays(new Date(), 30)}
							months={2}
							direction='horizontal'
							scroll={{ enabled: false }}
							// preventSnapRefocus={true}
							// moveRangeOnFirstSelection={true}
						/>
						<FormControl>
							<TextField
								id='outlined-multiline-flexible'
								label='Reason'
								name='reason'
								required
								multiline
								minRows={10}
								value={formState.reason}
								onChange={handleFormChange}
								sx={{ width: '30vw' }}
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								onClick={handleFormSubmit}
								sx={{
									fontSize: '20px',
									bgcolor: 'primary.main',
									color: 'primary.light',
									borderRadius: '10px',
									marginTop: '20px',
								}}>
								Submit
							</Button>
						</FormControl>
					</Box>
				) : (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-evenly',
							alignItems: 'center',
							width: '80vw',
						}}>
						<DateRange
							editableDateInputs={true}
							onChange={(item) => {
								setDateRange([item.selection]);
							}}
							ranges={dateRange}
							rangeColors={[props.themeColor]}
							color={props.themeColor}
							months={2}
							direction='horizontal'
							scroll={{ enabled: false }}
							// preventSnapRefocus={true}
							// moveRangeOnFirstSelection={true}
						/>
						<FormControl>
							<InputLabel id='demo-simple-select-label'>Employee</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								variant='outlined'
								id='demo-simple-select'
								value={formState.employee}
								label='Employee'
								name='employee'
								onChange={handleEmployeeChange}>
								{props.allusers &&
									props.allusers.map((employee) => (
										<MenuItem key={employee._id} value={employee._id}>
											{employee.firstName} {employee.lastName}
										</MenuItem>
									))}
							</Select>
							<TextField
								id='outlined-multiline-flexible'
								label='Reason'
								name='reason'
								required
								multiline
								minRows={6}
								value={formState.reason}
								onChange={handleFormChange}
								sx={{ width: '30vw', marginTop: '20px' }}
							/>
							<Button
								type='submit'
								fullWidth
								variant='text'
								onClick={handleFormSubmit}
								sx={{
									fontSize: '20px',
									// bgcolor: 'primary.main',
									color: 'primary.main',
									borderRadius: '10px',
									marginTop: '20px',
								}}>
								Pre Approved Time Off Request
							</Button>
						</FormControl>
					</Box>
				)}
			</Box>
		</>
	);
}

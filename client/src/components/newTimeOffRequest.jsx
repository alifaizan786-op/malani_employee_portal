import React from 'react';

import { Grid } from '@mui/material';

import { useQuery } from '@apollo/client';
import { QUERY_SCHED_BY_UID } from '../utils/queries';
import { NEW_TIME_OFF_REQUEST } from '../utils/mutation';
import { useMutation } from '@apollo/client';
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
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import { addDays, format, isWeekend } from 'date-fns';

export default function NewTimeOffRequest(props) {
	const [newTimeOffRequest, { event, data }] =
		useMutation(NEW_TIME_OFF_REQUEST);

	const [dateRange, setDateRange] = React.useState([
		{
			startDate: addDays(new Date(), 31),
			endDate: addDays(new Date(), 37),
			key: 'selection',
		},
	]);

	React.useEffect(()=>{
		handleDateChange();
	}, dateRange)

	const [formState, setFormState] = React.useState({
		employee: props._id,
		startingDate: '',
		endDate: '',
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
			employee: props._id,
			[name]: value,
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
		props.refetch();
	};

	console.log(formState);
	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
				<DateRange
					editableDateInputs={true}
					onChange={(item) => {
						console.log(item);
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
				{props.level === 1 ? (
					<>
						<FormControl>
							<TextField
								id='outlined-multiline-flexible'
								label='Reason'
								name='reason'
								required
								multiline
								minRows={4}
								value={formState.reason}
								onChange={handleFormChange}
							/>
						</FormControl>
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
					</>
				) : (
					<div></div>
				)}
			</Box>
		</>
	);
}

import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DELETE_TASK } from '../utils/mutation';
import { QUERY_ALLTASKS } from '../utils/queries';

import { useMutation, useQuery } from '@apollo/client';

import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 5,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-around',
	minWidth: '50%',
	minHeight: '80%',
	borderRadius: '30px',
};

export default function BulkDeleteTask(props) {
	const { loading, data, refetch } = useQuery(QUERY_ALLTASKS);
	const [deleteTask, { error }] = useMutation(DELETE_TASK);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const tasks = data?.tasks || [];

	const [dateRange, setDateRange] = React.useState([
		{
			startDate: addDays(new Date(), 31),
			endDate: addDays(new Date(), 37),
			key: 'selection',
		},
	]);

	const [employeeId, setEmployeeId] = React.useState('');

	console.log(employeeId);

	console.log(Date.parse(new Date(dateRange[0].endDate)));

	console.log(tasks);

	const handleSubmit = async (event) => {
		event.preventDefault();

		let taskByEmployee = tasks.filter(
			(task) => task.user.employeeId === employeeId
		);

		console.log(taskByEmployee);

		let taskByDate = taskByEmployee.filter(
			(task) =>
				parseInt(task.dueDate) >=
					Date.parse(new Date(dateRange[0].startDate)) &&
				parseInt(task.dueDate) <= Date.parse(new Date(dateRange[0].endDate))
		);

		console.log(taskByDate);
		try {
			for (let i = 0; i < taskByDate.length; i++) {
				const element = taskByDate[i];
				const { data } = await deleteTask({
					variables: { _id: element._id },
				});
			}

			enqueueSnackbar(`${taskByDate.length} Tasks Deleted Successfully`, {
				variant: 'success',
			});
			props.close();
			props.refetch();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<Modal open={props.current} onClose={props.close}>
				<Box sx={style}>
					<Typography
						variant='h3'
						sx={{
							fontFamily: 'Baskervville',
							textAlign: 'center',
							marginY: '5px',
						}}>
						Bulk Delete Task
					</Typography>
					<FormControl sx={{ m: 1, minWidth: '20%' }}>
						<InputLabel id='demo-simple-select-label'>Employee</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={employeeId}
							label='Status'
							onChange={(event) => setEmployeeId(event.target.value)}>
							{props.allUser &&
								props.allUser.map((employee, index) => (
									<MenuItem key={index} value={`${employee.employeeId}`}>
										{employee.employeeId}
									</MenuItem>
								))}
						</Select>
					</FormControl>
					<DateRange
						editableDateInputs={true}
						onChange={(item) => {
							setDateRange([item.selection]);
						}}
						ranges={dateRange}
						rangeColors={[props.themeColor]}
						color={props.themeColor}
						// minDate={addDays(new Date(), 30)}
						months={2}
						direction='horizontal'
						scroll={{ enabled: false }}
						// preventSnapRefocus={true}
						// moveRangeOnFirstSelection={true}
					/>
					<Button
						type='submite'
						onClick={handleSubmit}
						variant='text'
						startIcon={<DeleteIcon />}
						sx={{
							fontSize: '0.8125rem',
							bgcolor: '#ffffff',
							color: 'red',
						}}>
						Bulk Delete Tasks
					</Button>
				</Box>
			</Modal>
		</>
	);
}

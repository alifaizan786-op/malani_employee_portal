import React from 'react';

import { useQuery } from '@apollo/client';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { QUERY_TASKBYEMP } from '../utils/queries';

import CircleIcon from '@mui/icons-material/Circle';
import LinearProgress from '@mui/material/LinearProgress';
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport
} from '@mui/x-data-grid';

import SubmitTask from '../components/SubmitTask';

import ClearIcon from '@mui/icons-material/Clear';


import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const dateFormat = require('../utils/dateFormat');

export default function ViewAllTasksEmp(props) {
	console.log('ViewAllTasksEmp');

	const { loading, data, refetch } = useQuery(QUERY_TASKBYEMP, {
		variables: { emp: props._id },
	});

	const tasks = data?.taskByEmp || [];

	document.title = 'View All Tasks';

	function dotColor(status) {
		//color or statusbar
		if (status.toLowerCase() === 'submitted') {
			let style = {
				color: 'green',
			};
			return style;
		} else if (status.toLowerCase() === 'pending') {
			let style = {
				color: 'yellow',
			};
			return style;
		} else if (status.toLowerCase() === 'absent') {
			let style = {
				color: '#ff8f33',
			};
			return style;
		} else {
			let style = {
				color: 'red',
			};
			return style;
		}
	}
	const [status, setStatus] = React.useState('');
	const [employeeId, setEmployeeId] = React.useState('');
	const [dueDate, setDueDate] = React.useState(null);

	const handleChangeStatus = (event) => {
		setStatus(event.target.value);
	};

	const columns = [
		{
			field: '',
			renderCell: (params) => {
				return <CircleIcon sx={dotColor(params.row.status)} />;
			},
			width: 50,
		},
		{
			field: 'status',
			type: 'singleSelect',
			valueOptions: ['Submitted', 'Pending', 'Over Due'],
			headerName: 'Status',
			width: 130,
		},
		{
			field: 'dueDate',
			tpe: 'dateTime',
			headerName: 'Due Date',
			width: 225,
			valueGetter: (params) => `${dateFormat(parseInt(params.row.dueDate))}`,
		},
		{ field: 'description', headerName: 'Description', width: 850 },
		{ field: 'subStatus', headerName: 'Sub Status', width: 150 },
		{
			field: 'Submit Task',
			renderCell: (params) => {
				if (
					params.row.status !== 'pending' &&
					params.row.status !== 'overdue'
				) {
					return <></>;
				} else {
					return <SubmitTask _id={params.row._id} refetch={refetch} />;
				}
			},
			width: 350,
		},
	];

	function CustomToolbar() {
		//CustomToolbar for manager & employee
		return (
			<GridToolbarContainer
				sx={{ justifyContent: 'space-between', padding: '0% 5%' }}>
				<FormControl sx={{ m: 1, minWidth: '20%' }}>
					<InputLabel id='demo-simple-select-label'>Status</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						variant='outlined'
						id='demo-simple-select'
						value={status}
						label='Status'
						onChange={handleChangeStatus}>
						<MenuItem value={''}>Status</MenuItem>
						<MenuItem value={'pending'}>Pending</MenuItem>
						<MenuItem value={'overdue'}>Overdue</MenuItem>
						<MenuItem value={'submitted'}>Submitted</MenuItem>
					</Select>
				</FormControl>
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
					sx={{ m: 1, minWidth: '20%' }}>
					<DatePicker
						label='Due Date'
						value={dueDate}
						clearable
						error={false}
						onChange={(newValue) => {
							setDueDate(newValue);
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
				<Button
					type='submit'
					onClick={() => {
						setStatus('');
						setEmployeeId('');
						setDueDate(null);
					}}
					variant='text'
					startIcon={<ClearIcon />}
					sx={{
						fontSize: '0.8125rem',
						bgcolor: '#ffffff',
						color: 'primary.main',
					}}>
					Clear Filters
				</Button>
				<GridToolbarColumnsButton />
				<GridToolbarDensitySelector />
				<GridToolbarExport />
			</GridToolbarContainer>
		);
	}

	const rows = [...filters(status, dueDate)];

	function filters(status, dueDate) {
		//Task Filter bar
		if (status && dueDate) {
			const resultbystatus = tasks.filter((task) => task.status === status);
			const resultbyyear = resultbystatus.filter(
				(task) =>
					new Date(parseInt(task.dueDate)).getYear() === dueDate.getYear()
			);
			const resultbymonth = resultbyyear.filter(
				(task) =>
					new Date(parseInt(task.dueDate)).getMonth() === dueDate.getMonth()
			);
			const resultbydate = resultbymonth.filter(
				(task) =>
					new Date(parseInt(task.dueDate)).getDate() === dueDate.getDate()
			);
			return resultbydate;
		} else if (status) {
			const rresultbystatus = tasks.filter((task) => task.status === status);
			return rresultbystatus;
		} else if (dueDate) {
			const resultbyyear = tasks.filter(
				(task) =>
					new Date(parseInt(task.dueDate)).getYear() === dueDate.getYear()
			);
			const resultbymonth = resultbyyear.filter(
				(task) =>
					new Date(parseInt(task.dueDate)).getMonth() === dueDate.getMonth()
			);
			const resultbydate = resultbymonth.filter(
				(task) =>
					new Date(parseInt(task.dueDate)).getDate() === dueDate.getDate()
			);
			return resultbydate;
		} else {
			return tasks;
		}
	}

	function gridStyling() {
		//grid Styling
		if (props.current) {
			let style = (theme) => ({
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginTop: '75px',
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
				marginTop: '75px',
				marginLeft: '80px',
				display: 'flex',
				flexFlow: 'wrap',
			});
			return style;
		}
	}

	function dataGridStyling() {
		//data grid of task
		if (props.current) {
			let style = (theme) => ({
				transition: theme.transitions.create('minWidth', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				height: '91.5vh',
				minWidth: '87vw',
			});
			return style;
		} else {
			let style = (theme) => ({
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				height: '91.5vh',
				minWidth: '95.5vw',
			});
			return style;
		}
	}

	return (
		<Grid item sm={10} xs={10} sx={gridStyling()}>
			<DataGrid
				rows={rows}
				columns={columns}
				sx={dataGridStyling()}
				components={{
					Toolbar: CustomToolbar,
					LoadingOverlay: LinearProgress,
				}}
				loading={loading}
				disableColumnMenu
				getRowId={(row) => row._id}
			/>

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

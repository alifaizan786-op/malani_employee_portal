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
import { QUERY_ALLTASKS } from '../utils/queries';

import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinearProgress from '@mui/material/LinearProgress';
import {
	DataGrid,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport
} from '@mui/x-data-grid';
import BulkDeleteTask from '../components/BulkDeleteTask';
import CreateTask from '../components/CreateTask';
import EditTaskModal from '../components/EditTaskModal';

import DeleteTask from '../components/DeleteTask';
import SubmitTask from '../components/SubmitTask';

import ClearIcon from '@mui/icons-material/Clear';

import { DatePicker, LocalizationProvider } from '@mui/lab';

import AdapterDateFns from '@mui/lab/AdapterDateFns';

const dateFormat = require('../utils/dateFormat');

export default function ViewAllTasks(props) {
	const { loading, data, refetch } = useQuery(QUERY_ALLTASKS);

	const tasks = data?.tasks || [];

	const user = data?.userActive || [];

	document.title = 'View All Tasks';

	const [createModal, setCreateModal] = React.useState(false);

	const [createBulkDelete, setCreateBulkDelete] = React.useState(false);

	const handleCreateModalOpen = () => setCreateModal(true);

	const handleCreateModalClose = () => setCreateModal(false);

	const handlecreateBulkDeleteOpen = () => setCreateBulkDelete(true);

	const handlecreateBulkDeleteClose = () => setCreateBulkDelete(false);

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
	const handleChangeEmployeeId = (event) => {
		setEmployeeId(event.target.value);
	};

	const columns = checkLevelColumn();

	let dropdown = () => {
		let arrOfEmps = [];
		for (let i = 0; i < user.length; i++) {
			arrOfEmps.push(user[i].employeeId);
		}
		arrOfEmps.sort();
		return arrOfEmps;
	};

	function CustomToolbar() {
		//CustomToolbar for manager & employee
		if (props.level === 2) {
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
					<FormControl sx={{ m: 1, minWidth: '20%' }}>
						<InputLabel id='demo-simple-select-label'>Employee</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={employeeId}
							label='Status'
							onChange={handleChangeEmployeeId}>
							{dropdown().map((employee, index) => (
								<MenuItem key={index} value={`${employee}`}>
									{employee}
								</MenuItem>
							))}
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
					{/* <GridToolbarDensitySelector /> */}
					<GridToolbarExport />
					<Button
						type='submit'
						onClick={handleCreateModalOpen}
						variant='text'
						startIcon={<AddIcon />}
						sx={{
							fontSize: '0.8125rem',
							bgcolor: '#ffffff',
							color: 'primary.main',
						}}>
						Create Task
					</Button>

					<Button
						type='submit'
						onClick={handlecreateBulkDeleteOpen}
						variant='text'
						startIcon={<DeleteIcon />}
						sx={{
							fontSize: '0.8125rem',
							bgcolor: '#ffffff',
							color: 'primary.main',
						}}>
						Bulk Delete Task
					</Button>
				</GridToolbarContainer>
			);
		} else {
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
	}

	const rows = [...filters(employeeId, status, dueDate)];

	function filters(id, status, dueDate) {
		//Task Filter bar
		if (id && status && dueDate) {
			const resultbyuid = tasks.filter((task) => task.user.employeeId === id);
			const resultbystatus = resultbyuid.filter(
				(task) => task.status === status
			);
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
		} else if (status && dueDate) {
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
		} else if (status && id) {
			const resultbystatus = tasks.filter((task) => task.status === status);
			const resultbyuid = resultbystatus.filter(
				(task) => task.user.employeeId === id
			);
			return resultbyuid;
		} else if (id && dueDate) {
			const resultbyuid = tasks.filter((task) => task.user.employeeId === id);
			const resultbyyear = resultbyuid.filter(
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
		} else if (id) {
			const resultbyuid = tasks.filter((task) => task.user.employeeId === id);
			return resultbyuid;
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

	React.useEffect(() => {
		if (props.level === 1) {
			setEmployeeId(props.employeeId);
		}
	});

	function checkLevelColumn() {
		// check and show task according to manager & employee
		if (props.level === 1) {
			let columns = [
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
					valueGetter: (params) =>
						`${dateFormat(parseInt(params.row.dueDate))}`,
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
			return columns;
		} else {
			let columns = [
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
					valueOptions: ['submitted', 'pending', 'overdue'],
					headerName: 'Status',
					width: 130,
				},
				{
					field: 'name',
					headerName: 'Name',
					width: 150,
					valueGetter: (params) =>
						`${params.row.user.firstName} ${params.row.user.lastName}`,
				},
				{
					field: 'dueDate',
					tpe: 'dateTime',
					headerName: 'Due Date',
					width: 225,
					valueGetter: (params) =>
						`${dateFormat(parseInt(params.row.dueDate))}`,
				},
				{ field: 'description', headerName: 'Description', width: 850 },
				{ field: 'subStatus', headerName: 'Sub Status', width: 150 },
				{
					field: 'Edit',
					renderCell: (params) => {
						return (
							<Button
								type='submit'
								onClick={() => {
									handleEditModal(params.row._id);
								}}
								variant='text'
								startIcon={<EditIcon />}
								sx={{
									fontSize: '0.8125rem',
									bgcolor: '#ffffff',
									color: 'primary.main',
								}}>
								Edit
							</Button>
						);
					},
					width: 150,
				},
				{
					field: 'Delete',
					renderCell: (params) => {
						return <DeleteTask _id={params.row._id} refetch={refetch} />;
					},
					width: 150,
				},
			];
			return columns;
		}
	}

	const [editData, setEditData] = React.useState({});

	function handleEditModal(params) {
		const thisTask = tasks.filter((task) => task._id === params);
		setEditData(thisTask);
		handleEditModalOpen();
	}

	const [editModal, setEditModal] = React.useState(false);

	const handleEditModalOpen = () => setEditModal(true);

	const handleEditModalClose = () => setEditModal(false);

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

			<CreateTask
				modalState={createModal}
				closeModal={handleCreateModalClose}
				user={user}
				refetch={refetch}
			/>

			<EditTaskModal
				current={editModal}
				open={handleEditModalOpen}
				close={handleEditModalClose}
				defData={editData}
				refetch={refetch}
			/>

			<BulkDeleteTask
				current={createBulkDelete}
				open={handlecreateBulkDeleteOpen}
				close={handlecreateBulkDeleteClose}
				themeColor={props.themeColor}
				allUser={user}
				refetch={refetch}
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

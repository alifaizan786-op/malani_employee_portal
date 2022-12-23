import React from 'react';

import { Avatar, Button, Card, Divider, Typography } from '@mui/material';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import EmployeeModal from './EmployeeModal';

import { useQuery } from '@apollo/client';
import { QUERY_TASKBYEMP } from '../utils/queries';

const divStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	margin: '5px 30px',
	opacity: '0.8',
};

const dividerStyle = {
	margin: '0px 30px 13px 30px',
};

export default function EmployeeCard(props) {
	const [viewModal, setViewModal] = React.useState(false);

	const handleViewModalOpen = () => setViewModal(true);

	const handleViewModalClose = () => setViewModal(false);

	const { loading, data } = useQuery(QUERY_TASKBYEMP, {
		// pass URL parameter
		variables: { emp: props._id },
		pollInterval: 500,
	});

	const tasks = data?.taskByEmp || [];
	const schedule = data?.scheduleByUid || [];

	// const pending = tasks.filter((task)=> task.status === 'pending')
	// const submitted = tasks.filter((task)=> task.status === 'submitted')
	// const overdue = tasks.filter((task)=> task.status === 'overdue')

	function initial() {
		if (props.employeeId) {
			return props.employeeId.split('-')[1].toUpperCase();
		}
	}

	function style(isActive) {
		if (isActive == 'true') {
			let styles = {
				divStyle: {
					display: 'flex',
					justifyContent: 'space-between',
					margin: '5px 30px',
				},
				avatarStyleBtn: {
					width: 50,
					height: 50,
					marginLeft: '250px',
					marginTop: '5px',
					bgcolor: '#ffffff',
					border: '3px solid #D2AB67',
					color: 'primary.main',
				},
				avatarStyleIni: {
					width: 100,
					height: 100,
					fontSize: '45px',
					bgcolor: '#ffffff',
					border: '3px solid #D2AB67',
					fontFamily: 'Baskervville',
					color: 'primary.main',
					margin: 'auto',
				},
			};
			return styles;
		} else {
			let styles = {
				divStyle: {
					display: 'flex',
					justifyContent: 'space-between',
					margin: '5px 30px',
					color: '#878787',
				},
				avatarStyleBtn: {
					width: 50,
					height: 50,
					marginLeft: '250px',
					marginTop: '5px',
					bgcolor: '#ffffff',
					border: '3px solid #878787',
					color: '#878787',
				},
				avatarStyleIni: {
					width: 100,
					height: 100,
					fontSize: '45px',
					bgcolor: '#ffffff',
					border: '3px solid #878787',
					fontFamily: 'Baskervville',
					color: '#878787',
					margin: 'auto',
				},
			};
			return styles;
		}
	}

	return (
		<>
			<Card
				sx={{
					minHeight: '350px',
					minWidth: '325px',
					margin: '25px',
					boxShadow: 'none',
					borderRight: '1px solid black',
				}}>
				<Button onClick={handleViewModalOpen}>
					<Avatar sx={style(props.active).avatarStyleBtn}>
						<RemoveRedEyeIcon sx={{ fontSize: '2rem' }} />
					</Avatar>
				</Button>
				<Avatar sx={style(props.active).avatarStyleIni}>{initial()}</Avatar>
				<div style={style(props.active).divStyle}>
					<Typography variant='p'>Employee Id</Typography>
					<Typography variant='p'>{props.employeeId}</Typography>
				</div>
				<Divider sx={dividerStyle} />
				<div style={style(props.active).divStyle}>
					<Typography variant='p'>Tasks Completed</Typography>
					<Typography variant='p'>{props.taskStats.submitted}</Typography>
				</div>
				<Divider sx={dividerStyle} />
				<div style={style(props.active).divStyle}>
					<Typography variant='p'>Tasks Pending</Typography>
					<Typography variant='p'>{props.taskStats.pending}</Typography>
				</div>
				<Divider sx={dividerStyle} />
				<div style={style(props.active).divStyle}>
					<Typography variant='p'>Tasks Overdue</Typography>
					<Typography variant='p'>{props.taskStats.overdue}</Typography>
				</div>
				<Divider sx={dividerStyle} />
				<div style={style(props.active).divStyle}>
					<Typography variant='p'>Days Taken Off</Typography>
					<Typography variant='p'>{props.ttlDayOff}</Typography>
				</div>
				<Divider sx={dividerStyle} />
			</Card>
			<EmployeeModal
				open={handleViewModalOpen}
				close={handleViewModalClose}
				state={viewModal}
				fName={props.firstName}
				lName={props.lastName}
				empId={props.employeeId}
				pending={props.taskStats.pending}
				overdue={props.taskStats.overdue}
				submitted={props.taskStats.submitted}
				dept={props.department}
				active={props.active}
				_id={props._id}
				level={props.level}
				managerId={props.managerId}
				schedule={schedule.schedule}
			/>
		</>
	);
}

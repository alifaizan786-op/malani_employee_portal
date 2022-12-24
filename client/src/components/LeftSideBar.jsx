//From React
import React from 'react';
import Auth from '../utils/auth';

//From MUI
import { makeStyles } from '@material-ui/core';
import { Logout } from '@mui/icons-material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SettingsIcon from '@mui/icons-material/Settings';
import TaskIcon from '@mui/icons-material/Task';
import {
	Avatar,
	Badge,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { useQuery } from '@apollo/client';
import { QUERY_TASKBYEMP } from '../utils/queries';

const useStyles = makeStyles((theme) => ({
	sidebarPadding: {
		paddingTop: '100px',
	},
	root: {
		'& .MuiPaper-root': {
			display: 'flex',
			backgroundColor: 'rgba(255,255,255,0.7)',
			justifyContent: 'space-between',
		},
	},
}));

const HtmlTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9',
	},
}));

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,

	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

export default function LeftSideBar(props) {
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	const classes = useStyles();

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};

	const { loading, data } = useQuery(QUERY_TASKBYEMP, {
		// pass URL parameter
		variables: { emp: props.objId },
	});

	const tasks = data?.taskByEmp || [];

	const bulletin = data?.bulletins || [];

	let acknowledged = 0;

	// for (let i = 0; i < bulletin.length; i++) {
	//   if (bulletin[i].acknowledge.filter((emp) => emp._id === props.objId).length > 0) {
	//     acknowledged++;
	//   }
	// }

	function initial() {
		if (props.employeeId) {
			return props.employeeId.split('-')[1].toUpperCase();
		}
	}

	function checkLevel() {
		if (props.level === 2) {
			return (
				<HtmlTooltip
					placement='right'
					title={
						<React.Fragment>
							<Typography color='inherit'>View All Employees</Typography>
						</React.Fragment>
					}>
					<ListItemButton
						selected={selectedIndex === 2}
						onClick={(event) => {
							handleListItemClick(event, 2);
							window.location.assign('/ViewAllEmps');
						}}>
						<ListItemIcon>
							<PeopleIcon sx={{ fontSize: '2.0rem', color: 'primary.main' }} />
						</ListItemIcon>
						<ListItemText
							primary={
								<Typography
									style={{
										fontSize: '18px',
										fontWeight: 'bold',
										fontFamily: 'Baskervville',
									}}>
									View All Employees
								</Typography>
							}
						/>
					</ListItemButton>
				</HtmlTooltip>
			);
		}
	}

	return (
		<>
			<Drawer
				variant='permanent'
				sx={{ border: 'none' }}
				open={props.current}
				className={classes.root}>
				<List className={classes.sidebarPadding}>
					<ListItem>
						{props.current ? (
							<Avatar
								sx={{
									width: 150,
									height: 150,
									fontSize: '75px',
									marginLeft: '47px',
									bgcolor: '#ffffff',
									border: '5px solid #D2AB67',
									fontFamily: 'Baskervville',
									color: 'primary.main',
								}}>
								{initial()}
							</Avatar>
						) : (
							<ListItemIcon>
								<Avatar
									sx={{
										width: 50,
										height: 50,
										fontSize: '20px',
										marginLeft: '-6px',
										bgcolor: '#ffffff',
										border: '3px solid #D2AB67',
										fontFamily: 'Baskervville',
										color: 'primary.main',
									}}>
									{initial()}
								</Avatar>
							</ListItemIcon>
						)}
					</ListItem>

					<ListItemButton>
						<ListItemIcon></ListItemIcon>
						<ListItemText
							primary={
								<Typography
									style={{ fontSize: '25px', fontFamily: 'Baskervville' }}>
									{props.firstName} {props.lastName}
								</Typography>
							}
						/>
					</ListItemButton>

					<HtmlTooltip
						placement='right'
						title={
							<React.Fragment>
								<Typography color='inherit'>View All Tasks</Typography>
							</React.Fragment>
						}>
						<ListItemButton
							selected={selectedIndex === 1}
							onClick={(event) => {
								handleListItemClick(event, 1);
								window.location.assign('/ViewAllTasks');
							}}>
							<ListItemIcon>
								<Badge
									badgeContent={
										tasks.filter((task) => task.status !== 'submitted').length
									}
									color='primary'>
									<TaskIcon
										sx={{ fontSize: '2.0rem', color: 'primary.main' }}
									/>
								</Badge>
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography
										style={{
											fontSize: '18px',
											fontWeight: 'bold',
											fontFamily: 'Baskervville',
										}}>
										View All Tasks
									</Typography>
								}
							/>
						</ListItemButton>
					</HtmlTooltip>

					<HtmlTooltip
						placement='right'
						title={
							<React.Fragment>
								<Typography color='inherit'>Announcement</Typography>
							</React.Fragment>
						}>
						<ListItemButton
							selected={selectedIndex === 1}
							onClick={(event) => {
								handleListItemClick(event, 1);
								window.location.assign('/Announcement');
							}}>
							<ListItemIcon>
								<Badge
									badgeContent={bulletin.length - acknowledged}
									color='primary'>
									<NewspaperIcon
										sx={{ fontSize: '2.0rem', color: 'primary.main' }}
									/>
								</Badge>
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography
										style={{
											fontSize: '18px',
											fontWeight: 'bold',
											fontFamily: 'Baskervville',
										}}>
										Announcement
									</Typography>
								}
							/>
						</ListItemButton>
					</HtmlTooltip>

					<HtmlTooltip
						placement='right'
						title={
							<React.Fragment>
								<Typography color='inherit'>Time Off Request</Typography>
							</React.Fragment>
						}>
						<ListItemButton
							selected={selectedIndex === 1}
							onClick={(event) => {
								handleListItemClick(event, 1);
								window.location.assign('/TimeOffRequest');
							}}>
							<ListItemIcon>
								<DateRangeIcon
									sx={{ fontSize: '2.0rem', color: 'primary.main' }}
								/>
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography
										style={{
											fontSize: '18px',
											fontWeight: 'bold',
											fontFamily: 'Baskervville',
										}}>
										Time Off Request
									</Typography>
								}
							/>
						</ListItemButton>
					</HtmlTooltip>

					<HtmlTooltip
						placement='right'
						title={
							<React.Fragment>
								<Typography color='inherit'>Schedule</Typography>
							</React.Fragment>
						}>
						<ListItemButton
							selected={selectedIndex === 1}
							onClick={(event) => {
								handleListItemClick(event, 1);
								window.location.assign('/Schedule');
							}}>
							<ListItemIcon>
								<ScheduleIcon
									sx={{ fontSize: '2.0rem', color: 'primary.main' }}
								/>
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography
										style={{
											fontSize: '18px',
											fontWeight: 'bold',
											fontFamily: 'Baskervville',
										}}>
										Schedule
									</Typography>
								}
							/>
						</ListItemButton>
					</HtmlTooltip>

					{checkLevel()}
				</List>

				<List>
					<HtmlTooltip
						placement='right'
						title={
							<React.Fragment>
								<Typography color='inherit'>Settings</Typography>
							</React.Fragment>
						}>
						<ListItemButton
							selected={selectedIndex === 3}
							onClick={(event) => {
								handleListItemClick(event, 3);
								window.location.assign('/Settings');
							}}>
							<ListItemIcon>
								<SettingsIcon
									sx={{ fontSize: '2.0rem', color: 'primary.main' }}
								/>
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography
										style={{
											fontSize: '18px',
											fontWeight: 'bold',
											fontFamily: 'Baskervville',
										}}>
										Settings
									</Typography>
								}
							/>
						</ListItemButton>
					</HtmlTooltip>

					<HtmlTooltip
						placement='right'
						title={
							<React.Fragment>
								<Typography color='inherit'>Logout</Typography>
							</React.Fragment>
						}>
						<ListItemButton onClick={Auth.logout}>
							<ListItemIcon>
								<Logout sx={{ fontSize: '2.0rem', color: 'primary.main' }} />
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography
										style={{
											fontSize: '18px',
											fontWeight: 'bold',
											fontFamily: 'Baskervville',
										}}>
										Logout
									</Typography>
								}
							/>
						</ListItemButton>
					</HtmlTooltip>
				</List>
			</Drawer>
		</>
	);
}

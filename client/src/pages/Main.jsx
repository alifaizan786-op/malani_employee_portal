//From React
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../components/Header';
import LeftSideBar from '../components/LeftSideBar';
import Bulletin from './Bulletin';
import Home from './Home';
import SchedulePage from './Schedule';
import SettingsPage from './SettingsPage';
import TimeOffRequest from './TimeOffRequest';
import ViewAllEmps from './ViewAllEmps';
import ViewAllTasks from './ViewAllTasks';

import { useQuery } from '@apollo/client';
import { QUERY_MAIN } from '../utils/queries';

//From Material UI
import { Grid } from '@mui/material';

export default function Main(props) {
	const [draweropen, setDrawerOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	const { data } = useQuery(QUERY_MAIN, { pollInterval: 500 });

	const user = data?.userId || [];
	const firstName = user.firstName || '';
	const lastName = user.lastName || '';
	const employeeId = user.employeeId || '';
	const department = user.department || '';
	const level = user.level || '';
	const _id = user._id || '';

	return (
		<Router>
			<Grid container>
				<Header
					open={handleDrawerOpen}
					close={handleDrawerClose}
					current={draweropen}
				/>
				<Grid item sm={2} xs={2}>
					<LeftSideBar
						open={handleDrawerOpen}
						close={handleDrawerClose}
						current={draweropen}
						firstName={firstName}
						lastName={lastName}
						level={level}
						employeeId={employeeId}
						objId={_id}
					/>
				</Grid>
			</Grid>
			<Route exact path={'/'}>
				<Home
					firstName={firstName}
					lastName={lastName}
					department={department}
					level={level}
				/>
			</Route>
			<Route exact path={'/ViewAllTasks'}>
				<ViewAllTasks
					level={level}
					employeeId={employeeId}
					current={draweropen}
					themeColor={props.themeColor}
				/>
			</Route>
			<Route exact path={'/ViewAllEmps'}>
				<ViewAllEmps level={level} _id={_id} />
			</Route>
			<Route exact path={'/Schedule'}>
				<SchedulePage _id={_id} level={level} />
			</Route>
			<Route exact path={'/Settings'}>
				<SettingsPage _id={_id} level={level} />
			</Route>
			<Route exact path={'/Announcement'}>
				<Bulletin _id={_id} level={level} />
			</Route>
			<Route exact path={'/TimeOffRequest'}>
				<TimeOffRequest
					_id={_id}
					level={level}
					themeColor={props.themeColor}
					current={draweropen}
				/>
			</Route>
		</Router>
	);
}

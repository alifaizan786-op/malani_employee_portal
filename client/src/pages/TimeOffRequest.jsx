import React from 'react';

import { Grid } from '@mui/material';

import { useQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { QUERY_ALLEMPS } from '../utils/queries';

import NewTimeOffRequest from '../components/newTimeOffRequest';

import AllTimeOffReqs from '../components/AllTimeOffReqs';

import EmpTimeOffReq from '../components/EmpTimeOffReq';

export default function TimeOffRequest(props) {
	const { data, loading } = useQuery(QUERY_ALLEMPS);

	const users = data?.users || [];

	function gridStyling() {
		//grid Styling
		if (props.current) {
			let style = (theme) => ({
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginTop: '140px',
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
				marginTop: '140px',
				marginLeft: '175px',
				display: 'flex',
				flexFlow: 'wrap',
			});
			return style;
		}
	}
	return (
		<Grid item sm={10} xs={10} sx={gridStyling()}>
			{/* <Typography
				variant='h3'
				color={'primary.main'}
				textAlign={'center'}
				sx={{ fontFamily: 'Baskervville', marginBottom: '30px', marginLeft: "32vw" }}>
				Time Off Request
			</Typography> */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column-reverse',
					width: '85vw',
					height: '80vh',
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}>
				<Box>
					{props.level === 2 ? (
						<AllTimeOffReqs current={props.current} level={props.level} />
					) : (
						<EmpTimeOffReq
							_id={props._id}
							current={props.current}
							level={props.level}
						/>
					)}
				</Box>
				<NewTimeOffRequest
					_id={props._id}
					level={props.level}
					themeColor={props.themeColor}
					allusers={users}
					// refetch={refetch}
				/>
			</Box>
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

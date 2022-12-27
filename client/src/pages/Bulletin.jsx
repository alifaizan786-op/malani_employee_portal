//From React
import * as React from 'react';

import { Grid } from '@mui/material';

import AddBulletinCard from '../components/AddBulletinCard';
import BulletinCard from '../components/BulletinCard';

import { useQuery } from '@apollo/client';
import { QUERY_ALL_BULLETIN } from '../utils/queries';

export default function Bulletin(props) {
	const { data, loading, refetch } = useQuery(QUERY_ALL_BULLETIN, {
	});

	const bulletin = data?.bulletins || [];

	function checkLevel() {
		if (props.level == 2) {
			return <AddBulletinCard _id={props._id} refetch={refetch} />;
		}
	}

	return (
		<Grid
			item
			sm={10}
			xs={10}
			sx={{
				marginTop: '100px',
				marginLeft: '250px',
				display: 'flex',
				flexFlow: 'wrap',
			}}>
			{checkLevel()}

			{bulletin.map((oneBulletin) => (
				<BulletinCard
					key={oneBulletin._id}
					title={oneBulletin.title}
					body={oneBulletin.body}
					date={oneBulletin.date}
					user={oneBulletin.user.employeeId}
					fName={oneBulletin.user.firstName}
					lName={oneBulletin.user.lastName}
					acknowledgeArr={oneBulletin.acknowledge}
					bulletInId={oneBulletin._id}
					_id={props._id}
					curUserLevel={props.level}
					refetch={refetch}
				/>
			))}
		</Grid>
	);
}

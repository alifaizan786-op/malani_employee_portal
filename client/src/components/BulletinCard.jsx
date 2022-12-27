import React from 'react';

import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	Typography,
} from '@mui/material';
import AcknowledgeBtn from './AcknowledgeButton';
import DeleteBulletin from './DeleteBulletin';

export default function BulletinCard(props) {
	function initial() {
		if (props.user) {
			return props.user.split('-')[1].toUpperCase();
		}
	}

	function CheckLevel() {
		if (props.curUserLevel == 2) {
			return <DeleteBulletin bulletInId={props.bulletInId} refetch={props.refetch} />;
		}
	}

	return (
		<Card
			sx={{
				minWidth: '88%',
				marginTop: '50px',
				boxShadow: 5,
				borderRadius: '16px',
				padding: '16px',
				paddingBottom: '0px',
			}}>
			<CardHeader
				avatar={
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
				}
				title={props.title}
				subheader={`${props.fName} ${props.lName} ${props.date}`}
			/>

			<CardContent>
				<Typography
					variant='body1'
					color='text.primary'
					style={{ whiteSpace: 'pre-line' }}>
					{props.body}
				</Typography>
			</CardContent>

			<Divider />

			<CardActions
				sx={{
					display: 'flex',
					justifyContent: 'space-around',
					paddingTop: '0px',
				}}>
				<AcknowledgeBtn
					curUserId={props._id}
					bulletInId={props.bulletInId}
					acknowledgeArr={props.acknowledgeArr}
				/>

				{CheckLevel()}
			</CardActions>
		</Card>
	);
}

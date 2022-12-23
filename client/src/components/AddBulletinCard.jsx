import { useMutation } from '@apollo/client';
import { Forward } from '@mui/icons-material';
import {
	Button,
	Card,
	CardActions,
	InputAdornment,
	OutlinedInput,
	TextField,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { ADD_BULLETIN } from '../utils/mutation';

export default function AddBulletinCard(props) {
	const [formState, setFormState] = React.useState({
		user: '',
		title: '',
		body: '',
	});

	const [addBulletin, { error, data }] = useMutation(ADD_BULLETIN);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			user: props._id,
			[name]: value,
		});
	};

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await addBulletin({
				variables: { ...formState },
			});
			props.refetch();
			enqueueSnackbar('Bulletin Posted Successfully', { variant: 'success' });
		} catch (e) {
			console.error(e);
		}
		setFormState({
			user: '',
			title: '',
			body: '',
		});
	};

	return (
		<Card
			sx={{
				minWidth: '88%',
				marginTop: '50px',
				boxShadow: 5,
				borderRadius: '16px',
				padding: '16px',
			}}>
			<OutlinedInput
				sx={{ mt: 1 }}
				startAdornment={<InputAdornment position='start'>Title</InputAdornment>}
				required
				fullWidth
				id='title'
				name='title'
				onChange={handleChange}
				value={formState.title}
			/>

			<TextField
				sx={{ mt: 1, minHeight: '89px' }}
				label='Body'
				name='body'
				multiline
				fullWidth
				onChange={handleChange}
				value={formState.body}
				minRows={4}
			/>

			<CardActions sx={{ minWidth: '100%' }}>
				<Button
					variant='outlined'
					fullWidth
					sx={{
						fontSize: '20px',
						margin: 'auto',
						color: 'primary.main',
					}}
					onClick={handleFormSubmit}>
					Post
					<Forward />
				</Button>
			</CardActions>
		</Card>
	);
}

import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { DELETE_BULLETIN } from '../utils/mutation';

export default function DeleteBulletin(props) {
	const [formState, setFormState] = React.useState({
		_id: props.bulletInId,
	});

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [deleteBulletin, { error, data }] = useMutation(DELETE_BULLETIN);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await deleteBulletin({
				variables: { ...formState },
			});
			enqueueSnackbar('Bulletin Deleted Successfully', { variant: 'success' });
		} catch (e) {
			console.error(e);
		}
		setFormState({
			_id: props.bulletInId,
		});
	};

	return (
		<Button onClick={handleFormSubmit} sx={{ color: 'red' }}>
			<DeleteIcon />
			Delete
		</Button>
	);
}

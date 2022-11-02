import React from 'react';

import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_TIME_OFF_REQ } from '../utils/mutation';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';

export default function DeleteTimeOffRequest(props) {
	const [deleteTimeOffReq, { error, data }] = useMutation(DELETE_TIME_OFF_REQ);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	console.log(props);

	const [formState, setFormState] = React.useState({
		id: props._id,
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		enqueueSnackbar('Time Off Request Deleted Successfully', { variant: 'success' });
		try {
			const { data } = await deleteTimeOffReq({
				variables: { ...formState },
			});
			console.log(data);
            props.refetch()
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Button
			type='submite'
			onClick={handleSubmit}
			variant='text'
			startIcon={<DeleteIcon />}
			sx={{
				fontSize: '0.8125rem',
				bgcolor: '#ffffff',
				color: 'red',
			}}>
			Delete
		</Button>
	);
}

import React from 'react';

import { useMutation } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { DELETE_TIME_OFF_REQ } from '../utils/mutation';

export default function DeleteTimeOffRequest(props) {
	const [deleteTimeOffReq, { error, data }] = useMutation(DELETE_TIME_OFF_REQ);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();


	const [formState, setFormState] = React.useState({
		id: props._id,
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		enqueueSnackbar('Time Off Request Deleted Successfully', {
			variant: 'success',
		});
		try {
			const { data } = await deleteTimeOffReq({
				variables: { ...formState },
			});
	
			props.refetch();
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

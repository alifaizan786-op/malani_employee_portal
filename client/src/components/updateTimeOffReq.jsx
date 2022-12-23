import React from 'react';

import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';

import { useMutation } from '@apollo/client';
import SaveIcon from '@mui/icons-material/Save';
import { useSnackbar } from 'notistack';
import { UPDATE_TIME_OFF_REQ } from '../utils/mutation';

export default function UpdateTimeOffReq(props) {
	const [updateTimeOffReq, { error, data }] = useMutation(UPDATE_TIME_OFF_REQ);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [formState, setFormState] = React.useState({
		id: props._id,
		employee: props.employee,
		startingDate: props.startingDate,
		endDate: props.endDate,
		reason: props.reason,
		approver: props.approver,
		status: props.status,
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (formState.subStatus === 'complete') {
			enqueueSnackbar('Time Off Request Updated', {
				variant: 'success',
			});
		}

		if (formState.status) {
			try {
				const { data } = await updateTimeOffReq({
					variables: { ...formState },
				});
			} catch (e) {
				console.log(e);
			}
		} else {
			enqueueSnackbar('Please Add Sub Status ', { variant: 'error' });
		}
	};

	return (
		<>
			<FormControl variant='standard' sx={{ m: 1, minWidth: '250px' }}>
				<InputLabel id='demo-simple-select-label'>Status</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select-size-medium'
					label='status'
					size='medium'
					sx={{ border: 'none' }}
					defaultValue={''}
					name='status'
					onChange={handleChange}>
					<MenuItem value={'approved'}>Approved</MenuItem>
					<MenuItem value={'denied'}>Denied</MenuItem>
					<MenuItem value={'Please_Come_See_Manager'}>
						Please Come See Manager
					</MenuItem>
				</Select>
			</FormControl>
			<Button
				type='submite'
				onClick={handleSubmit}
				variant='text'
				startIcon={<SaveIcon />}
				sx={{
					fontSize: '0.8125rem',
					bgcolor: '#ffffff',
					color: 'primary.main',
				}}>
				Save
			</Button>
		</>
	);
}

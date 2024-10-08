import React from 'react';

import { CREATE_USER } from '../utils/mutation';

import { useMutation } from '@apollo/client';

import { useSnackbar } from 'notistack';

import { QUERY_ALLEMPS } from '../utils/queries';


import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography
} from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 5,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-around',
	minWidth: '50%',
	minHeight: '80%',
	borderRadius: '30px',
};

export default function CreateEmployee(props) {
	const [createUser, { event, data }] = useMutation(CREATE_USER, {
		update(cache, { data: { createUser } }) {
			try {
				const { users } = cache.readQuery({ query: QUERY_ALLEMPS });
				cache.writeQuery({
					query: QUERY_ALLEMPS,
					data: { users: [createUser, ...users] },
				});
			} catch (e) {
				console.error(e);
			}
		},
	});

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [formState, setFormState] = React.useState({
		firstName: '',
		lastName: '',
		employeeId: '',
		department: '',
		level: '',
		password: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await createUser({
				variables: { ...formState },
			});
		} catch (e) {
			console.log(e);
		}
		props.modalClose();
		enqueueSnackbar('Employee Created Successfully');
		setFormState({
			firstName: '',
			lastName: '',
			employeeId: '',
			department: '',
			level: '',
			password: '',
		});
	};

	return (
		<Modal open={props.modalState} onClose={props.modalClose}>
			<Box sx={style}>
				<Typography
					variant='h3'
					sx={{
						fontFamily: 'Baskervville',
						textAlign: 'center',
						marginY: '5px',
					}}>
					Create Employee
				</Typography>

				<FormControl variant='standard'>
					<TextField
						required
						label='First Name'
						variant='standard'
						size='medium'
						name='firstName'
						value={formState.firstName}
						onChange={handleChange}
					/>
				</FormControl>

				<FormControl variant='standard'>
					<TextField
						required
						label='Last Name'
						variant='standard'
						size='medium'
						name='lastName'
						value={formState.lastName}
						onChange={handleChange}
					/>
				</FormControl>

				<FormControl variant='standard'>
					<TextField
						required
						label='Employee Id'
						variant='standard'
						size='medium'
						name='employeeId'
						value={formState.employeeId.toLowerCase()}
						onChange={handleChange}
					/>
					<FormHelperText id='component-helper-text'>
						"Employee First Name" - "Employee Initials"
					</FormHelperText>
				</FormControl>

				<FormControl variant='standard' sx={{ m: 1, minWidth: '250px' }}>
					<InputLabel id='demo-simple-select-label'>Department</InputLabel>
					<Select
						required
						labelId='demo-simple-select-label'
						id='demo-simple-select-size-medium'
						label='Status'
						size='medium'
						name='department'
						value={formState.department}
						onChange={handleChange}
						defaultValue=''>
						<MenuItem value={'Sales'}>Sales</MenuItem>
						<MenuItem value={'Tagging'}>Tagging</MenuItem>
						<MenuItem value={'Internet'}>Internet</MenuItem>
						<MenuItem value={'Executive'}>Executive</MenuItem>
						<MenuItem value={'Repair'}>Repair</MenuItem>
						<MenuItem value={'Photography'}>Photography</MenuItem>
					</Select>
				</FormControl>

				<FormControl variant='standard' sx={{ m: 1, minWidth: '250px' }}>
					<InputLabel id='demo-simple-select-label'>Privilege Level</InputLabel>
					<Select
						required
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						defaultValue=''
						name='level'
						value={formState.level}
						onChange={handleChange}
						label='Status'>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
					</Select>
				</FormControl>

				<FormControl variant='standard'>
					<TextField
						required
						label='Password'
						variant='standard'
						size='medium'
						name='password'
						value={formState.password}
						onChange={handleChange}
					/>
				</FormControl>

				<FormControl
					sx={{
						flexDirection: 'row',
						justifyContent: 'center',
						marginTop: '15px',
					}}>
					<Button
						type='submit'
						fullWidth
						onClick={handleFormSubmit}
						variant='contained'
						sx={{
							fontSize: '20px',
							bgcolor: 'primary.main',
							color: 'primary.light',
							marginTop: 'auto',
							width: '25%',
							alignItems: 'center',
							borderRadius: '40px',
						}}>
						Create
					</Button>
				</FormControl>
			</Box>
		</Modal>
	);
}

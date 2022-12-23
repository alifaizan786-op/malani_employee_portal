import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import React from 'react';
import { CHANGE_QUOTE } from '../utils/mutation';

import {
	Box,
	Button,
	FormControl,
	Modal,
	Switch,
	TextField,
	Typography,
} from '@mui/material';

import { ChromePicker } from 'react-color';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50vw',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 5,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minWidth: '50%',
	borderRadius: '30px',
	minHeight: '70vh',
	justifyContent: 'space-evenly',
};

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function ChangeQuote(props) {
	const [changeQuote, { error, data }] = useMutation(CHANGE_QUOTE);

	const [formState, setFormState] = React.useState({
		_id: props.quoteid,
		quotes: props.quote,
		random: 'false',
		color: '',
	});

	React.useEffect(() => {
		let color = localStorage.getItem('color');
		setFormState({
			_id: props.quoteid,
			quotes: props.quote,
			random: 'false',
			color: color,
		});
	}, [props.quoteid]);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			_id: props.quoteid,
			[name]: value,
		});
	};

	const handleColorChange = (color, event) => {
		setFormState({
			...formState,
			_id: props.quoteid,
			color: color.hex,
		});
	};



	function getAndSetRandomQuote() {
		fetch('https://api.quotable.io/random?tags=motivational')
			.then((response) => response.json())
			.then((data) => {
				setFormState({
					...formState,
					quotes: `${data.content} \n --${data.author}`,
				});
			});
	}

	const handleFormSubmit = async (event) => {
		try {
			const { data } = await changeQuote({
				variables: { ...formState },
			});
			props.modalClose();
			props.refetch();
			localStorage.setItem('color', formState.color);
			window.location.reload();
			enqueueSnackbar('Quote Update Successfully', { variant: 'success' });
		} catch (e) {
			console.error(e);
		}

		setFormState({
			_id: '',
			quotes: '',
			color: '',
		});
	};

	const [checked, setChecked] = React.useState(false);

	const handleSwitchChange = (event) => {
		setChecked(event.target.checked);
		setFormState({
			...formState,
			random: event.target.checked === true ? 'true' : 'false',
		});
	};

	function showTextArea() {
		if (formState.random === 'false') {
			return (
				<FormControl sx={{ marginTop: '10px', width: '100%', margin: '20px' }}>
					<TextField
						id='outlined-multiline-flexible'
						sx={{ marginTop: '10px', width: '100%' }}
						label='Quote'
						name='quotes'
						value={formState.quotes}
						onChange={handleChange}
						multiline
						minRows={4}
					/>
				</FormControl>
			);
		}
	}

	return (
		<Modal open={props.modalState} onClose={props.modalClose}>
			<Box sx={style}>
				<Typography
					variant='h4'
					sx={{
						fontFamily: 'Baskervville',
						textAlign: 'center',
					}}>
					Change Quote Of The Day
				</Typography>

				<FormControl
					sx={{
						display: 'flex',
						marginTop: '20px',
						flexDirection: 'row',
						justifyContent: 'space-around',
						minWidth: '100%',
					}}>
					<Typography
						variant='p'
						sx={{
							fontFamily: 'Baskervville',
							textAlign: 'center',
							fontSize: '25px',
						}}>
						Show Random Quotes
					</Typography>
					<Switch
						size='large'
						{...label}
						checked={checked}
						onChange={handleSwitchChange}
					/>
				</FormControl>

				{showTextArea()}

				<Typography
					variant='h4'
					sx={{
						fontFamily: 'Baskervville',
						textAlign: 'center',
						marginY: '5px',
					}}>
					Change Color
				</Typography>

				<ChromePicker onChange={handleColorChange} color={formState.color} />

				<FormControl
					sx={{
						flexDirection: 'row',
						justifyContent: 'center',
						marginTop: '15px',
						width: '100%',
					}}>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						onClick={handleFormSubmit}
						sx={{
							fontSize: '20px',
							bgcolor: 'primary.main',
							color: 'primary.light',
							marginTop: 'auto',
							minWidth: '25%',
							alignItems: 'center',
							borderRadius: '10px',
							marginRight: '20px',
						}}>
						Save Changes
					</Button>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						onClick={getAndSetRandomQuote}
						sx={{
							fontSize: '20px',
							bgcolor: 'primary.main',
							color: 'primary.light',
							marginTop: 'auto',
							minWidth: '25%',
							alignItems: 'center',
							borderRadius: '10px',
							marginRight: '20px',
						}}>
						Random Quote
					</Button>
				</FormControl>
			</Box>
		</Modal>
	);
}

import { useQuery } from '@apollo/client';
import React from 'react';
import { QUERY_QUOTE } from '../utils/queries';
import ChangeQuote from './changeQuote';

import { Button, Typography } from '@mui/material';

export default function Quote(props) {
	const { data, refetch } = useQuery(QUERY_QUOTE);

	const quote = data?.quotes || [];

	const [quoteText, setQuoteText] = React.useState('Loading');


	function getQuoteId() {
		if (quote[0]) {
			return quote[0]._id;
		}
	}

	// function qouteText() {
	// 	if (quote[0]) {
	// 		return quote[0].quotes;
	// 	} else {
	// 		return 'Loading';
	// 	}
	// }

	// async function qouteText() {
	// 	if (quote[0]) {
	// 	} else {
	// 		return 'Loading';
	// 	}
	// }

	React.useEffect(() => {
		if (quote[0]) {
			if (quote[0].random === 'true') {
				fetch('https://api.quotable.io/random?tags=motivational')
					.then((response) => response.json())
					.then((data) => {
						setQuoteText(`${data.content} \n --${data.author}`);
					});
			} else {
				setQuoteText(quote[0].quotes);
			}
		}
	}, [quote]);

	const [edit, setEdit] = React.useState(false);
	const [quoteId, setquoteId] = React.useState('');

	const setEditTrue = () => {
		setEdit(true);
		setquoteId(getQuoteId());
	};

	const setEditFalse = () => {
		setEdit(false);
	};

	function checkLevel() {
		if (props.level === 2) {
			return (
				<Button
					type='submit'
					fullWidth
					onClick={setEditTrue}
					variant='contained'
					sx={{
						fontSize: '20px',
						bgcolor: 'primary.main',
						color: 'primary.light',
						width: '15%',
						borderRadius: '10px',
					}}>
					Change Quote
				</Button>
			);
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
			<Typography
				variant='h5'
				color={'primary.main'}
				textAlign={'center'}
				sx={{ fontFamily: 'Baskervville', marginTop: '30px' }}>
				Qoute of the Day
			</Typography>
			<Typography
				variant='h3'
				color={'primary.main'}
				textAlign={'center'}
				sx={{
					fontFamily: 'Baskervville',
					marginTop: '15px',
					marginBottom: '30px',
					whiteSpace: 'break-spaces',
				}}>
				{quoteText}
			</Typography>

			{checkLevel()}

			<ChangeQuote
				modalState={edit}
				modalClose={setEditFalse}
				quoteid={quoteId}
				refetch={refetch}
				quote={quoteText}
			/>
		</div>
	);
}

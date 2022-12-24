import React from 'react';

import { useQuery } from '@apollo/client';

import LinearProgress from '@mui/material/LinearProgress';

import UpdateTimeOffReq from './updateTimeOffReq';

import { DataGrid } from '@mui/x-data-grid';

import { QUERY_TIME_OFF_REQ_BY_UID } from '../utils/queries';

import Auth from '../utils/auth';

const dateFormat = require('../utils/dateFormat');

export default function EmpTimeOffReq(props) {
	const { loading, data, refetch } = useQuery(QUERY_TIME_OFF_REQ_BY_UID, {
		variables: { employeeUId: props._id },
		pollInterval: 500,
	});

	const timeOffReq = data?.timeOffReqByUid || [];

	const columns = checkLevelColumn();

	const rows = [...timeOffReq];

	function checkLevelColumn() {
		// check and show task according to manager & employee
		if (props.level === 2) {
			let columns = [
				{
					field: 'Employee',
					tpe: 'singleSelect',
					headerName: 'Employee',
					width: 130,
					valueGetter: (params) =>
						`${params.row.employee.firstName} ${params.row.employee.lastName}`,
				},
				{
					field: 'startingDate',
					tpe: 'singleSelect',
					headerName: 'From',
					width: 150,
					valueGetter: (params) =>
						`${dateFormat(parseInt(params.row.startingDate)).split('at')[0]}`,
				},
				{
					field: 'endDate',
					tpe: 'singleSelect',
					headerName: 'To',
					width: 150,
					valueGetter: (params) =>
						`${dateFormat(parseInt(params.row.endDate)).split('at')[0]}`,
				},
				{
					field: 'reason',
					tpe: 'singleSelect',
					headerName: 'Reason',
					width: 350,
				},
				{
					field: 'status',
					type: 'singleSelect',
					headerName: 'Status',
					width: 350,
					valueGetter: (params) => `${params.row.status.split('_').join(' ')}`,
				},
				{
					field: 'Approver',
					tpe: 'singleSelect',
					headerName: 'Approver',
					width: 130,
					valueGetter: (params) =>
						params.row.approver === null
							? ``
							: `${params.row.approver.firstName} ${params.row.approver.lastName}`,
				},
				{
					field: 'Update Time Off Request',
					width: 400,
					renderCell: (params) => {
						return (
							<UpdateTimeOffReq
								_id={params.row._id}
								employee={params.row.employee._id}
								startingDate={params.row.startingDate}
								endDate={params.row.endDate}
								reason={params.row.reason}
								approver={Auth.getProfile().data._id}
								status={params.row.status}
							/>
						);
					},
				},
			];
			return columns;
		} else {
			let columns = [
				{
					field: 'Employee',
					tpe: 'singleSelect',
					headerName: 'Employee',
					width: 130,
					valueGetter: (params) =>
						`${params.row.employee.firstName} ${params.row.employee.lastName}`,
				},
				{
					field: 'startingDate',
					tpe: 'singleSelect',
					headerName: 'From',
					width: 150,
					valueGetter: (params) =>
						`${dateFormat(parseInt(params.row.startingDate)).split('at')[0]}`,
				},
				{
					field: 'endDate',
					tpe: 'singleSelect',
					headerName: 'To',
					width: 150,
					valueGetter: (params) =>
						`${dateFormat(parseInt(params.row.endDate)).split('at')[0]}`,
				},
				{
					field: 'reason',
					tpe: 'singleSelect',
					headerName: 'Reason',
					width: 350,
				},
				{
					field: 'status',
					type: 'singleSelect',
					headerName: 'Status',
					width: 350,
					valueGetter: (params) => `${params.row.status.split('_').join(' ')}`,
				},
				{
					field: 'Approver',
					tpe: 'singleSelect',
					headerName: 'Approver',
					width: 130,
					valueGetter: (params) =>
						params.row.approver === null
							? ``
							: `${params.row.approver.firstName} ${params.row.approver.lastName}`,
				},
			];
			return columns;
		}
	}

	function dataGridStyling() {
		//data grid of task
		if (props.level === 2) {
			if (props.current) {
				let style = (theme) => ({
					transition: theme.transitions.create('minWidth', {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen,
					}),
					height: '55vh',
					minWidth: '82vw',
				});
				return style;
			} else {
				let style = (theme) => ({
					transition: theme.transitions.create('margin', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen,
					}),
					height: '55vh',
					minWidth: '90.5vw',
				});
				return style;
			}
		} else {
			if (props.current) {
				let style = (theme) => ({
					transition: theme.transitions.create('minWidth', {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen,
					}),
					height: '40vh',
					minWidth: '82vw',
				});
				return style;
			} else {
				let style = (theme) => ({
					transition: theme.transitions.create('margin', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen,
					}),
					height: '40vh',
					minWidth: '90.5vw',
				});
				return style;
			}
		}
	}

	return (
		<DataGrid
			rows={rows}
			columns={columns}
			sx={dataGridStyling()}
			components={{
				LoadingOverlay: LinearProgress,
			}}
			loading={loading}
			disableColumnMenu
			getRowId={(row) => row._id}
		/>
	);
}

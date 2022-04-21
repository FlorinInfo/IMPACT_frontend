import "./RoleDialogStyles.scss"
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "../../../assets/axios/axios";
import { Cookies, useCookies } from "react-cookie";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

const roles = [
	"CETATEAN",
	"MODERATOR",
	"ADMINISTRATOR"
];

const zones = [
	"COUNTY",
	"VILLAGE",
	"LOCALITY"
]

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

const BootstrapDialogTitle = ({ onClose, children }) => {
	//   const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} className="dialog__title">
			<span>{children}</span>
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

const RoleDialog = ({ open, user, closeDialog }) => {
	const [cookies, setCookie, removeCookie] = useCookies(["token"]);
	const [zoneRole, setZoneRole] = useState("");
	const [zoneRoleOn, setZoneRoleOn] = useState("");
	const [forcedUpdate, setForcedUpdate] = useState(false);
	const [error, setError] = useState("");

	const handleClose = (type) => {
		if (type == "save") closeDialog(user.id, zoneRole, zoneRoleOn, forcedUpdate); else closeDialog();
		setForcedUpdate(false);
		setZoneRole("");
		setZoneRoleOn("");
		setError("");
	}

	useEffect(() => {
		if (user) {
			setZoneRole(user.zoneRole);
			setZoneRoleOn(user.zoneRoleOn);
		}
		console.log(user)
	}, [user])

	const updateRole = () => {
		axios
			.patch(
				`/users/${user.id}`,
				{
					zoneRole,
					zoneRoleOn,
					forceAdministrator:forcedUpdate
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.token}`,
					},
				}
			)
			.then((response) => {
				// handle success
				console.log(response);
				if (response.status == 204) handleClose("save");
				else {
					if (response.data.errors) {
						if (response.data.errors.administrator) {
							setForcedUpdate(true);
							setError(response.data.errors.administrator.details)
						}
					}
				}
			})
			.catch((error) => {
				// handle error
				console.log(error);
			})
			.then(() => {
				// always executed
			});
	}

	return (
		<div className='dialog'>
			{open ? <BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<BootstrapDialogTitle id="customized-dialog-title"
					onClose={handleClose}
				>
					Seteaza noul rol pentru {user.lastName} {user.firstName}
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<div>
						<FormControl>
							<FormLabel id="demo-row-radio-buttons-group-label">Rol</FormLabel>
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								name="row-radio-buttons-group"
								value={zoneRole}
								onChange={(e) => setZoneRole(e.target.value)}
							>
								{
									roles.map((r) => <FormControlLabel key={nanoid()} value={r} control={<Radio />} label={r} />)
								}
								{/* <FormControlLabel value="male" control={<Radio />} label="Male" />
							<FormControlLabel value="other" control={<Radio />} label="Other" /> */}
							</RadioGroup>
						</FormControl>
					</div>
					<div>
						{
							zoneRole != "CETATEAN" ?
								<FormControl>
									<FormLabel id="demo-row-radio-buttons-group-label">Zona</FormLabel>
									<RadioGroup
										row
										aria-labelledby="demo-row-radio-buttons-group-label"
										name="row-radio-buttons-group"
										value={zoneRoleOn}
										onChange={(e) => setZoneRoleOn(e.target.value)}
									>
										{
											zones.map((r) => user.Locality==null&&r=="LOCALITY" ? "" : <FormControlLabel key={nanoid()} value={r} control={<Radio />} label={r} />)
										}
										{/* <FormControlLabel value="male" control={<Radio />} label="Male" />
							<FormControlLabel value="other" control={<Radio />} label="Other" /> */}
									</RadioGroup>
								</FormControl>
								: ""}
					</div>
					<span className="dialog__error">{error} </span>
				</DialogContent>
				<DialogActions>
					{
						forcedUpdate ? <Button className='dialog__save-btn' autoFocus onClick={updateRole}>
							Actualizeaza {zoneRole}
						</Button> :
							<Button className='dialog__save-btn' autoFocus onClick={updateRole}>
								Salveaza
							</Button>
					}
				</DialogActions>
			</BootstrapDialog>
				: ""}

		</div>
	);
}


export default RoleDialog;
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

import Slide from '@mui/material/Slide';
import { AsyncPaginate } from "react-select-async-paginate";
import { useState, useEffect } from 'react';

import axios from "../../../assets/axios/axios";
import "./FilterDialog.scss";


const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const FilterDialog = ({ open, closeFilter, filterUsers }) => {

	const setJudetDefault = () => {
		if ((localStorage.getItem("zoneRoleOn") == "LOCALITY" ||
		localStorage.getItem("zoneRoleOn") == "VILLAGE" ||
		localStorage.getItem("zoneRoleOn") == "COUNTY") &&
		localStorage.getItem("admin") != 'true') return {
				name: "",
				id: localStorage.getItem("countyId"),
			};
		return {
			name: "",
			id: null,
		};
	}
	const setOrasDefault = () => {
		if ((localStorage.getItem("zoneRoleOn") == "LOCALITY" || localStorage.getItem("zoneRoleOn") == "VILLAGE") && localStorage.getItem("admin")!= "true")
			return {
				name: "",
				id: localStorage.getItem("villageId"),
			};
		return {
			name: "",
			id: null,
		};
	}
	const setLocalitateDefault = () => {
		if (localStorage.getItem("zoneRoleOn") == "LOCALITY" && localStorage.getItem("admin") != "true") return {
			name: "",
			id: localStorage.getItem("localityId"),
		};
		return {
			name: "",
			id: null,
		};
	}
	// Errors
	const [judetError, setJudetError] = useState("");
	const [orasError, setOrasError] = useState("");
	const [localitateError, setLocalitateError] = useState("");

	// Locations
	const [judet, setJudet] = useState(setJudetDefault());

	const [orase, setOrase] = useState([]);
	const [oras, setOras] = useState(setOrasDefault());

	const [localitati, setLocalitati] = useState([]);
	const [localitate, setLocalitate] = useState(setLocalitateDefault());

	const loadJudete = async (search) => {
		// Verify if it's not an id in search
		if(!isNaN(search)) search = "";
		const response = await axios.get("/counties");
		let options = [];
		if (Array.isArray(response.data)) {
			options = response.data.filter((l) =>
				l.name.toLowerCase().startsWith(search.toLowerCase())
			);
		}
		return {
			options,
		};
	};

	const loadOrase = async (search) => {
		// Verify if it's not an id in search
		if(!isNaN(search)) search = "";
		const response = await axios.get(`/villages?countyId=${judet.id}`);
		let options = [];
		if (Array.isArray(response.data)) {
			options = response.data.filter((l) =>
				l.name.toLowerCase().startsWith(search.toLowerCase())
			);
		}
		setOrase(options);
		return {
			options,
		};
	};

	const loadLocalitati = async (search) => {
		// Verify if it's not an id in search
		if(!isNaN(search)) search = "";
		const response = await axios.get(`/localities?villageId=${oras.id}`);
		let options = [];
		if (Array.isArray(response.data)) {
			options = response.data.filter((l) =>
				l.name.toLowerCase().startsWith(search.toLowerCase())
			);
		}
		setLocalitati(options);
		return {
			options,
		};
	};

	useEffect(() => {
		setLocalitate(setLocalitateDefault());
		loadLocalitati(oras.id);
	}, [oras.id]);

	useEffect(() => {
		setLocalitate(setLocalitateDefault());
		setOras(setOrasDefault());
		loadOrase(judet.id);
	}, [judet.id]);

	const deleteFilters = () => {
		setJudet(setJudetDefault());
		setOras(setOrasDefault());
		setLocalitate(setLocalitateDefault());
	}

	return (
		<div>
			<Dialog
				fullScreen
				open={open}
				onClose={closeFilter}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						{/* <IconButton
							edge="start"
							color="inherit"
							onClick={closeDialog}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton> */}
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Filtre
						</Typography>
						<Button autoFocus color="inherit" onClick={() => filterUsers(judet.id, oras.id, localitate.id)}>
							Salveaza
						</Button>
					</Toolbar>
				</AppBar>
				<div style={{ padding: "1rem" }}>
					{((localStorage.getItem("zoneRoleOn") == "COUNTY" || localStorage.getItem("zoneRoleOn") == "VILLAGE") && localStorage.getItem("admin") == 'false') ? "" :
						<div style={{ width: "100%" }}>
							<label htmlFor="judet" className="label-default">
								Judet
							</label>
							<AsyncPaginate
								getOptionLabel={(option) => option.name}
								getOptionValue={(option) => option.id}
								classNamePrefix="react-select"
								className="react-select"
								value={judet}
								onChange={setJudet}
								loadOptions={loadJudete}
								placeholder={""}
							/>
							<span className="error-default">{judetError}</span>
						</div>
					}
					{localStorage.getItem("zoneRoleOn") == "VILLAGE" && localStorage.getItem("admin")=="false" ? "" :
						<div style={{ width: "100%" }}>
							<label htmlFor="oras" className="label-default">
								Oras / Comuna
							</label>
							<AsyncPaginate
								isDisabled={judet.id == null || orase.length == 0}
								key={judet.id}
								getOptionLabel={(option) => option.name}
								getOptionValue={(option) => option.id}
								classNamePrefix="react-select"
								className="react-select"
								value={oras}
								onChange={setOras}
								loadOptions={loadOrase}
								placeholder={""}
							/>
							<span className="error-default">{orasError}</span>
						</div>
					}
					<div style={{ width: "100%" }}>
						<label htmlFor="localitate" className="label-default">
							Localitate
						</label>
						<AsyncPaginate
							isDisabled={oras.id == null || localitati.length == 0}
							key={oras.id}
							getOptionLabel={(option) => option.name}
							getOptionValue={(option) => option.id}
							classNamePrefix="react-select"
							className="react-select"
							value={localitate}
							onChange={setLocalitate}
							loadOptions={loadLocalitati}
							placeholder={""}
						/>
						<span className="error-default">{localitateError}</span>
					</div>
					<Stack direction="row" justifyContent="end" style={{ marginTop: "1rem" }}>
						<Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={deleteFilters}>
							Sterge toate filtrele
						</Button>
					</Stack>

				</div>
			</Dialog>
		</div>
	);
}


export default FilterDialog;
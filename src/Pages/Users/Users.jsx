import "./UsersStyles.scss";
import React, { useEffect, useRef } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { BsFilter } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai"
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TablePagination from '@mui/material/TablePagination';
import Fab from '@mui/material/Fab';
import SettingsIcon from '@mui/icons-material/Settings';
import RoleDialog from "../../components/Admin/RoleDialog/RoleDialog";

import { useState } from "react";
import { nanoid } from "nanoid";
import axios from "../../assets/axios/axios";
import { Cookies, useCookies } from "react-cookie";
import FilterDialog from "../../components/Admin/FilterDialog/FilterDialog";


const columns = [
	{ field: "id", headerName: "ID" },
	{
		field: "fullName",
		headerName: "Nume Prenume",
	},
	{
		field: "registerTime",
		headerName: "Data si ora inregistrarii",
	},
	{
		field: "locationRegister",
		headerName: "Zona",
	},
	{
		field: "rol",
		headerName: "Rol",
	},
	//   {
	//     field: "action",
	//     headerName: "Actiuni",
	//   },
];

const roles = [
	"CETATEAN",
	"MODERATOR",
	"ADMINISTRATOR"
];

const timeConverter = (UNIX_timestamp) => {
	let a = new Date(UNIX_timestamp);
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let year = a.getFullYear();
	let month = months[a.getMonth()];
	let date = a.getDate();
	let hour = a.getHours();
	if (hour < 10) hour = ("0" + hour).slice(-2);
	let min = a.getMinutes();
	if (min < 10) min = ("0" + hour).slice(-2);
	let sec = a.getSeconds();
	if (sec < 10) sec = ("0" + hour).slice(-2);
	let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
	return time;
}


const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const Users = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["token"]);

	const setJudetDefault = () => {
		if ((cookies.zoneRoleOn == "LOCALITY" ||
			cookies.zoneRoleOn == "VILLAGE" ||
			cookies.zoneRoleOn == "COUNTY") &&
			cookies.admin != true) return cookies.countyId;
		return null;
	}
	const setOrasDefault = () => {
		if ((cookies.zoneRoleOn == "LOCALITY" || cookies.zoneRoleOn == "VILLAGE") && cookies.admin == "false") return cookies.villageId;
		return null;
	}
	const setLocalitateDefault = () => {
		if (cookies.zoneRoleOn == "LOCALITY" && cookies.admin == "false") return cookies.localityId;
		return null;
	}

	const [open, setOpen] = useState(false);
	const [notification, setNotification] = useState("");
	const [users, setUsers] = useState("");
	const [doc, setDoc] = useState("");
	const [search, setSearch] = useState("");
	const [loader, setLoader] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [limit, setLimit] = useState(1);
	const [openFilter, setOpenFilter] = useState(false);
	const [judet, setJudet] = useState(setJudetDefault());
	const [oras, setOras] = useState(setOrasDefault());
	const [localitate, setLocalitate] = useState(setLocalitateDefault());
	const [roleDialog, setRoleDialog] = useState(false);
	const [userActive, setUserActive] = useState(null);


	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		window.scrollTo(0, 0);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const dialogAction = (url) => {
		setDoc(url);
		setOpen(!open);
	};

	const loadUsers = () => {
		setLoader(true);
		axios
			.get(
				`/users?offset=${page == 0 ? page : page * rowsPerPage}&limit=${rowsPerPage}${judet ? "&countyId=" + judet : ""}${oras ? "&villageId=" + oras : ""}${localitate ? "&localityId=" + localitate : ""}=&search=${search}&role=&status=IN_ASTEPTARE`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.token}`,
					},
				}
			)
			.then((response) => {
				// handle success
				setUsers(response.data.users);
				setLimit(response.data.limit)
				console.log(users);
				console.log(response);
				setLoader(false);
			})
			.catch((error) => {
				// handle error
				console.log(error);
			})
			.then(() => {
				// always executed
			});
	}

	useEffect(() => {
		loadUsers();
	}, [page, rowsPerPage, judet, oras, localitate]);

	const searchUsers = (status) => {
		// Adding status for deleting button, not working directly with search value 'update status' - search for "" on delete input value
		setLoader(true);
		axios
			.get(
				`/users?offset=0&limit=10${judet ? "&countyId=" + judet : ""}${oras ? "&villageId=" + oras : ""}${localitate ? "&localityId=" + localitate : ""}&search=${status === "update" ? "" : search}&role=&status=IN_ASTEPTARE`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.token}`,
					},
				}
			)
			.then((response) => {
				// handle success
				setUsers(response.data.users);
				setLimit(response.data.limit);
				setPage(0);
				console.log(response);
				setLoader(false);
			})
			.catch((error) => {
				// handle error
				console.log(error);
			})
			.then(() => {
				// always executed
			});
	}
	const filterUsers = (judetId, orasId, localitateId) => {
		setJudet(judetId);
		setOras(orasId);
		setLocalitate(localitateId);
		setPage(0);
		setOpenFilter(false);
	}

	const openRoleDialog = (user) => {
		setUserActive(user);
		setRoleDialog(true);
	}

	const closeRoleDialog = (id, zoneRole, zoneRoleOn, forcedUpdate) => {
		// let update = {};
		// if(zoneRole) update.zoneRole = zoneRole;
		// if(zoneRoleOn) update.zoneRoleOn = zoneRoleOn;
		// 	let Users = [];
		// 	Users = users.map((u) => u.id == id ? { ...u, ...update} : u);
		// 	setUsers(Users);
		loadUsers();
		setRoleDialog(false);
		setUserActive(null);
	}
	return (
		<div className="users-list">
			<div className="users-list__sort">
				<Stack direction="row" alignItems="center" spacing={2}>
					<TextField
						className="users-list__search"
						id="standard-basic"
						label="Cauta utilizatori"
						variant="standard"
						value={search}
						onChange={e => setSearch(e.target.value)}
						InputProps={{
							endAdornment: search && (
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => { setSearch(""); searchUsers('update'); }}
								>
									<AiOutlineClose />
								</IconButton>
							)
						}}
					/>
					<Button
						variant="contained"
						component="span"
						className="users-list__search-btn"
						endIcon={<PersonSearchIcon />}
						onClick={searchUsers}
					>
						Cauta
					</Button>
				</Stack>
				{
					cookies.zoneRoleOn != "LOCALITY" || cookies.admin == "true" ?
						<div className="users-list__filter">
							<Button variant="contained" endIcon={<BsFilter />} onClick={() => setOpenFilter(true)}>
								Filtreaza
							</Button>
						</div>
						: ""
				}

			</div>
			<div className="users-list__table">
				<TableContainer component={Paper}>
					{users.length ?
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									{columns.map((column) => (
										<TableCell
											className="users-list__column-title"
											align="left"
											key={nanoid()}
										>
											{column.headerName}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{users.map((user, index) => (
									<TableRow
										key={user.id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell align="left" className="users-list__row">
											{user.id}
										</TableCell>
										<TableCell align="left" className="users-list__row">
											{user.lastName} {user.firstName}
										</TableCell>
										<TableCell align="left" className="users-list__row">
											{timeConverter(user.createTime)}
										</TableCell>
										<TableCell align="left" className="users-list__row">
											{user.County?.name},&nbsp; {user.Village?.name}
											{user.Locality ? ", " + user.Locality.name : ""}
										</TableCell>
										<TableCell align="left" className="users-list__row" >
											<Fab className="users-list__role-btn" onClick={() => openRoleDialog(user)} variant="extended" size="small" color={`${user.zoneRole == "CETATEAN" ? "primary" : user.zoneRole == "MODERATOR" ? "warning" : "error"}`} aria-label="add">
												<SettingsIcon sx={{ mr: 1 }} />
												<span className="users-list__role">
													{user.zoneRole}  &nbsp;
													{user.zoneRoleOn == "COUNTY" ? "JUDET" : user.zoneRoleOn == "VILLAGE" && user.LocalityId ? "COMUNA" : user.zoneRoleOn == "VILLAGE" && !user.LocalityId ? "ORAS" : "LOCALITATE"}
												</span>
											</Fab>

		
										</TableCell>
									</TableRow>
								))}
							</TableBody>

						</Table>
						:
						loader ?
							<Box className="users-list__loader" sx={{ width: '100%' }}>
								<LinearProgress />
							</Box>
							:
							<div className="users-list__empty">
								<span className="users-list__empty-text">Nu exista utilizatori disponibili</span>
							</div>
					}
					<TablePagination
						component="div"
						count={limit}
						page={page}
						onPageChange={handleChangePage}
						rowsPerPage={rowsPerPage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</TableContainer>
			</div>
			<Dialog
				open={open}
				onClose={() => dialogAction("")}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<InnerImageZoom src={doc} zoomScale={2} zoomSrc={doc} />
				</DialogContent>
			</Dialog>
			<Snackbar open={notification} autoHideDuration={1000}>
				<Alert severity={notification} sx={{ width: "100%" }}>
					{
						{
							success: "Utilizatorul a fost aprobat cu succes",
							error: "Cererea utilizatorului a fost respinsa",
							info: "rank",
						}[notification]
					}
				</Alert>
			</Snackbar>
			<RoleDialog open={roleDialog} user={userActive} closeDialog={closeRoleDialog} />
			<FilterDialog open={openFilter} closeFilter={() => setOpenFilter(false)} filterUsers={filterUsers} />
		</div>
	);
};

export default Users;

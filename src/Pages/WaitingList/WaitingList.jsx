import "./WaitingListStyles.scss";
import React, { useEffect } from "react";
import buletin from "../../assets/images/buletine-840x500.jpg";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { BsFilter } from "react-icons/bs";
import Button from "@mui/material/Button";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TablePagination from '@mui/material/TablePagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
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
    field: "proof",
    headerName: "Dovada",
  },
  // {
  //   field: "rol",
  //   headerName: "Rol",
  // },
  {
    field: "action",
    headerName: "Actiuni",
  },
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

const WaitingList = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
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
  const [judet, setJudet] = useState(null);
  const [oras, setOras] = useState(null);
  const [localitate, setLocalitate] = useState(null);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dialogAction = (url) => {
    setDoc(url);
    setOpen(!open);
  };

  const approveUser = () => {

  };

  const unapproveUser = () => {
    setNotification("error");
  };

  const setUserStatus = (userId, userStatus) => {
    if (userStatus == "APROBAT")
      axios
        .patch(
          `/users/${userId}`,
          {
            status: userStatus
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
          const Users = users.map((u) => u.id == userId ? { ...u, status: userStatus } : u);
          setUsers(Users);
          setNotification("success");
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    else
      axios
        .delete(
          `/users/${userId}`,
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
          const Users = users.map((u) => u.id == userId ? { ...u, status: userStatus } : u);
          setUsers(Users);
          setNotification("error");
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
        });
  }

  // const handleChange = (id) => (event) => {
  //   // Sending request logic ***
  //   console.log(event.target.value);
  //   let Users = [];
  //   if (event.target.value == "CETATEAN") {
  //     Users = users.map((u) => u.id == id ? { ...u, zoneRole: event.target.value, zoneRoleOn: u.Locality ? 'LOCALITY' : 'VILLAGE' } : u);
  //   }
  //   else Users = users.map((u) => u.id == id ? { ...u, zoneRole: event.target.value } : u);
  //   setUsers(Users);
  // };

  // const updateZoneRoleOn = (id, zoneRoleOn) => {
  //   // alert(id);
  //   // alert(zoneRoleOn);
  //   const Users = users.map((u) => u.id == id ? { ...u, zoneRoleOn } : u);
  //   setUsers(Users);
  // }

  useEffect(() => {
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
        window.scrollTo(0, 0)
        setLoader(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }, [page, rowsPerPage, judet, oras, localitate]);

  const searchUsers = () => {
    setLoader(true);
    axios
      .get(
        `/users?offset=0&limit=10${judet ? "&countyId=" + judet : ""}${oras ? "&villageId=" + oras : ""}${localitate ? "&localityId=" + localitate : ""}&search=${search}&role=&status=IN_ASTEPTARE`,
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
  const filterUsers = (judetId, orasId, localitateId)=> { 
    setJudet(judetId);
    setOras(orasId);
    setLocalitate(localitateId);
    setPage(0);
    setOpenFilter(false);
  }

  return (
    <div className="waiting-list">
      <div className="waiting-list__sort">
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField
            className="waiting-list__search"
            id="standard-basic"
            label="Cauta utilizatori"
            variant="standard"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            component="span"
            className="waiting-list__search-btn"
            endIcon={<PersonSearchIcon />}
            onClick={searchUsers}
          >
            Cauta
          </Button>
        </Stack>
        {
          cookies.zoneRoleOn != "LOCALITY" ?
            <div className="waiting-list__filter">
              <Button variant="contained" endIcon={<BsFilter />} onClick={() => setOpenFilter(true)}>
                Filtreaza
              </Button>
            </div>
            : ""
        }

      </div>
      <div className="waiting-list__table">
        <TableContainer component={Paper}>
          {users.length ?
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      className="waiting-list__column-title"
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
                    <TableCell align="left" className="waiting-list__row">
                      {user.id}
                    </TableCell>
                    <TableCell align="left" className="waiting-list__row">
                      {user.lastName} {user.firstName}
                    </TableCell>
                    <TableCell align="left" className="waiting-list__row">
                      {timeConverter(user.createTime)}
                    </TableCell>
                    <TableCell align="left" className="waiting-list__row">
                      {user.County?.name},&nbsp; {user.Village?.name}
                      {user.Locality ? ", " + user.Locality.name : ""}
                    </TableCell>
                    <TableCell align="left" className="waiting-list__row" >
                      <IconButton
                        onClick={() => dialogAction(user.photoUrl)}
                        className="waiting-list__proof-btn"
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      align="left"
                      className="waiting-list__row waiting-list__row--f-column"
                    >
                      {
                        user.status == "IN_ASTEPTARE" ?
                          <>
                            <Button
                              variant="outlined"
                              startIcon={<ThumbUpAltIcon />}
                              onClick={() => setUserStatus(user.id, "APROBAT")}
                            >
                              Aproba
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<ThumbDownAltIcon />}
                              onClick={() => setUserStatus(user.id, "BLOCAT")}
                            >
                              Respinge
                            </Button>
                          </>
                          : user.status == "APROBAT" ?
                            <Button variant="contained" color="success">
                              Aprobat
                            </Button>
                            : <Button variant="contained" color="error">
                              Blocat
                            </Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
            :
            loader ?
              <Box className="waiting-list__loader" sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
              :
              <div className="waiting-list__empty">
                <span className="waiting-list__empty-text">Nu exista utilizatori disponibili</span>
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
        {/* <DataGrid
          rows={rows}
          columns={columns}
          //   rowsPerPageOptions={[5]}
          checkboxSelection
        /> */}
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
          {/* {
            notification == 'success' ? 'Utilizatorul a fost aprobat cu succes' : "Cererea utilizatorului a fost respinsa"
          } */}
        </Alert>
      </Snackbar>
      <FilterDialog open={openFilter} closeFilter={() => setOpenFilter(false)} filterUsers={filterUsers} />
    </div>
  );
};

export default WaitingList;

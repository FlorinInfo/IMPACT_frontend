import "./WaitingListStyles.scss";

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
import Button from "@mui/material/Button";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { nanoid } from "nanoid";

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
  {
    field: "action",
    headerName: "Actiuni",
  },
];

const rows = [
  {
    id: nanoid(),
    fullName: "Florin Bucataru",
    registerTime: "12.06.2022 15:00",
    locationRegister: "Iasi, Copou",
    proof: "https://imgur.com/gallery/zFUN42E",
  },
  {
    id: nanoid(),
    fullName: "Florin Bucataru",
    registerTime: "12.06.2022 15:00",
    locationRegister: "Iasi, Copou",
    proof: "https://imgur.com/gallery/zFUN42E",
  },
];

const WaitingList = () => {
  const [open, setOpen] = useState(false);

  const dialogAction = () => {
    setOpen(!open);
  };

  return (
    <div className="waiting-list">
      <div className="waiting-list__table">
        <TableContainer component={Paper}>
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
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell> */}
                  <TableCell align="left" className="waiting-list__row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left" className="waiting-list__row">
                    {row.fullName}
                  </TableCell>
                  <TableCell align="left" className="waiting-list__row">
                    {row.registerTime}
                  </TableCell>
                  <TableCell align="left" className="waiting-list__row">
                    {row.locationRegister}
                  </TableCell>
                  <TableCell align="left" className="waiting-list__row">
                    <IconButton
                      onClick={dialogAction}
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
                    <Button variant="outlined" startIcon={<ThumbUpAltIcon />}>
                      Aproba
                    </Button>
                    <Button variant="outlined" startIcon={<ThumbDownAltIcon />}>
                      Respinge
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
        onClose={dialogAction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <InnerImageZoom src={buletin} zoomScale={2} zoomSrc={buletin} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WaitingList;

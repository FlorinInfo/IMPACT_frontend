import "./WaitingListStyles.scss";

import buletin from "../../assets/images/buletine-840x500.jpg";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  // { field: "firstName", headerName: "First name", width: 170 },
  // { field: "lastName", headerName: "Last name", width: 170 },
  // {
  //   field: "age",
  //   headerName: "Age",
  //   // type: "number",
  //   width: 90,
  // },
  {
    field: "fullName",
    headerName: "Nume Prenume",
    // description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 250,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "registerTime",
    headerName: "Data si ora inregistrarii",
    // type: "number",
    width: 250,
  },
  {
    field: "locationRegister",
    headerName: "Zona",
    // type: "number",
    width: 130,
  },
  {
    field: "proof",
    headerName: "Dovada",
    // type: "number",
    width: 130,
  },
];

const rows = [
  {
    id: 1,
    fullName: "Florin Bucataru",
    registerTime: "12.06.2022 15:00",
    locationRegister: "Iasi, Copou",
    proof: "https://imgur.com/gallery/zFUN42E",
  },
  // { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  // { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  // { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  // { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  // { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  // { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  // { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  // { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const WaitingList = () => {
  return (
    <div className="waiting-list">
      <div className="waiting-list__table">
        <DataGrid
          rows={rows}
          columns={columns}
          //   rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      {/* <InnerImageZoom src={buletin} zoomScale={2} zoomSrc={buletin} /> */}
    </div>
  );
};

export default WaitingList;

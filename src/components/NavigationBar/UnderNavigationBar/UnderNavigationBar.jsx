import React, { useState } from "react";

import "./UnderNavigationBarStyles.scss";
import { ImpactStore } from "../../../store/ImpactStore";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaExchangeAlt } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import FeedSelect from "../../HomePage/FeedSelect/FeedSelect";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

// function DialogFeed({open, emitClose}) {
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   const handleClose = () => {
//     emitClose()
//   };

//   return (
//     <div>
//       <Dialog
//         fullScreen={fullScreen}
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="responsive-dialog-title"
//       >
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <FeedSelect/>
//       </Dialog>
//     </div>
//   );
// }

function UnderNavigationBarButton(props) {
  return (
    <button
      className={
        props.active
          ? "under-navigation-bar__button selected-unvb-b"
          : "under-navigation-bar__button"
      }
      id={props.id}
    >
      <a>{props.children}</a>
    </button>
  );
}

const UnderNavigationBar = () => {
  const search = useLocation();
  let routeFilter = search.pathname.substring(1);
  const { user, setUser } = useContext(ImpactStore);
  const { feedDialog, setFeedDialog } = useContext(ImpactStore);
  let navigate = useNavigate();
  const setDefaultBtn = () => {
    if (routeFilter != "") {
      let filterSplit = routeFilter.split("&").reverse();

      for (const el of filterSplit) {
        let elSplit = el.split("=");
        if (elSplit[0] == "localityId") return elSplit[0];
        if (elSplit[0] == "villageId") return elSplit[0];
        if (elSplit[0] == "countyId") return elSplit[0];
      }
    } else {
      if (user.localityId) return "localityId";
      return "villageId";
    }
  };
  const [selectedButton, setSelectedButton] = useState(() => setDefaultBtn());
  const [open, setOpen] = useState(false);

  const handleSelectedButton = (e) => {
    e.preventDefault();
    const selected = e.target.closest(".under-navigation-bar__button").id;
    setSelectedButton(selected);
    navigate(`/${selected}=${user[selected]}`);
  };

  let showUnderNavigationBar = true;
  if (search.pathname === "/create-post") showUnderNavigationBar = false;
  if (search.pathname.includes("user")) showUnderNavigationBar = false;
  if (search.pathname === "/waiting-list") showUnderNavigationBar = false;
  if (search.pathname === "/profile-settings") showUnderNavigationBar = false;
  if (search.pathname === "/referral") showUnderNavigationBar = false;

  return (
    <>
      {showUnderNavigationBar && (
        <>
          {user.zoneRole == "CETATEAN" && !user.admin ? (
            <>
              <div
                className="under-navigation-bar"
                onClick={handleSelectedButton}
              >
                <UnderNavigationBarButton
                  id="countyId"
                  active={"countyId" === selectedButton}
                >
                  <span className="under-navigation-bar__button__text">
                    Judet
                  </span>
                </UnderNavigationBarButton>
                <UnderNavigationBarButton
                  id="villageId"
                  active={"villageId" === selectedButton}
                >
                  <span className="under-navigation-bar__button__text">
                    {user.localityId ? "Comuna" : "Oras"}
                  </span>
                </UnderNavigationBarButton>
                <UnderNavigationBarButton
                  id="localityId"
                  active={"localityId" === selectedButton}
                >
                  <span className="under-navigation-bar__button__text">
                    Localitate
                  </span>
                </UnderNavigationBarButton>
              </div>
            </>
          ) : (
            <>
              {/* <DialogFeed open={feedDialog} emitClose={()=>setFeedDialog(false)}/> */}
              <div className="under-navigation-bar under-navigation-bar__admins">
                <UnderNavigationBarButton active={false}>
                  {/* <span className="under-navigation-bar__button__text">Judet</span> */}
                </UnderNavigationBarButton>
                <UnderNavigationBarButton active={false}>
                  <span
                    className="under-navigation-bar__button__text"
                    onClick={() => setFeedDialog(true)}
                  >
                    {selectedButton == "countyId"
                      ? "Judet"
                      : selectedButton == "villageId"
                      ? "Oras/Comuna"
                      : "Localitate"}
                    {/* <IconButton aria-label="delete">
                <DisplaySettingsIcon />
              </IconButton> */}
                  </span>
                </UnderNavigationBarButton>
                <UnderNavigationBarButton active={false}>
                  {/* <span className="under-navigation-bar__button__text">Judet</span> */}
                </UnderNavigationBarButton>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default UnderNavigationBar;

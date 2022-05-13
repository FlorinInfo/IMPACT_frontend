import react, { useContext, useState } from "react";

import "./StatusStyles.scss";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImpactStore } from "../../../store/ImpactStore";
import axios from "../../../assets/axios/axios";
import { useEffect } from "react";

const Status = ({status, id, changeStatus}) => {
  const [showStatusCH, setShowStatusCH] = useState(false);
  const { user, setUser } = useContext(ImpactStore);
  const [postStatus, setPostStatus] = useState(status);

  const handleShowStatusCH = () => {
    showStatusCH ? setShowStatusCH(false) : setShowStatusCH(true);
  };

  const updateStatus = (status_type) => {
    axios
    .patch(
      `/articles/${id}`,
      {
        status:status_type
      },
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      // handle success
      console.log(response);
      changeStatus();
      handleShowStatusCH();
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
  }
  useEffect(()=>{
    if (status === "TRIMIS") setPostStatus("Trimis");
  else if (status === "VIZIONAT") setPostStatus("Vizionat");
  else if (status === "IN_LUCRU") setPostStatus("In lucru");
  else if (status === "EFECTUAT") setPostStatus("Efectuat");
  })

  //extract status
  // if (status === "TRIMIS") postStatus = "Trimis";
  // else if (status === "VIZIONAT") postStatus = "Vizionat";
  // else if (status === "IN_LUCRU") postStatus = "In Lucru";
  // else if (status === "EFECTUAT") postStatus = "Efectuat";

  if (user.admin || user.zoneRole === "MODERATOR" || user.zoneRole == "ADMINISTRATOR")
    return (
      <div className="status-zone">
        <button className="status__button" onClick={handleShowStatusCH}>
          <span className="status__text">{postStatus}</span>
        </button>
        {showStatusCH && <PostStatusTable updateStatus={updateStatus} />}
      </div>
    );
  else
    return (
      <div className="status">
        <span className="status__text">{postStatus}</span>
      </div>
    );
};

function PostStatusTable({updateStatus}) {
  function PostState(props) {
    return (
      <span className="post-state" id={props.id}>
        {props.children}
      </span>
    );
  }

  const changeStatus = (e) => {
    e.preventDefault();
    const selectedStatus = e.target.closest(".post-state").id;
    updateStatus(selectedStatus);
    // if (selectedStatus === "trimis") {
    // } else if (selectedStatus === "vizionat") {
    // } else if (selectedStatus === "inLucru") {
    // } else if (selectedStatus === "efectuat") {
    // }
  };

  return (
    <div className="post-status-table" onClick={changeStatus}>
      <PostState id="TRIMIS">Trimis</PostState>
      <PostState id="VIZIONAT">Vizionat</PostState>
      <PostState id="IN_LUCRU">In Lucru</PostState>
      <PostState id="EFECTUAT">Efectuat</PostState>
    </div>
  );
}

export default Status;

import react, { useContext, useState } from "react";

import "./StatusStyles.scss";

import { RiArrowDropDownLine } from "react-icons/ri";

import { ImpactStore } from "../../../store/ImpactStore";

const Status = (props) => {
  const [showStatusCH, setShowStatusCH] = useState(false);
  const { user, setUser } = useContext(ImpactStore);
  let postStatus = "Trimis";

  const handleShowStatusCH = () => {
    showStatusCH ? setShowStatusCH(false) : setShowStatusCH(true);
  };

  //extract status
  if (props.status === "TRIMIS") postStatus = "Trimis";
  else if (props.status === "VIZIONAT") postStatus = "Vizionat";
  else if (props.status === "IN_LUCRU") postStatus = "In Lucru";
  else if (props.status === "EFECTUAT") postStatus = "Efectuat";

  if (user.admin || user.zoneRole === "MODERATOR")
    return (
      <div className="status-zone">
        <button className="status__button" onClick={handleShowStatusCH}>
          <span className="status__text">{postStatus}</span>
        </button>
        {showStatusCH && <PostStatusTable />}
      </div>
    );
  else
    return (
      <div className="status">
        <span className="status__text">{postStatus}</span>
      </div>
    );
};

function PostStatusTable() {
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

    if (selectedStatus === "trimis") {
    } else if (selectedStatus === "vizionat") {
    } else if (selectedStatus === "inLucru") {
    } else if (selectedStatus === "efectuat") {
    }
  };

  return (
    <div className="post-status-table" onClick={changeStatus}>
      <PostState id="trimis">Trimis</PostState>
      <PostState id="vizionat">Vizionat</PostState>
      <PostState id="inLucru">In Lucru</PostState>
      <PostState id="efectuat">Efectuat</PostState>
    </div>
  );
}

export default Status;

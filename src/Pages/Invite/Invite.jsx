import "./InviteStyles.scss"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Invite = ()=> {
    let navigate = useNavigate();
    const { id } = useParams();
    useEffect(()=>{
        localStorage.setItem("referralId", id);
        navigate("/signup")

    },[])
    return (
        <></>
    )
}

export default Invite;
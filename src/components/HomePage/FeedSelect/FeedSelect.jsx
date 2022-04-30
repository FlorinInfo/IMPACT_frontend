import "./FeedSelectStyles.scss";

import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImpactStore } from "../../../store/ImpactStore";
import { useNavigate } from "react-router-dom";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



const FeedSelect = ()=> {
    const { user, setUser } = useContext(ImpactStore);
    const navigate = useNavigate();
    const {routeFilter} = useParams();
    const setDefaultZone = ()=> {
        if (routeFilter != undefined) {
            let filterSplit = routeFilter.split("&").reverse();
            for(const el of filterSplit) {
              let elSplit = el.split("=");
              if(elSplit[0] == "localityId") return {type:elSplit[0],id:elSplit[1]}; 
              if(elSplit[0] == "villageId") return {type:elSplit[0],id:elSplit[1]}; 
              if(elSplit[0] == "countyId") return {type:elSplit[0],id:elSplit[1]}; 
              // console.log({[elSplit[0]]:elSplit[1]})
            }
          } else {
            if(user.localityId) return({
                type:"localityId",
                id:user.localityId
            });
                return({
                    type:"villageId",
                    id:user.villageId
                });
          }

    }

    const [zone, setZone] = useState(()=>setDefaultZone());
    const [locality, setLocality] = useState("");
    const [village, setVillage] = useState("");
    const [county, setCounty] = useState("");

    const changeZone = (e)=> {
        setZone({
            type:e.target.value,
            id:user[e.target.value]
        })
        if(user.zoneRole=="CETATEAN" || user.zoneRoleOn=="LOCALITY") {
            navigate("/" + e.target.value + "=" + user[e.target.value]);
        }
        else {
            if(user.zoneRoleOn == "VILLAGE") {

            }
            if(user.zoneRoleOn == "COUNTY") {
                
            }
        }
    }


    return (
        <div className="feed-select">
        <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label zone-select__title">Selecteaza zona</FormLabel>
        <RadioGroup
          value={zone.type}
          onChange={changeZone}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="countyId" control={<Radio />} label="Judet" />
          <FormControlLabel value="villageId" control={<Radio />} label="Oras" />
          {
              user.localityId ? <FormControlLabel value="localityId" control={<Radio />} label="Localitate" /> : ""
          }
          
        </RadioGroup>
        <span className="error-default"></span>
      </FormControl>
      {zone.type} :{zone.id}
        </div>
    )
}

export default FeedSelect;
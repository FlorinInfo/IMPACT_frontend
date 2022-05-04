import "./FeedSelectStyles.scss";

import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImpactStore } from "../../../store/ImpactStore";
import { useNavigate } from "react-router-dom";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { AsyncPaginate } from "react-select-async-paginate";
import axios from "../../../assets/axios/axios";

const AdminFeedSelect = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(ImpactStore);
  const [localitate, setLocalitate] = useState("");
  const [oras, setOras] = useState("");
  const [judet, setJudet] = useState("");
  const [orase, setOrase] = useState([]);
  const [localitati, setLocalitati] = useState([]);
  const [expand, setExpand] = useState(false);

  const setJudetDefault = () => {
    if (
      (user.zoneRoleOn == "LOCALITY" ||
        user.zoneRoleOn == "VILLAGE" ||
        user.zoneRoleOn == "COUNTY") &&
      user.admin != true
    )
      return {
        name: "",
        id: user.countyId,
      };
    return {
      name: "",
      id: null,
    };
  };
  const setOrasDefault = () => {
    if (
      (user.zoneRoleOn == "LOCALITY" || user.zoneRoleOn == "VILLAGE") &&
      user.admin != true
    )
      return {
        name: "",
        id: user.villageId,
      };
    return {
      name: "",
      id: null,
    };
  };
  const setLocalitateDefault = () => {
    if (user.zoneRoleOn == "LOCALITY" && user.admin != true)
      return {
        name: "",
        id: user.localityId,
      };
    return {
      name: "",
      id: null,
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
    console.log(orase);
  }, [judet.id]);

  const loadJudete = async (search) => {
    // Verify if it's not an id in search
    if (!isNaN(search)) search = "";
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
    if (!isNaN(search)) search = "";
    const response = await axios.get(`/villages?countyId=${judet.id}`);
    console.log(response);
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
    if (!isNaN(search)) search = "";
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

  const goFeed = () => {
    let route = `/${judet.id ? "&countyId=" + judet.id : ""}${
      oras.id ? "&villageId=" + oras.id : ""
    }${localitate.id ? "&localityId=" + localitate.id : ""}`;
    route = route.slice(0, 1) + route.slice(2);
    navigate(route);
  };

  return (
    <div className="admin-select-feed">
      <button
        className="admin-select-feed__btn button-default-form"
        onClick={() => setExpand(!expand)}
      >
        {expand == true ? "Ascunde " : "Vezi "} filtre
      </button>
      {expand ? (
        <>
          <AsyncPaginate
            name="judet"
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            classNamePrefix="react-select"
            className="react-select"
            value={judet}
            onChange={setJudet}
            loadOptions={loadJudete}
            placeholder={"Selecteaza judet"}
          />
          <AsyncPaginate
            style={{ marginTop: `20px` }}
            isDisabled={judet.id == null || orase.length == 0}
            key={judet.id}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            classNamePrefix="react-select"
            className="react-select"
            value={oras}
            onChange={setOras}
            loadOptions={loadOrase}
            placeholder={"Selecteaza oras/comuna"}
          />
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
            placeholder={"Selecteaza localitate"}
          />
          <button
            className="admin-select-feed__btn button-default-form"
            onClick={goFeed}
          >
            Filtreaza
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

const FeedSelect = () => {
  const { user, setUser } = useContext(ImpactStore);
  const navigate = useNavigate();
  const { routeFilter } = useParams();
  const setDefaultZone = () => {
    if (routeFilter != undefined) {
      let filterSplit = routeFilter.split("&").reverse();
      for (const el of filterSplit) {
        let elSplit = el.split("=");
        if (elSplit[0] == "localityId")
          return { type: elSplit[0], id: elSplit[1] };
        if (elSplit[0] == "villageId")
          return { type: elSplit[0], id: elSplit[1] };
        if (elSplit[0] == "countyId")
          return { type: elSplit[0], id: elSplit[1] };
        // console.log({[elSplit[0]]:elSplit[1]})
      }
    } else {
      if (user.localityId)
        return {
          type: "localityId",
          id: user.localityId,
        };
      return {
        type: "villageId",
        id: user.villageId,
      };
    }
  };

  const [routeLocalityId, setRouteLocalityId] = useState("");
  const [routeVillageId, setRouteVillageId] = useState("");
  const [routeCountyId, setRouteCountyId] = useState("");

  const [zone, setZone] = useState(() => setDefaultZone());
  const [localitati, setLocalitati] = useState([]);
  const [localitate, setLocalitate] = useState({});
  const [orase, setOrase] = useState([]);
  const [oras, setOras] = useState({
    name: user.Village ? user.Village.name : "",
    id: user.Village ? user.villageId : "",
  });
  const [locality, setLocality] = useState("");
  const [village, setVillage] = useState("");
  const [county, setCounty] = useState("");

  const changeZone = (e) => {
    setZone({
      type: e.target.value,
      id: user[e.target.value],
    });
    if (user.zoneRole == "CETATEAN" || user.zoneRoleOn == "LOCALITY") {
      navigate("/" + e.target.value + "=" + user[e.target.value]);
    } else {
      if (user.zoneRoleOn == "VILLAGE") {
        navigate("/" + e.target.value + "=" + user[e.target.value]);
      }
      if (user.zoneRoleOn == "COUNTY") {
        navigate("/" + e.target.value + "=" + user[e.target.value]);
      }
    }
  };

  const changeLocality = (l) => {
    setLocalitate(l);
    if (user.zoneRoleOn == "VILLAGE") navigate("/localityId=" + l.id);
    if (user.zoneRoleOn == "COUNTY") {
      navigate("/villageId=" + oras.id + "&localityId=" + l.id);
    }
  };

  const changeVillage = (v) => {
    setOras(v);
    if (user.zoneRoleOn == "VILLAGE") navigate("/villageId=" + v.id);
    if (user.zoneRoleOn == "COUNTY") {
      if (zone.type == "villageId") {
        navigate("/villageId=" + v.id);
      } else {
        setLocalitate({
          name: "",
          id: "",
        });
        loadLocalitati("");
      }
    }
  };

  const loadLocalitati = async (search) => {
    let orasId;
    if (user.zoneRoleOn == "VILLAGE") orasId = user.villageId;
    if (user.zoneRoleOn == "COUNTY" && oras) orasId = oras.id;
    // alert("oras " + orasId);
    console.log(orasId);
    const response = await axios.get(`/localities?villageId=${orasId}`);

    let options = [];
    if (
      Array.isArray(response.data) &&
      response.data.length &&
      !response.data.errors
    ) {
      options = response.data.filter((l) =>
        l.name.toLowerCase().startsWith(search.toLowerCase())
      );
    }
    console.log("xxxxxxxxxxxxxxxxxxxxxx", options);
    setLocalitati(options);
    return {
      options,
    };
  };

  const loadOrase = async (search) => {
    const cityFilter = zone.type == "localityId" ? [false] : [true, false];
    const response = await axios.get(`/villages?countyId=${user.countyId}`);
    let options = [];
    if (Array.isArray(response.data) && response.data.length) {
      options = response.data.filter(
        (l) =>
          l.name.toLowerCase().startsWith(search.toLowerCase()) &&
          cityFilter.includes(l.city)
      );
    }
    setOrase(options);
    return {
      options,
    };
  };

  useEffect(async () => {
    if (routeFilter) {
      let idLoc = null,
        idVill = null,
        idCoun = null;
      let filterSplit = routeFilter.split("&").reverse();
      for (const el of filterSplit) {
        let elSplit = el.split("=");
        if (elSplit[0] == "localityId") {
          idLoc = elSplit[1];
          setRouteLocalityId(elSplit[1]);
        }
        if (elSplit[0] == "villageId") {
          idVill = elSplit[1];
          setRouteVillageId(elSplit[1]);
        }
        if (elSplit[0] == "countyId") {
          idCoun = elSplit[1];
          setRouteCountyId(elSplit[1]);
        }
      }
      if (idLoc == null) idLoc = user.localityId;
      if (idVill == null) idVill = user.villageId;
      if (idCoun == null) idCoun = user.countyId;
      if (user.zoneRoleOn == "VILLAGE") {
        const l = await loadLocalitati("");
        setLocalitate(l.options.find((e) => e.id == idLoc));
      }
      if (user.zoneRoleOn == "COUNTY") {
        if (zone.type == "villageId") {
          const v = await loadOrase("");
          setOras(v.options.find((e) => e.id == idVill));
        }
        if (zone.type == "localityId") {
          // alert(idLoc )
          const v = await loadOrase("");
          setOras(v.options.find((e) => e.id == idVill));
          console.log(idVill);
          //   setLocalitate(l.options.find((e) => e.id == idLoc));
        }
      }
    } else {
      setOras({
        name: user.Village.name,
        id: user.villageId,
      });
      setLocalitate({
        name: user.Locality ? user.Locality.name : null,
        id: user.localityId ? user.localityId : null,
      });
    }
  }, []);

  const setDefaultLocalitate = (obj) => {
    if (obj) setLocalitate(obj);
    else
      setLocalitate({
        name: "",
        id: "",
      });
  };

  useEffect(async () => {
    loadLocalitati("");
    if (user.zoneRoleOn == "COUNTY") {
      const l = await loadLocalitati("");
      let defLoc = l.options.find((e) => e.id == routeLocalityId);
      if (defLoc != undefined) setDefaultLocalitate(defLoc);
      else {
        if (oras.id == user.villageId)
          setDefaultLocalitate({
            name: user.Locality ? user.Locality.name : null,
            id: user.localityId ? user.localityId : null,
          });
      }
    }
  }, [oras]);

  //   useEffect(()=> {
  //       alert(localitate.id)
  //   },[localitate])

  // const changeLocality = (value)=> {
  //     setLocalitate(value);
  //     console.log(value);
  // }

  return (
    <div className="feed-select">
      {user.admin == false ? (
        <>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label zone-select__title">
              Selecteaza zona
            </FormLabel>
            <RadioGroup
              value={zone.type}
              onChange={changeZone}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="countyId"
                control={<Radio />}
                label="Judet"
              />
              <FormControlLabel
                value="villageId"
                control={<Radio />}
                label="Oras / Comuna"
              />
              {user.localityId || user.zoneRoleOn == "COUNTY" ? (
                <FormControlLabel
                  value="localityId"
                  control={<Radio />}
                  label="Localitate"
                />
              ) : (
                ""
              )}
            </RadioGroup>
            <span className="error-default"></span>
          </FormControl>
          {user.zoneRoleOn == "VILLAGE" &&
          user.localityId &&
          zone.type == "localityId" ? (
            <>
              <label htmlFor="localitate" className="async-paginate-label">
                Selecteaza localitate
              </label>
              <AsyncPaginate
                name="localitate"
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                classNamePrefix="react-select"
                className="react-select"
                value={localitate}
                onChange={changeLocality}
                loadOptions={loadLocalitati}
                placeholder={""}
              />
            </>
          ) : (
            ""
          )}
          {user.zoneRoleOn == "COUNTY" && zone.type == "villageId" ? (
            <>
              <label htmlFor="oras" className="async-paginate-label">
                Selecteaza oras / comuna
              </label>
              <AsyncPaginate
                name="oras"
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                classNamePrefix="react-select"
                className="react-select"
                value={oras}
                onChange={changeVillage}
                loadOptions={loadOrase}
                placeholder={""}
              />
            </>
          ) : (
            ""
          )}
          {user.zoneRoleOn == "COUNTY" && zone.type == "localityId" ? (
            <>
              <label htmlFor="oras" className="async-paginate-label">
                Selecteaza oras / comuna
              </label>
              <AsyncPaginate
                name="oras"
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                classNamePrefix="react-select"
                className="react-select"
                value={oras}
                onChange={changeVillage}
                loadOptions={loadOrase}
                placeholder={""}
              />
              <label htmlFor="localitate" className="async-paginate-label">
                Selecteaza localitate
              </label>
              <AsyncPaginate
                name="localitate"
                className="async-paginate-locality"
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                classNamePrefix="react-select"
                className="react-select"
                value={localitate}
                onChange={changeLocality}
                loadOptions={loadLocalitati}
                placeholder={""}
              />
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <AdminFeedSelect />
        </>
      )}
    </div>
  );
};

export default FeedSelect;

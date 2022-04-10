import axios from "axios";
const instance = axios.create({ baseURL: "https://backend.imp-act.ml" });
export default instance;

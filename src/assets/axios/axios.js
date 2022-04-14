import axios from "axios";
import { Service } from 'axios-middleware';
const instance = axios.create({ baseURL: "https://backend.imp-act.ml" });
const service = new Service(instance);

service.register({
  onRequest(config) {
    console.log('onRequest');
    return config;
  },
  onSync(promise) {
    console.log('onSync');
    return promise;
  },
  onResponse(response) {
    console.log(response);
    return response; 
  }
});

export default instance;

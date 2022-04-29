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
    console.log(response)
    if(response.status !== 204&&response.status !== 201) {
      let parsedResponse = response.data;
      parsedResponse = JSON.parse(parsedResponse);
      // console.log("xxxx", parsedResponse.errors.permission);
      if(parsedResponse.errors) {
        if(parsedResponse.errors.permission) window.location = '/';
      }
    }
    return response; 
  }
});

export default instance;

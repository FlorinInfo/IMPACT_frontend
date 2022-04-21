import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { ImpactStoreProvider } from "./store/ImpactStore";


ReactDOM.render(
  <React.StrictMode>
    <ImpactStoreProvider>
    <BrowserRouter>
      <CookiesProvider>
        {/* <Provider store={store}> */}
          <App />
        {/* </Provider> */}
      </CookiesProvider>
    </BrowserRouter>
    </ImpactStoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

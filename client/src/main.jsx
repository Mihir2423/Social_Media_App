import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { persistStore } from "redux-persist";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <ReactNotifications />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

persistStore(store);

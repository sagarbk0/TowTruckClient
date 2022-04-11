import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Service from "./Service";
import Manager from "./Manager";
import Driver from "./Driver";
import SignIn from "./SignIn";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="service" element={<Service />}></Route>
      <Route path="manager" element={<Manager />}></Route>
      <Route path="driver" element={<Driver />}></Route>
      <Route path="sign_in" element={<SignIn />}></Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

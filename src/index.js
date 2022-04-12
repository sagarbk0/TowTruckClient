import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { python_server } from "./settings";

import App from "./App";
import Service from "./service/Service";
import ServiceDetails from "./service/ServiceDetails";
import Manager from "./Manager";
import Driver from "./driver/Driver";
import SignIn from "./login/SignIn";
import SignUp from "./login/SignUp";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="service" element={<Service />}></Route>
      <Route path="service_details" element={<ServiceDetails />}></Route>
      <Route path="manager" element={<Manager />}></Route>
      <Route path="driver" element={<Driver />}></Route>
      <Route path="sign_in" element={<SignIn />}></Route>
      <Route path="sign_up" element={<SignUp />}></Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

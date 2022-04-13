import "../styles.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Header from "../Header";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { python_server } from "../settings";
import * as func from '../Functions';

export default function Driver() {
  const cookies = new Cookies();
  const [isDriver, setIsDriver] = useState(false);
  const [message, setMessage] = useState("");
  const [serviceId, setServiceId] = useState("");

  useEffect(() => {
    if (cookies.get("acct_type") === "driver") {
      setIsDriver(true);
    }
  }, []);

  return (
    <>
      <Header />
      <h1>Driver</h1>
      {isDriver ? (
        <div>
          <TextField label="Service ID" onChange={(e) => func.changeParameter(e, setServiceId)}></TextField>
          <br />
          <br />
          <Button className="button" variant="outlined">
            Set service ID to finished
          </Button>
          <br />
          <br />
          <br />
          <TextField label="Message" onChange={(e) => func.changeParameter(e, setMessage)}>
          </TextField>
          <br />
          <br />
          <Button className="button" variant="outlined">
            Send message to manager
          </Button>
          <br />
          <br />
        </div>
      ) : (
        <div>Please login as a driver to access this page.</div>
      )}
    </>
  );
}

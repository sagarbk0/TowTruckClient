import "./styles.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Header from "./Header";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

export default function Driver() {
  const cookies = new Cookies();
  const [isDriver, setIsDriver] = useState(false);

  useEffect(() => {
    if (cookies.get("acct_type") === "driver") {
      setIsDriver(true);
    }
  }, []);

  return (
    <>
      <Header />

      {isDriver ? (
        <div>
          <h1>Driver</h1>
          <br />
          <Button className="button" variant="outlined">
            View today's schedule
          </Button>
          <br />
          <br />
          <Button className="button" variant="outlined">
            View nearby service requests
          </Button>
          <br />
          <br />
          <Button className="button" variant="outlined">
            View nearby drivers
          </Button>
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

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
    if (cookies.get("role") === "Driver") {
      setIsDriver(true);
    }
  }, []);

  return (
    <>
      <Header />

      {isDriver ? (
        <div>
          <h1>Driver</h1>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" }
            }}
          >
            <TextField required label="Email ID"></TextField>
            <br />
            <br />
            <TextField required type="password" label="Password"></TextField>
            <br />
            <br />
            <Button variant="contained">Login</Button>
          </Box>
          <br />
          <br />
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

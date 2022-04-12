import "./styles.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Header from "./Header";
import { python_server } from "./settings";

export default function Manager() {
  const cookies = new Cookies();
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    if (cookies.get("acct_type") === "manager") {
      setIsManager(true);
    }
  }, []);

  return (
    <>
      <Header />

      {isManager ? (
        <div>
          <h1>Manager</h1>
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
            View trucks available at station
          </Button>
          <br />
          <br />
          <Button className="button" variant="outlined">
            View map of active trucks
          </Button>
          <br />
          <br />
          <Button className="button" variant="outlined">
            View active service requests
          </Button>
          <br />
          <br />
          <Button className="button" variant="outlined">
            View active employees
          </Button>
          <br />
          <br />
        </div>
      ) : (
        <div>Please login as a manager to access this page.</div>
      )}
    </>
  );
}

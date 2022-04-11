import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { verifyLogin } from "./SignIn";
import { Box, AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function Header() {
  const cookies = new Cookies();
  const [email, setEmail] = useState(null);
  const [fname, setFName] = useState(null);
  const [lname, setLName] = useState(null);

  useEffect(() => {
    const stored_email = cookies.get("email");

    if (stored_email) {
      setEmail(stored_email);
    }
  }, []);

  useEffect(() => {
    const stored_password = cookies.get("password");
    if (email && !verifyLogin(email, stored_password)) setEmail(null);
    setFName(cookies.get("fname"));
    setLName(cookies.get("lname"));
  }, [email]);

  const logout = () => {
    setEmail(null);
    cookies.remove("email");
    cookies.remove("password");
    cookies.remove("role");
  };

  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography
          // variant="h6"
          component="button"
          // sx={{ display: "span" }}
          // style={{ display: "span" }}
        >
          <a style={{ color: "#993414", textDecoration: "none" }} href="/">
            Home
          </a>
        </Typography>
        <Typography
          component="div"
          // edge="end"
          sx={{ ml: 2 }}
        >
          {!email ? (
            <div style={{ textAlign: "right" }}>
              You are not logged in.{" "}
              <a
                style={{ color: "lightblue", textDecoration: "none" }}
                href="/sign_in"
              >
                Sign in here.
              </a>
            </div>
          ) : (
            <div>
              You are logged in as {fname} {lname} ({email})
              <br />
              <Button variant="contained" onClick={logout}>
                Sign out
              </Button>
            </div>
          )}
        </Typography>
      </Toolbar>
    </AppBar>
    //{" "}
    // </Box>
  );
}

import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";
import { python_server, cookies } from "../settings";

export const verifyLogin = (email, password) => {
  const promise = axios
    .post(`${python_server}find_login`, {
      email: email,
      password: password
    })
    .then(function (response) {
      const data = response["data"]["results"];
      if (data.length > 0) {
        return data[0];
      } else {
        return [false];
      }
    });
  return promise;
};

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loginDetails, setLoginDetails] = useState([]);

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitForm = () => {
    verifyLogin(email, password)
    .then(function (result) {
      setLoginDetails(result)
    });
  };

  useEffect(() => {
    console.log(loginDetails);
    if (loginDetails.length > 0) {
      if (loginDetails.length > 0 && loginDetails[0] === false) {
        setError(true);
      } else {
        cookies.set("email", email);
        cookies.set("password", password);
        cookies.set("fname", loginDetails[2]);
        cookies.set("lname", loginDetails[3]);
        cookies.set("acct_type", loginDetails[4]);
        window.location.replace("/");
        window.location.reload;
      }
    }
  }, [loginDetails]);

  return (
    <div>
      <Header />
      <h1>Sign In</h1>
      <br />
      <TextField label="Email" onChange={changeEmail} />
      <br />
      <br />
      <TextField label="Password" type="password" onChange={changePassword} />
      <br />
      <br />
      <Button variant="contained" onClick={submitForm}>
        Submit
      </Button>
      <br />
      <br />
      {error ? (
        <div>The login details are incorrect, please try again.</div>
      ) : (
        <></>
      )}
    </div>
  );
}

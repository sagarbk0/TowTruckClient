import "./styles.css";
import { Box, TextField, Button, MenuItem, Table, TableBody, TableHead, TableRow, TableCell, TableContainer } from "@mui/material";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Header from "./Header";
import { python_server } from "./settings";
import axios from "axios";

export default function Manager() {
  const cookies = new Cookies();
  const [isManager, setIsManager] = useState(false);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (cookies.get("acct_type") === "manager") {
      setIsManager(true);
    }
  }, []);

  const drivers = (e) => {
    axios
      .get(`${python_server}etobicoke/get_drivers`)
      .then((response) => {
          console.log(response);
          setColumns(response['data']['columns'])
          setData(response['data']['data'])
      }
      )

  }

  return (
    <>
      <Header />
      <h1>Manager</h1>
      {isManager ? (
        <div>
          <Button className="button" variant="outlined" onClick={drivers}>
            View status of drivers
          </Button>
          <br />
          <br />
          <Button className="button" variant="outlined">
            View status of vehicles
          </Button>
          <br />
          <br />

          <Table sx={{ maxWidth: '400px', margin: 'auto' }}>
            <TableHead>
              <TableRow>
                {columns.map((element, index, array) => {
                  return <TableCell>{element}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((element, index, array) => <TableRow>{element.map((row) => <TableCell>{row}</TableCell>)}</TableRow>)}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div>Please login as a manager to access this page.</div>
      )}
    </>
  );
}

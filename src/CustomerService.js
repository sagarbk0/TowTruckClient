import { python_server, cookies } from "./settings";
import axios from "axios";
import Header from "./Header";
import { Box, TextField, Button, MenuItem, Table, TableBody, TableHead, TableRow, TableCell, TableContainer } from "@mui/material";
import * as func from './Functions';
import { useState, useEffect } from "react";

export default function CustomerService() {
    const acct_type = cookies.get('acct_type');
    const [id, setId] = useState();
    const ids = [1, 2, 3];
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    const getRequests = (e) => {
        axios.get(`${python_server}customer_service_list/${id}`)
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
            <h1>Customer Service</h1>
            {acct_type === 'customer_service' ?
                <>
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "25ch", textAlign: "left" }
                        }}
                    >
                        <div>Enter the portal for which you would like to see requests.</div>
                        <TextField select value={id} label="Customer Service Portal" onChange={(e) => func.changeParameter(e, setId)}>
                            {ids.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>

                        <br />
                        <br />
                        <Button onClick={getRequests} autoFocus>View requests</Button>
                        
                        <br />
                        <br />
                        <Table sx={{maxWidth: '400px', margin: 'auto'}}>
                            <TableHead>
                                <TableRow>
                                    {columns.map((element, index, array) => {
                                        return <TableCell>{element}</TableCell>
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((element, index, array) => <TableRow>{element.map((row) => <TableCell>{row}</TableCell>)}</TableRow>)}
            {/* element.map((row) => <TableCell>{row}</TableCell>)} : null
                                </TableRow>) */}
                            </TableBody>
                        </Table>
                    </Box>
                </> : <div>Please login with a customer service account to access this page.</div>
            }
        </>
    )
}
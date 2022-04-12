import { useState, useEffect } from "react";
import { Button, TextField, Table, TableBody, TableRow, TableCell, TableContainer, Paper, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { python_server, cookies } from "../settings";
import axios from "axios";
import Header from "../Header";

export default function ServiceDetails() {
    const [email, setEmail] = useState(null);
    const [serviceId, setServiceId] = useState(null);
    const [serviceDetails, setServiceDetails] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        setEmail(cookies.get("email"));
    }, []);

    const changeServiceId = (event) => {
        setServiceId(event.target.value);
    }

    const submitId = (event) => {
        axios
            .get(`${python_server}get_service_details/${serviceId}`)
            .then((response) => {
                if (response["data"] === 'data_not_found') {
                    setOpenDialog(true);
                } else {
                    const data = response["data"]["data"];
                    const rows = response["data"]["columns"];

                    const result = [];

                    data.map((element, index, array) => {
                        result.push([rows[index], element]);
                    });

                    setServiceDetails(result);
                }
            });
    }


    const handleClose = (event) => {
        setOpenDialog(false);
    }

    return (
        <>
            <Header />
            {email ?
                <div>
                    <Dialog open={openDialog} onClose={handleClose}>
                        <DialogTitle id="alert-dialog-title">
                            {"Data not found"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>Close</Button>
                        </DialogActions>
                    </Dialog>
                    <h1>View Service Details</h1>
                    <TextField
                        label="Enter service ID"
                        value={serviceId}
                        onChange={changeServiceId}
                        required
                    ></TextField>
                    <br />
                    <br />
                    <Button variant="contained" onClick={submitId}>Submit</Button>
                    {serviceDetails ?
                        <div>
                            <h2>Service Details</h2>
                                <Table sx={{ maxWidth: '350px', margin: 'auto'}}>
                                    <TableBody>
                                        {serviceDetails.map((element, index, array) => {
                                            return <TableRow>
                                                <TableCell sx={{border: 1}}>
                                                    {element[0]}
                                                </TableCell>
                                                <TableCell sx={{border: 1}}>
                                                    {element[1]}
                                                </TableCell>
                                            </TableRow>
                                        })}
                                    </TableBody>
                                </Table>
                        </div> : <></>
                    }
                </div> : <></>
            }
        </>
    )
}
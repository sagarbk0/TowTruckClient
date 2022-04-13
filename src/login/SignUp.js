import { TextField, Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import Header from "../Header";
import { python_server, cookies } from "../settings";
import * as func from '../Functions';
import { useState, useEffect } from "react";
import axios from "axios";

export default function SignUp() {
    const [acctType, setAcctType] = useState("customer");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [station, setStation] = useState("");
    const [id, setId] = useState("");
    const [serverMessage, setServerMessage] = useState(undefined);
    const [openDialog, setOpenDialog] = useState(false);

    const acctTypes = [
        'customer',
        'manager',
        'driver'
    ]

    const submitForm = (event) => {
        axios.post(`${python_server}signup`,
            {
                acctType: acctType,
                email: email,
                password: password,
                fname: fname,
                lname: lname,
                station: station,
                id: id
            }
        ).then(function (response) {
            setOpenDialog(true);
            setServerMessage(response['data']);
        })
    }

    const handleClose = (event) => {
        setOpenDialog(false);
    }

    return (
        <div>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">
                    {"Service message"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {serverMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>Close</Button>
                </DialogActions>
            </Dialog>
            <Header />
            <h1>Sign Up</h1>
            <br />
            <TextField required label="Email" onChange={(e) => func.changeParameter(e, setEmail)} />
            <br />
            <br />
            <TextField required label="Password" type="password" onChange={(e) => func.changeParameter(e, setPassword)} />
            <br />
            <br />
            <TextField required label="First name" onChange={(e) => func.changeParameter(e, setFName)} />
            <br />
            <br />
            <TextField required label="Last name" onChange={(e) => func.changeParameter(e, setLName)} />
            <br />
            <br />
            <TextField required select value={acctType} label="Account type" onChange={(e) => func.changeParameter(e, setAcctType)}>
                {acctTypes.map((item) => (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </TextField>
            {acctType !== 'customer' ?
                <>
                    <br />
                    <br />
                    <div>Your account will need to be verified by a customer service agent before being activated.</div>
                    <br />
                    <div>This may take upto 24 hours.</div>
                    <br />
                    <div>Also, you need to provide the following details:</div>
                    <br />
                    <br />
                    <TextField required label="Station" onChange={(e) => func.changeParameter(e, setStation)} />
                    <br />
                    <br />
                    <TextField required label="ID" onChange={(e) => func.changeParameter(e, setId)} />
                </> : <></>
            }
            <br />
            <br />
            <Button variant="contained" onClick={submitForm}>
                Submit
            </Button>
        </div>
    )
}

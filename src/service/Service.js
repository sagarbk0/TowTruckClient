import "../styles.css";
import { useState, useEffect } from "react";
import { Button, Dialog, TextField, MenuItem, Typography, Box, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "../Header";
import { python_server } from "../settings";

// const categories = [
//   "Accident",
//   "Engine Trouble",
//   "Ran Out of Gas",
//   "Extreme Weather",
//   "Illegally Parked"
// ];

const boolean = ["Yes", "No"];

export const getDate = () => {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

export default function Service() {
  const [category, setCategory] = useState("");
  // const [categories, setCategories] = useState([]);
  // const [categoriesDict, setCategoriesDict] = useState([]);
  const [email, setEmail] = useState(null);
  const [details, setDetails] = useState(null);
  const [location, setLocation] = useState(null);
  const [blockingRoad, setBlockingRoad] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [serviceId, setServiceId] = useState(null);

  const categories = [
    "1. Dislodge a Vehicle from a Ditch",
    "2. Move a Completely Destroyed Vehicle",
    "3. Move a Significantly Damaged Vehicle",
    "4. Remove a Vehicle from Ditch, Mud etc",
    "5. Move a Stalled Vehicle",
    "6. Move an Illegally Parked Vehicle"
  ]

  // const categories = ["Boom Truck", "Flatbed", "Hook and Chain", "Wheel Lift"];


  const cookies = new Cookies();

  useEffect(() => {
    setEmail(cookies.get("email"));
  }, []);

  // useEffect(() => {
  //   if (email) {
  //     console.log('Getting service categories');
  //     axios
  //       .get(`${python_server}get_service_categories`)
  //       .then((response) => {
  //         console.log('Service categories received');
  //         const categories_data = response["data"]["categories"];
  //         let categories_array = [];
  //         let categories_dictionary = {};
  //         for (const i in categories_data) {
  //           categories_array.push(categories_data[i][1]);
  //           categories_dictionary[categories_data[i][1]] = categories_data[i][0];
  //         }
  //         setCategories(categories_array);
  //         setCategoriesDict(categories_dictionary);
  //         console.log(categories_array)
  //         console.log(categories_dictionary)
  //       });
  //   }
  // }, [email])


  const changeCategory = (event) => {
    setCategory(event.target.value);
  };

  const changeDetails = (event) => {
    setDetails(event.target.value);
  }

  const changeLocation = (event) => {
    setLocation(event.target.value);
  }

  const changeBlockingRoad = (event) => {
    setBlockingRoad(event.target.value);
  }

  const handleClose = (event) => {
    setOpenDialog(false);
  }

  const submitForm = (event) => {
    axios.post(`${python_server}new_request`, {
      serviceCategory: category[0],
      customerId: email,
      dateTimeRequested: getDate(),
      details: details,
      address: location
    }).then(function (response) {
      console.log(response);
      setServiceId(response['data']);
      setOpenDialog(true);
    });
  };

  return (
    <>
      <Header />
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Service Info"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your service ID is {serviceId}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button href="/service_details">View service details</Button>
          <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
      {email ? (
        <div>
          <h1>Service Request</h1>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch", textAlign: "left" }
            }}
          >
            <TextField label="Description" onChange={changeDetails}></TextField>
            <br />
            <br />
            <TextField label="Location" required onChange={changeLocation}></TextField>
            <br />
            <br />
            <TextField
              select
              label="Service Category"
              value={category}
              onChange={changeCategory}
              required
            >
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <br />
            <TextField select value={blockingRoad || ""} label="Is it blocking the road?" required
              onChange={changeBlockingRoad}>
              {boolean.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <br />
            <Button variant="contained" onClick={submitForm}>
              Submit
            </Button>
          </Box>
        </div>
      ) : (
        <>Please login to request a service.</>
      )}
    </>
  );
}

import "./styles.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "./Header";

// const categories = [
//   "Accident",
//   "Engine Trouble",
//   "Ran Out of Gas",
//   "Extreme Weather",
//   "Illegally Parked"
// ];

const boolean = ["Yes", "No"];

export default function Service() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesDict, setCategoriesDict] = useState([]);
  const [email, setEmail] = useState(null);

  // const categories = ["Boom Truck", "Flatbed", "Hook and Chain", "Wheel Lift"];

  const cookies = new Cookies();

  useEffect(() => {
    setEmail(cookies.get("email"));

    axios
      .get("https://sagarbk.pythonanywhere.com/get_categories")
      .then((response) => {
        const categories_data = response["data"]["categories"];
        let categories_array = [];
        let categories_dictionary = {};
        for (const i in categories_data) {
          categories_array.push(i[1]);
          categories_dictionary[i[1]] = i[0];
        }
        setCategories(categories_array);
        setCategoriesDict(categories_dictionary);
      });
  }, []);

  // useEffect(() => {
  //   setCategory(categories[0]);
  // }, [categories]);

  const changeCategory = (event) => {
    setCategory(event.target.value);
    // cookies.set("username", event.target.value);
  };

  const submitForm = (event) => {
    axios.post("https://sagarbk.pythonanywhere.com/add_service", {
      ServiceCategory: categoriesDict[category]
    });
  };

  return (
    <>
      <Header />
      {email !== null ? (
        <div>
          <h1>Service Request</h1>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch", textAlign: "left" }
            }}
          >
            <TextField label="Description"></TextField>
            <br />
            <br />
            <TextField label="Location"></TextField>
            <br />
            <br />
            <TextField
              select
              label="Vehicle Category"
              value={category}
              onChange={changeCategory}
            >
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <br />
            <TextField select value="" label="Is it blocking the road?">
              {boolean.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <br />
            {/* <TextField required label="Email ID"></TextField>
        <br />
        <br />
        <TextField required type="password" label="Password"></TextField>
        <br />
        <br /> */}
            {/* An account will automatically be created if it doesn't exist. */}
            {/* <br />
        <br /> */}
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

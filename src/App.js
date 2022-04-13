import "./styles.css";
import Button from "@mui/material/Button";
import Cookies from "universal-cookie";
import Header from "./Header";
import { python_server } from "./settings";

export default function App() {
  const cookies = new Cookies();

  console.log(cookies.get("username"));
  console.log(cookies.get("whate"));

  return (
    <>
      <Header />
      <div className="App">
        <h1>TORONTO TOW TRUCKS</h1>
        <Button className="button" variant="outlined" href="/service">
          Request a tow truck
        </Button>
        <br />
        <br />
        <Button className="button" variant="outlined" href="/service_details">
          View service details
        </Button>
        <br />
        <br />
        <Button
          className="button"
          variant="outlined"
          color="secondary"
          href="/manager"
        >
          Manager portal
        </Button>
        <br />
        <br />
        <Button
          className="button"
          variant="outlined"
          color="success"
          href="/driver"
        >
          Driver portal
        </Button>
        <br />
        <br />
        <Button
          className="button"
          variant="outlined"
          sx={{color: 'orange'}}
          href="/customer_service"
        >
          Customer service
        </Button>
        
      </div>
    </>
  );
}

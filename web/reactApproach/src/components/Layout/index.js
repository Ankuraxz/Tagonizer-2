import React, {useState} from "react";
import "../../app.css"
import  PacmanLoader from "react-spinners/PacmanLoader";
import {
    Card, CardHeader, CardBody,
   CardFooter
  } from 'reactstrap';




const Layout =(props) => {

    let [loading, setLoading] = useState(false);
return (
    <>
    <Card>
    <CardHeader>
    {/* <h1 class="heading">
          <img src="../../Logo.png" />Tagonizer
        </h1> */}
    <span className="close" onClick={() =>window.close()}>&#10006;</span>
    </CardHeader>
    <CardBody style={{
         width: "400px",
         height:"500px"
    }}>
  {loading ? 
  <div className="loader-div">
       <img src="../../Logo.png" className="main-logo"  />
          <h1>Tagonizer</h1>
          <br />
     <PacmanLoader color={"#C51B1B"} loading={loading}  size={30} />
    </div>:
      props.children}
    </CardBody>
   
    </Card>
     <div className="card-footer" >
     Made By Team Error 404
 </div>
 </>
)
}

export default Layout;
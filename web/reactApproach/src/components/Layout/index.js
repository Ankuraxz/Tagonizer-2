import React, {useState, useContext} from "react";
import LoaderContext from "../context/loader";
import "../../app.css"
import  PacmanLoader from "react-spinners/PacmanLoader";
import {
    Card, CardHeader, CardBody,
   CardFooter
  } from 'reactstrap';




const Layout =(props) => {

    let { loader, setLoader } = useContext(LoaderContext);
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
  {loader ? 
  <div className="loader-div">
       <img src="../../Logo.png" className="main-logo"  />
          <h1>Tagonizer</h1>
          <br />
     <PacmanLoader color={"#C51B1B"} loading={loader}  size={30} />
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
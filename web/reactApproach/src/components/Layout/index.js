import React, {useState, useContext} from "react";
import LoaderContext from "../context/loader";
import ThemeContext from "../context/darkTheme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon , faMeh , faFrown , faSmile } from '@fortawesome/free-solid-svg-icons';
import "../../app.css"
import  PacmanLoader from "react-spinners/PacmanLoader";
import {
    Card, CardHeader, CardBody,
   CardFooter
  } from 'reactstrap';




const Layout =(props) => {

   const [theme, setTheme] = useState(false);


    let { loader, setLoader } = useContext(LoaderContext);
  
return (
    <ThemeContext.Provider value={{theme, setTheme}} >
      <div className={theme ? "body-dark": ""}>
    <Card  >
    <CardHeader>
  
   
   <span className="close" onClick={() =>window.close()}>&#10006;</span>
    <input type="checkbox" id="checkbox1" class="checkbox" value={{theme}} onChange={()=> setTheme(!theme)}/>
        <label class="label" for="checkbox1">
      
        <FontAwesomeIcon icon={faMoon} className="icon-moon"/>
        <FontAwesomeIcon icon={faSun} className="icon-sun" />
          <div class="ball"></div>
        </label>
  
    </CardHeader>
    <CardBody style={{
         width: "400px",
         height:"500px",
         overflowY: "auto"
    }}>
  {loader ? 
  <div className="loader-div">
       <img src="../../Logo.png" className="main-logo"  />
          <h1>Tagonizer</h1>
          <br />
          <div >
     <PacmanLoader color={"#C51B1B"} loading={loader}  size={30} />
     </div>
    </div>:
      props.children}
    </CardBody>
   
    </Card>
    <div className="card-footer" >
     Made By Team Error 404
 </div>
 </div>
 </ThemeContext.Provider>
)
}

export default Layout;
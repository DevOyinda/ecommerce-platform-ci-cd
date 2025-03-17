import React from 'react'
import {Link, Outlet} from 'react-router-dom'


function Layout() {
  return (

    <>
    
    <nav>
        <ul>
            <li style={{display:"inline", marginLeft: "30px"}}>
                <Link to='/'>Home</Link>
            </li>

            <li  style={{display:"inline", marginLeft: "30px"}}>
                <Link to='/About'>About</Link>
            </li>

            <li style={{display:"inline", marginLeft: "30px"}}>
                <Link to='/Contact'>Contact</Link>
            </li>

            <li style={{display:"inline", marginLeft: "30px"}}>
                <Link to='/Support'>Support</Link>
            </li>
        </ul>
    </nav>
    <Outlet />
    </>
 
  )
}

export default Layout

/*import React from "react";
import { Link, Outlet } from "react-router-dom";
function Layout() {
  return (
    <>
      Layout
      <nav>
        <ul>
          <li style={{ display: "inline", marginLeft: "50px" }}>
            <Link to="/">Home</Link>
          </li>
          <li style={{ display: "inline", marginLeft: "50px" }}>
            <Link to="/About">About</Link>
          </li>
          <li style={{ display: "inline", marginLeft: "50px" }}>
            <Link to="/Contact">Contact</Link>
          </li>
          <li style={{ display: "inline", marginLeft: "50px" }}>
            <Link to="/Support">Support</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
*/

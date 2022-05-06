import React from "react";
import { withAuth0 } from '@auth0/auth0-react';
import {Navbar, NavItem } from "react-bootstrap"
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import { Link } from "react-router-dom";

class Header extends React.Component{
  render(){
    return(
      <Navbar>
        <Navbar.Brand>Foodies</Navbar.Brand>
        <div className="navGrouping">
          <NavItem><Link to='/' className="nav-link">Home</Link></NavItem>
          <NavItem><Link to="/Explore" className="nav-link">Explore</Link></NavItem>
          <NavItem><Link to="/Faves" className="nav-link">Faves</Link></NavItem>
          <NavItem><Link to="/AboutUs" className="nav-link">About Us</Link></NavItem>
          {this.props.auth0.isAuthenticated
          ? <LogoutButton/>
          : <LoginButton/>}
        </div>
      </Navbar>
    )
  }
}

export default withAuth0(Header);
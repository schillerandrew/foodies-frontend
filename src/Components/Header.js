import React from "react";
import { withAuth0 } from '@auth0/auth0-react';
import {Navbar, NavItem } from "react-bootstrap"
import LoginButton from "./Login";
import LogoutButton from "./Logout";

class Header extends React.Component{
  render(){
    return(
      <Navbar>
        <Navbar.Brand>Foodies</Navbar.Brand>
        <div className="navGrouping">
          <NavItem><a href="/" className="nav-link">Home</a></NavItem>
          <NavItem><a href="/Explore" className="nav-link">Explore</a></NavItem>
          <NavItem><a href="/Faves" className="nav-link">Faves &#38; Raves</a></NavItem>
          <NavItem><a href="/AboutUs" className="nav-link">About Us</a></NavItem>
          {this.props.auth0.isAuthenticated
          ? <LogoutButton/>
          : <LoginButton/>}
        </div>
      </Navbar>
    )
  }
}

export default withAuth0(Header);
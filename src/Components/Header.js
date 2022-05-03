import React from "react";
import {Button, Navbar, NavItem } from "react-bootstrap"

class Header extends React.Component{
  render(){
    return(
      <Navbar>
        <Navbar.Brand>Foodies</Navbar.Brand>
        <div className="navGrouping">
          <NavItem><a href="/" className="nav-link">Home</a></NavItem>
          <NavItem><a href="/Explore" className="nav-link">Explore</a></NavItem>
          <NavItem><a href="/Faves" className="nav-link">Faves</a></NavItem>
          <NavItem><a href="/AboutUs" className="nav-link">About Us</a></NavItem>
          <Button variant="">
            Log In
          </Button>
        </div>
      </Navbar>
    )
  }
}

export default Header;
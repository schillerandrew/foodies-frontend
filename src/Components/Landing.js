import React from "react";
import LandingImg from "../Images/landingPhoto.jpg"

class Landing extends React.Component{
  render(){
    return(
      <div className="intro">
      <div className="intro-text">
      <h2>Know Your Taste Buds!</h2>
      <p>Start exploring food spots near you!
      Never lose track again, Review and Store your favorites like a true foodie!</p>
      </div>
      <img  className="pizza-img" src={LandingImg} alt="Pizza"/>
      </div>
    )
  }
}

export default Landing;
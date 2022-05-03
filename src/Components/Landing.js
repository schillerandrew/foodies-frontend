import { Button } from "react-bootstrap";
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React from "react";
import LandingImg from "../Images/landingPhoto.jpg"
import { getDefaultNormalizer } from "@testing-library/react";

class Landing extends React.Component{

  handlePost = async () => {
    try{
      console.log(this.props.auth0);
      let user = {
        Email: this.props.auth0.user.email
      }
      let url = `${process.env.REACT_APP_SERVER}/userData`
      await axios.post(url, user)
    } catch (err){
      console.log('we have an err');
    }
  }

  // handleSubmit =  => {
  //   e.preventDefault();
  //   console.log(e.target);
  //   let review = {
  //     YelpData: this.props.storeData,
  //     Review: e.target.review.value
  //   }
  //   this.handlePost(review);
  // }

  checkUser = async () => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        console.log(jwt);
        const config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/userData',
          headers: {Authorization: `Bearer ${jwt}` }
        }
        let result = await axios(config);
        let userHasAccount = false;
        console.log(result.data);
        if(result.data.length > 0){
          console.log('here');
          result.data.forEach(obj => {
            if(obj.Email.includes(this.props.auth0.user.email)){
              userHasAccount = true;
            }
          });
        }
        
        if(!userHasAccount){
          this.handlePost();
        }
      }
    }
    catch (error) {
      console.log('we have an error:')
    }
  }

  render(){
    return(
      <div className="intro">
      <div className="intro-text">
      <h2>Know Your Taste Buds!</h2>
      <p>Start exploring food spots near you!
      Never lose track again, Review and Store your favorites like a true foodie!</p>
      <Button onClick={this.checkUser}>Start</Button>
      </div>
      <img  className="pizza-img" src={LandingImg} alt="Pizza"/>
      </div>
    )
  }
}

export default withAuth0(Landing);
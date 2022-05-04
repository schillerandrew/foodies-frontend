import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header'
import Landing from './Components/Landing';
import Explore from './Components/Explore';
import Faves from './Components/Faves';
import AboutUs from './Components/AboutUs';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: 'Seattle',
      locationData: {},
      yelpData: [],
      locationErr: false,
      // userFaves: [],
      // userReviews: []
    }
  }

  handleSearchEntry = value => {
    this.setState({
      locationName: value
    })
  }

  handleLocationSubmit = e => {
    e.preventDefault();
    this.pullLocation();
  }

  pullLocation = async () => {
    let locationUrl = `${process.env.REACT_APP_SERVER}/location?q=${this.state.locationName}`
    let storeInfo = await axios.get(locationUrl)
    this.setState({
      locationData: storeInfo.data[0]
    })
    this.yelpDataPull(storeInfo.data[0]);
  }

  yelpDataPull = (storeInfo) => {
    let yelpApiUrl = `${process.env.REACT_APP_SERVER}/yelp?lat=${storeInfo.lat}&lon=${storeInfo.lon}`
    axios.get(yelpApiUrl)
      .then(yelpData => {
        this.setState({ yelpData: yelpData.data })
      });
  }

  // storeData = (results) => {
  //   if (results.length > 0) {
  //     results.forEach(obj => {
  //       if (obj.Email.includes(this.props.auth0.user.email)) {
  //         this.setState({
  //           userFaves: obj.YelpData,
  //           userReviews: obj.Reviews
  //         });
  //       }
  //     });
  //   }
  // }

  updateUserData = () => {
    
  }

  componentDidMount() {
    this.pullLocation();
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Landing
              // storeData={this.storeData}
            />
          </Route>
          <Route path="/Explore">
            <Explore
              handleLocationSubmit={this.handleLocationSubmit}
              handleSearchEntry={this.handleSearchEntry}
              yelpData={this.state.yelpData}
              userFaves={this.state.userFaves}
              userReviews={this.state.userReviews}
            />
          </Route>
          <Route path="/Faves">
            <Faves
            />
          </Route>
          <Route path="/AboutUs">
            <AboutUs />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default withAuth0(App);

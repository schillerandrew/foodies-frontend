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
import axios from 'axios';



class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      locationName: 'Seattle',
      locationData: {},
      locationErr: false,
      dummyLocations: []
    }
  }

  handleSearchEntry = value =>{
    this.setState({
      locationName: value
    })
  }

  handleLocationSubmit = e =>{
    e.preventDefault();
    this.pullLocation();
  }
  
pullLocation = () => {
    let locationUrl=`${process.env.REACT_APP_SERVER}/location?q=${this.state.locationName}`
    console.log(locationUrl);
    axios.get(locationUrl)
      .then(locationData => this.setState({locationData: locationData.data[0]}))
      .catch(err => this.setState({
        locationErr: true,
      }));
 }

  componentDidMount(){
    this.pullLocation();
  }

  render(){
    console.log(this.state.locationData)
    return (
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Landing/>
          </Route>
          <Route path="/Explore">
            <Explore 
              handleLocationSubmit={this.handleLocationSubmit}
              handleSearchEntry={this.handleSearchEntry}
            />
          </Route>
          <Route path="/Faves">
            <Faves 
            />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;

import React from "react";
import { Button } from "react-bootstrap";

class Explore extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      test: 'test'
    }
  }

  searchEntry = (e) => {
    this.props.handleSearchEntry(e.target.value);
  }

  findClicked = (e) => {
    this.props.handleLocationSubmit(e);
  }

  render(){
    return(
      <form onSubmit={this.findClicked} className="search-location">
        <input
          type="text"
          name="location"
          onInput={this.searchEntry}
          placeholder="Search... "
          />
          <Button type="submit">Find!</Button>
      </form>
    )
  }
}

export default Explore;
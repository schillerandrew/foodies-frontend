import React from "react";
import { Button, Carousel } from "react-bootstrap";

class Explore extends React.Component {
  constructor(props) {
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

  render() {
    return (
      <>
        <form onSubmit={this.findClicked} className="search-location">
          <input
            type="text"
            name="location"
            onInput={this.searchEntry}
            placeholder="Search... "
          />
          <Button type="submit">Find!</Button>
        </form>
        <Carousel
          style={{
            margin: '1em auto',
            width: '80vw',
          }}
        >

        {this.props.yelpData.map((data, id) => {
          return (
            <Carousel.Item key={id}>
              <img
                className="d-block w-100"
                src={data.image_url}
                alt={data.name}
              />
            </Carousel.Item>
          )
        })}
        </Carousel>
      </>
    )
  }
}

export default Explore;
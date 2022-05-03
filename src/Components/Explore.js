import React from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
import ReviewModal from "./ReviewModal";

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showUpdateModal: false,
      storeData: {}
    }
  }

  searchEntry = (e) => {
    this.props.handleSearchEntry(e.target.value);
  }

  findClicked = (e) => {
    this.props.handleLocationSubmit(e);
  }

  showModal = () => {
    this.setState({
      showUpdateModal: true
    })
  }

  hideModalHandler = () => {
    this.setState({
      showUpdateModal: false
    })
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
          <Button type="submit"><i className="fa-solid fa-magnifying-glass"></i> Find!</Button>
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
              <div className="mask1">
              <img
                className="d-block w-100 carouselImg"
                src={data.image_url}
                alt={data.name}
                />
                </div>
              <Carousel.Caption>
                <h3>{data.name}</h3>
                <p>{data.location.address1} {data.location.city},{data.location.state} {data.location.zip_code}</p>
                <Button><i className="fa-regular fa-star"></i></Button>
                <Button
                  onClick={() => this.setState({ showUpdateModal: true, storeData: data })}
                >Review <i className="fa-solid fa-pen"></i></Button>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
        </Carousel>
        <Modal
          show={this.state.showUpdateModal}
          onHide={this.hideModalHandler}
        >
          <Modal.Header closeButton>
            <img
            className="modalImg" 
              src={this.state.storeData.image_url} 
              alt={this.state.storeData.name}
            />
            {this.state.storeData.name}
          </Modal.Header>
          <ReviewModal
            title={this.state.storeData}
            hideModalHandler={this.hideModalHandler}
          />
        </Modal>
      </>
    )
  }
}

export default Explore;
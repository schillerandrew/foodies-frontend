import React from "react";
import { withAuth0 } from '@auth0/auth0-react';
import axios from "axios";
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

  storeFav = async ()  => {
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw;
    // console.log(jwt);
    const get = {
      method: 'get',
      baseURL: process.env.REACT_APP_SERVER,
      url: `/userData?email=${this.props.auth0.user.email}`,
      headers: { Authorization: `Bearer ${jwt}` }
    }
    let request = await axios(get);
    let user = {
      Email: this.props.auth0.user.email,
      YelpData: [...request.data[0].YelpData, this.state.storeData] || request.data[0].YelpData,
      Reviews: request.data[0].Reviews || []
    }
    const put = {
      method: 'PUT',
      baseURL: process.env.REACT_APP_SERVER,
      url: `/userData/${request.data[0]._id}`,
      headers: { Authorization: `Bearer ${jwt}` },
      data: user
    }
    await axios(put);
  }

  render() {
    return (
      <>
      <div className="locationSearch">
          <h2>{this.props.locationName}</h2>
        <form onSubmit={this.findClicked} className="search-location">
          <input
            type="text"
            name="location"
            onInput={this.searchEntry}
            placeholder="Search... "
            />
          <Button type="submit"><i className="fa-solid fa-magnifying-glass"></i> Find!</Button>
        </form>
            </div>
        <Carousel
          style={{
            margin: '1em auto',
            width: '80vw',
            backgroundColor: 'black',
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
                <Button onClick={() => {this.setState({storeData: data}); this.storeFav();}}><i className="fa-regular fa-star"></i></Button>
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
            <h2>{this.state.storeData.name}</h2>
          </Modal.Header>
          <ReviewModal
            title={this.state.storeData}
            hideModalHandler={this.hideModalHandler}
            userFaves={this.props.userFaves}
            userReviews={this.props.userReviews}
          />
        </Modal>
      </>
    )
  }
}

export default withAuth0(Explore);
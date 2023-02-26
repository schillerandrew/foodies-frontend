import React from "react";
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Faves.css";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Faves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      showUpdate: false,
      showPhoto: false,
      Faves: [],
      Reviews: [],
      notLoaded: true,
      storeData: {},
      reviewData: {},
      pageUpdate: true
    }
  }

  getFavesAndReviews = async () => {
    try {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: `/userData?email=${this.props.auth0.user.email}`,
        headers: { Authorization: `Bearer ${jwt}` }
      }

      let results = await axios(config);
      this.setState({
        Faves: results.data[0].YelpData,
        Reviews: results.data[0].Reviews,
        notLoaded: false
      })
      // this.renderPage();
    }
    catch (error) {
      console.log('we have an error:')
    }
  }

  handleFaveDelete = async () => {
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw;
    ////// GET
    const getConfig = {
      method: 'get',
      baseURL: process.env.REACT_APP_SERVER,
      url: `/userData?email=${this.props.auth0.user.email}`,
      headers: { Authorization: `Bearer ${jwt}` }
    }
    let getRequest = await axios(getConfig);
    let newArray = this.state.Faves.filter(restaurant => {
      return restaurant.name !== this.state.storeData.name;
    })
    ////// PUT
    let user = {
      Email: this.props.auth0.user.email,
      YelpData: newArray || [],
      Reviews: this.state.Reviews || []
    }
    const putConfig = {
      method: 'put',
      baseURL: process.env.REACT_APP_SERVER,
      url: `/userData/${getRequest.data[0]._id}`,
      headers: { Authorization: `Bearer ${jwt}` },
      data: user
    }
    await axios(putConfig);
    this.setState({ Faves: newArray });
  }

  handleReviewDelete = async () => {
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw;
    ////// GET
    const getConfig = {
      method: 'get',
      baseURL: process.env.REACT_APP_SERVER,
      url: `/userData?email=${this.props.auth0.user.email}`,
      headers: { Authorization: `Bearer ${jwt}` }
    }
    let getRequest = await axios(getConfig);
    let newArray = this.state.Reviews.filter(review => {
      return review.description !== this.state.reviewData.description;
    })
    ////// PUT
    let user = {
      Email: this.props.auth0.user.email,
      YelpData: this.state.Faves || [],
      Reviews: newArray || []
    }
    const putConfig = {
      method: 'put',
      baseURL: process.env.REACT_APP_SERVER,
      url: `/userData/${getRequest.data[0]._id}`,
      headers: { Authorization: `Bearer ${jwt}` },
      data: user
    }
    await axios(putConfig);
    this.setState({ Reviews: newArray });
  }

  // hideDeleteModalHandler = () => {
  //   this.setState({
  //     showDelete: false
  //   });
  // }

  // showDeleteModalHandler = () => {
  //   this.setState({
  //     showDelete: true,
  //   });
  // }

  render() {
    return (
      <div className="favesraves">
        <div className="restaurants">
        <h2>📍 Faves</h2>
          {this.state.Faves.length ?
            this.state.Faves.map((data, id) => {
              return (
                <>
                  <Container className="container">
                    <Card className="restaurantCard">
                      <Card.Header className="restaurantHeader">
                        <Row>
                          <Col>
                            {/* restaurant PHOTO */}
                            <Card.Img
                              variant="left"
                              src={data.image_url}
                              className="restPhoto"
                            />
                          </Col>
                          <Col className="restaurantCol">
                            {/* restaurant NAME */}
                            <Card.Title
                              className="restName">{data.name}</Card.Title>

                            {/* restaurant ADDRESS */}
                            <Card.Title className="restAddy">📍 {data.location.display_address[0]}
                            </Card.Title>

                            {/* this button shares*/}
                            {/* <Button
                            variant="info"
                            className="share"
                          >
                            <i className="fa fa-share"></i>
                          </Button> */}

                            {/* this button deletes a restaurant */}
                            <Button
                              onClick={() => { this.setState({ storeData: data }); this.handleFaveDelete(); }}
                              className="deleteRest"
                            >
                              <i className="fa fa-trash-o"></i>
                            </Button>
                          </Col>
                        </Row>
                      </Card.Header>
                    </Card>
                  </Container>
                </>
              )
            })
            :
            <></>
          }
        </div>

        {/* BUTTON */}
        <div className="buttonDiv">
          <Button
            style={{
              height: "100px",
              width: "200px"
            }}
            onClick={this.getFavesAndReviews}
            className="button"
          >Show My Faves &#38; Raves!</Button>
        </div>

        {/* RAVES */}
        <div className="reviews">
          <h2>💬 Raves</h2>
          {this.state.Reviews.length ?
            this.state.Reviews.map((data, id) => {
              return (
                <>
                  <Container className="container">
                    <Card className="reviewCard">
                      <Card.Body>
                        <Row>
                          <Card.Title ></Card.Title>
                        </Row>

                        {/* restaurant review */}
                        <Row>
                          <Col className="reviewCol">
                            <Card.Title className="reviewTitle">{data.storeName}</Card.Title>
                            <Card.Text className="reviewText">{data.description}</Card.Text>
                          </Col>
                          <Col>

                            {/* this button updates a review
                          <Button
                            variant="primary"
                            onClick={this.showUpdateModalHandler}
                          >
                            <i className="fa fa-pencil"></i>
                          </Button> */}

                            {/* this button deletes a review */}
                            <Button
                              variant="primary"
                              onClick={() => { this.setState({ reviewData: data }); this.handleReviewDelete(); }}
                            >
                              <i className="fa fa-trash-o"></i>
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Container>
                </>
              )
            })
            :
            <></>
          }
        </div>
        {/* this modal confirms a delete */}
        <Modal
          show={this.state.showDelete}
          onHide={this.hideDeleteModalHandler}
        >
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              variant="primary"
              onClick={this.hideDeleteModalHandler}
            > Yep!</Button>
            <Button
              variant="danger"
              onClick={this.hideDeleteModalHandler}
            > Nope!</Button>
          </Modal.Body>
        </Modal>

        {/* this modal updates a review */}
        <Modal
          show={this.state.showUpdate}
          onHide={this.hideUpdateModalHandler}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update your review
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="formUpdate" controlId="formUpdateReview">
                <Form.Label></Form.Label>
                <Form.Control type="text" placeholder="REVIEW TEXT GOES HERE" />
              </Form.Group>
              <Modal.Footer>
                <Button variant="primary">
                  Update
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>

        {/* this modal shows an enlarged photo*/}
        <Modal
          show={this.state.showPhoto}
          onHide={this.hidePhotoModalHandler}
        >
          <Modal.Body>
            <Card>
              <Card.Img
                variant="top"
                src="http://placehold.jp/500x500.png"
              // className='img-fluid'
              />
            </Card>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default withAuth0(Faves);
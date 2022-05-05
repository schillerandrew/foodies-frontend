import React from "react";
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Faves.css";


import Accordion from 'react-bootstrap/Accordion';
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
      notLoaded: true
    }
  }

  getFavesAndReviews = async () => {
    try {
      // console.log(this.props.auth0);
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      // console.log('jwt', jwt);
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

  // hideUpdateModalHandler = () => {
  //   this.setState({
  //     showUpdate: false,
  //   });
  // }

  // showUpdateModalHandler = () => {
  //   this.setState({
  //     showUpdate: true,
  //   });
  // }

  // hidePhotoModalHandler = () => {
  //   this.setState({
  //     showPhoto: false,
  //   });
  // }

  // showPhotoModalHandler = () => {
  //   this.setState({
  //     showPhoto: true,
  //   });
  // }

  render() {
    console.log(this.state.Reviews);
    return (
      <>
        <Button
        onClick={this.getFavesAndReviews}
        className="button"
        >Show My Faves!</Button>
        {this.state.Faves.length ?
          this.state.Faves.map((data, id) => {
            console.log(data);
            return (
              <>
                <Container className="container">
                  <Card style={{ width: '40rem' }}>
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
                        <Col>
                          {/* restaurant NAME */}
                          <Card.Title
                            className="restName">{data.name}</Card.Title>

                          {/* restaurant ADDRESS */}
                          <Card.Text className="restAddy">
                            <i className="fa fa-map-marker"></i> {data.location.display_address[0]}
                          </Card.Text>

                          {/* this button shares*/}
                          {/* <Button
                            variant="info"
                            className="share"
                          >
                            <i className="fa fa-share"></i>
                          </Button> */}

                          {/* this button deletes a restaurant */}
                          <Button
                            onClick={this.showDeleteModalHandler}
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
        {this.state.Reviews.length ?
          this.state.Reviews.map((data, id) => {
            return (
              <>
                <Container className="container">
                  <Card style={{ width: '40rem' }}>
                    <Card.Body>
                      <Row>
                        <Card.Title>💬 Reviews</Card.Title>
                      </Row>

                      {/* restaurant review */}
                      <Row>
                        <Col>
                          <Card.Title>{data.storeName}</Card.Title>
                          <Card.Text>{data.description}</Card.Text>
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
                            onClick={this.showDeleteModalHandler}
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
      </>
    )
  }
}

export default withAuth0(Faves);
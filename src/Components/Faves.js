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
      FavesReviews: []
    }
  }

  getFavesAndReviews = async () => {
    try {
      console.log("you are here 1");
      console.log(this.props.auth0);
      console.log("you are here 2");
        const res = await this.props.auth0.getIdTokenClaims();
        
        const jwt = res.__raw;
        // console.log('jwt=' + jwt);
        const config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: `/userData?email=${this.props.auth0.user.email}`,
          headers: { Authorization: `Bearer ${jwt}` }
        }
        
        let results = await axios(config);
        console.log("you are here 3");
        this.setState({
          FavesReviews: results.data
        })
        
        console.log('crap goes here' + results.data);
    }
    catch (error) {
      console.log('we have an error:')
    }
  }

  // getFavesAndReviews = async () => {
  //   try {
  //     let axiosResults = await axios.get(`${process.env.REACT_APP_SERVER}/userData`);
  //     this.setState({
  //       FavesReviews: axiosResults.data
  //     })
  //     console.log(this.state.FavesReviews);
  //   }
  //   catch (error) {
  //     console.log('Error: ', error.response);
  //   }
  // }

  componentDidMount() {
    this.getFavesAndReviews();
  }


  hideDeleteModalHandler = () => {
    this.setState({
      showDelete: false
    });
  }

  showDeleteModalHandler = () => {
    this.setState({
      showDelete: true,
    });
  }

  hideUpdateModalHandler = () => {
    this.setState({
      showUpdate: false,
    });
  }

  showUpdateModalHandler = () => {
    this.setState({
      showUpdate: true,
    });
  }

  hidePhotoModalHandler = () => {
    this.setState({
      showPhoto: false,
    });
  }

  showPhotoModalHandler = () => {
    this.setState({
      showPhoto: true,
    });
  }

  render() {
    return (
      <>
        {/* this modal confirms a delete */}
        <Modal
          className="img-responsive"
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
          className="img-responsive"
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
                <Form.Label>RESTAURANT NAME/OLD REVIEW TEXT?</Form.Label>
                <Form.Control type="text" placeholder="REVIEW TEXT GOES HERE" />
              </Form.Group>
              <Button variant="primary">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* this modal shows an enlarged photo and gives option to delete*/}
        <Modal
          className="img-responsive"
          show={this.state.showPhoto}
          onHide={this.hidePhotoModalHandler}
        >
          <Modal.Header closeButton>
            {/* this button deletes a photo */}
            <Button
              variant="danger"
              onClick={this.showDeleteModalHandler}
            >
              <i className="fa fa-trash-o"></i></Button>
          </Modal.Header>
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
        <Accordion defaultActiveKey="0">
          {/* {this.props.userFaves.map(fave => { */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>Foodie</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>

          <Accordion defaultActiveKey="0"></Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Foodie 1</Accordion.Header>
            <Accordion.Body>
              <Card style={{ width: '40rem' }}>

                <Container>
                  <Card.Header className="restaurantHeader">
                    <Row>
                      <Col>
                        {/* restaurant photo */}
                        <Card.Img
                          variant="left"
                          src="http://placehold.jp/100x100.png"
                          className="restPhoto"
                        />
                      </Col>
                      <Col>
                        {/* restaurant name */}
                        <Card.Title
                          className="restName">Taco Bell</Card.Title>

                        {/* restaurant address */}
                        <Card.Text className="restAddy">
                          <i className="fa fa-map-marker"></i> restaurant address
                        </Card.Text>
                      </Col>
                      <Col>
                        {/* this button shares*/}
                        <Button
                          variant="info"
                          className="share"
                        >
                          <i className="fa fa-share"></i>
                        </Button>

                        {/* this button deletes a restaurant */}
                        <Button
                          variant="dark"
                          onClick={this.showDeleteModalHandler}
                          className="deleteRest"
                        >
                          <i className="fa fa-trash-o"></i>
                        </Button>
                      </Col>
                    </Row>
                    {/* restuarant categories??? */}
                    {/* <Card.Text className="restCats">
                      <i className="fa fa-cutlery"></i> restaurant categories
                    </Card.Text> */}
                  </Card.Header>
                </Container>

                <Container>
                  <Card.Body>
                    <Row>
                      <Card.Title>💬 Reviews</Card.Title>
                    </Row>
                    <Row>
                      <Col>
                        <Card>
                          <Card.Text>
                            REVIEW GOES HERE
                          </Card.Text>
                        </Card>
                      </Col>
                      <Col>
                        {/* this button updates a review */}
                        <Button
                          variant="primary"
                          onClick={this.showUpdateModalHandler}
                        >
                          <i className="fa fa-pencil"></i>
                        </Button>
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
                </Container>

                <Container>
                  <Card.Footer>

                    <Row>
                      <Card.Title><i className="fa fa-camera"></i>📷 Photos</Card.Title>
                    </Row>

                    <Row>
                      <Col>
                        {/* photo slot */}
                        <Card.Img
                          variant="left"
                          onClick={this.showPhotoModalHandler}
                          src="http://placehold.jp/100x100.png"
                        />
                      </Col>
                      {/* photo slot */}
                      <Col>
                        <Card.Img
                          variant="left"
                          onClick={this.showPhotoModalHandler}
                          src="http://placehold.jp/100x100.png"
                        />
                      </Col>
                      <Col>
                        {/* photo slot */}
                        <Card.Img
                          variant="left"
                          onClick={this.showPhotoModalHandler}
                          src="http://placehold.jp/100x100.png"
                        />
                      </Col>
                      <Col>
                        {/* photo slot */}
                        <Card.Img
                          variant="left"
                          onClick={this.showPhotoModalHandler}
                          src="http://placehold.jp/100x100.png"
                        />
                      </Col>
                    </Row>

                  </Card.Footer>
                </Container>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    )
  }
}

export default withAuth0(Faves);
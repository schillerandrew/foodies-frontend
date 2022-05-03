import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

class Faves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      showUpdate: false,
      showPhoto: false
    }
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
        {/* this is the modal to confirm delete */}
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

        {/* this is the modal to update a review */}
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
              <Form.Group className="mb-3" controlId="formUpdateReview">
                <Form.Label>RESTAURANT NAME/OLD REVIEW TEXT?</Form.Label>
                <Form.Control type="text" placeholder="REVIEW TEXT GOES HERE" />
              </Form.Group>
              <Button variant="primary">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* this is the modal to show an enlarged photo */}
        <Modal
          className="img-responsive"
          show={this.state.showPhoto}
          onHide={this.hidePhotoModalHandler}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Card.Img
                  variant="top"
                  src="http://placehold.jp/500x500.png"
                // className='img-fluid'
                />
                </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>
        <Accordion defaultActiveKey="0">

          {/* update to appropriate props name */}
          {/* {this.props.location.map((location, idx) => */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>User 1</Accordion.Header>
            <Accordion.Body>
              <Card style={{ width: '18rem' }}>

                <Card.Body>
                  <Card.Img
                    variant="top"
                    src="http://placehold.jp/500x500.png"
                  // className='img-fluid'
                  />
                  <Card.Title>Taco Bell</Card.Title>
                  {/* button = delete restaurant */}
                  <Button
                    variant="dark"
                    onClick={this.showDeleteModalHandler}
                  >
                    <i className="fa fa-trash-o"> Spot</i>
                  </Button>
                  {/* button = share*/}
                  <Button
                    variant="info"
                  >
                    <i className="fa fa-share"> Share</i>
                  </Button>
                  <Card.Text>
                    <i className="fa fa-map-marker"></i> restaurant address
                  </Card.Text>
                  <Card.Text>
                    <i className="fa fa-cutlery"></i> restaurant categories
                  </Card.Text>
                  <Card.Title>💬 Thoughts</Card.Title>
                  {/* button = update review */}
                  <Button
                    variant="primary"
                    onClick={this.showUpdateModalHandler}
                  >
                    <i className="fa fa-pencil"> Thoughts</i>
                  </Button>
                  {/* button = delete review */}
                  <Button
                    variant="primary"
                    onClick={this.showDeleteModalHandler}
                  >
                    <i className="fa fa-trash-o"> Thoughts</i>
                  </Button>
                  <Card.Title><i className="fa fa-camera"></i> Shots</Card.Title>
                  {/* photo slot */}
                  <Card.Img
                    variant="left"
                    onClick={this.showPhotoModalHandler}
                    src="http://placehold.jp/100x100.png"
                  />
                  {/* photo slot */}
                  <Card.Img
                    variant="left"
                    onClick={this.showPhotoModalHandler}
                    src="http://placehold.jp/100x100.png"
                  />
                  {/* photo slot */}
                  <Card.Img
                    variant="left"
                    onClick={this.showPhotoModalHandler}
                    src="http://placehold.jp/100x100.png"
                  />
                  {/* photo slot */}
                  <Card.Img
                    variant="left"
                    onClick={this.showPhotoModalHandler}
                    src="http://placehold.jp/100x100.png"
                  />
                  {/* button = delete photo */}
                  <Button
                    variant="danger"
                    onClick={this.showDeleteModalHandler}
                  >
                    <i className="fa fa-trash-o"> Shots</i></Button>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    )
  }
}

export default Faves;
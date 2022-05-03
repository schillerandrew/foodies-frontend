import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Faves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  hideTheDeleteModal = () => {
    this.setState({
      showModal: false
    });
  }

  showTheDeleteModal = () => {
    this.setState({
      showModal: true,
    });
  }

  render() {
    return (
      <>
        <Modal
          className="img-responsive"
          show={this.state.showModal}
          onHide={this.hideTheDeleteModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              variant="primary"
              onClick={this.hideTheDeleteModal}
            > Yep!</Button>
            <Button
              variant="danger"
              onClick={this.hideTheDeleteModal}
            > Yep!</Button>
          </Modal.Body>
        </Modal>
        <Accordion defaultActiveKey="0">

          {/* update to appropriate props name */}
          {/* {this.props.location.map((location, idx) => */}
          (
          <Accordion.Item eventKey="0">
            <Accordion.Header>Fave 1</Accordion.Header>
            <Accordion.Body>
              <Card style={{ width: '18rem' }}>

                <Card.Body>
                  <Card.Img
                    variant="top"
                    src="http://placehold.jp/500x500.png"
                  // className='img-fluid'
                  />
                  <Card.Title>Taco Bell</Card.Title>
                  {/* delete restaurant button */}
                  <Button
                    variant="dark"
                    onClick={this.showTheDeleteModal}
                  >
                    🗑️ this restaurant</Button>
                  {/* share button */}
                  <Button variant="info">
                    Share</Button>
                  <Card.Text>
                    📍 restaurant address
                  </Card.Text>
                  <Card.Text>
                    🍽️ restaurant categories
                  </Card.Text>
                  <Card.Title>💬 Raves</Card.Title>
                  <Card.Text>RAVE HERE</Card.Text>
                  {/* delete review button */}
                  <Button
                    variant="primary"
                    onClick={this.showTheDeleteModal}
                  >
                    <i className="fa-regular fa-trash">🗑️ this rave</i>
                  </Button>
                  <Card.Title>📷 Saves</Card.Title>
                  {/* photo slot */}
                  <Card.Img
                    variant="left"
                    src="http://placehold.jp/100x100.png"
                  />
                  {/* photo slot */}
                  <Card.Img
                    variant="left"
                    src="http://placehold.jp/100x100.png"
                  />
                  {/* photo slot */}
                  <Card.Img
                    variant="left"
                    src="http://placehold.jp/100x100.png"
                  />
                  {/* photo slot */}
                  <Card.Img
                    variant="left"
                    src="http://placehold.jp/100x100.png"
                  />
                  {/* delete photo button */}
                  <Button
                    variant="danger"
                    onClick={this.showTheDeleteModal}
                  >🗑️ this photo</Button>
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
import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Faves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <Accordion defaultActiveKey="0">

          {/* update to appropriate props name */}
          {/* {this.props.location.map((location, idx) => */}
          (
          <Accordion.Item eventKey="0">
            <Accordion.Header>Taco Bell</Accordion.Header>
            <Accordion.Body>
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  variant="top"
                  src="http://placehold.jp/150x150.png"
                />
                <Card.Body>
                  <Card.Title>Taco Bell</Card.Title>
                  <Card.Text>
                    tacos tacos tacos tacos tacos tacos tacos tacos tacos tacos tacos tacos
                  </Card.Text>
                  <Card.Text>
                  📍 address
                  </Card.Text>
                  <Card.Text>
                  🍽️ restaurant categories
                  </Card.Text>
                  <Card.Text>
                  💬 Your Review
                  </Card.Text>
                  <Button variant="primary">Delete review</Button>
                  <Button variant="danger">Delete photo</Button>
                  <Button variant="dark">Delete Restaurant?</Button>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
          ))}
        </Accordion>
      </>
    )
  }
}

export default Faves;
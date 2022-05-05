import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

class DeleteModal extends React.Component {



  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const res = await this.props.auth0.getIdTokenClaims();
  //   const jwt = res.__raw;
  //   const config = {
  //     method: 'get',
  //     baseURL: process.env.REACT_APP_SERVER,
  //     url: `/userData?email=${this.props.auth0.user.email}`,
  //     headers: { Authorization: `Bearer ${jwt}` }
  //   }
  //   let request = await axios(config);
  // }


  render() {
    return (
      <Modal
        show={this.props.showDelete}
        onHide={this.props.hideDeleteModalHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className='mb-3' controlId='delete'>
              <Form.Label>delete</Form.Label>
              <Form.Control type='text' placeholder='Enter Review' />
            </Form.Group>
            <Button
              onClick={this.props.hideDeleteModalHandler}
              type='submit'
            >Yes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default DeleteModal;
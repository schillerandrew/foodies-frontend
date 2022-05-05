import { withAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import React from "react";
import { Form, Button, FormLabel } from "react-bootstrap";

class ReviewModal extends React.Component {



  handlePut = async (review, jwt, id) => {
    try {

      const put = {
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER,
        url: `/userData/${id}`,
        headers: { Authorization: `Bearer ${jwt}` },
        data: review
      }
      await axios(put);
    } catch (err) {
      console.log('we have an err');
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw;
    // console.log(jwt);
    const config = {
      method: 'get',
      baseURL: process.env.REACT_APP_SERVER,
      url: `/userData?email=${this.props.auth0.user.email}`,
      headers: { Authorization: `Bearer ${jwt}` }
    }
    let request = await axios(config);
    let reviewData = {
      storeName: this.props.title.name,
      description: e.target.review.value,
      // img: e.target.image.value
    }
    let user = {
      Email: this.props.auth0.user.email,
      YelpData: request.data[0].YelpData || [],
      Reviews: [...request.data[0].Reviews, reviewData] || this.props.userReviews
    }
    this.handlePut(user, jwt, request.data[0]._id);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className='mb-3' controlId='review'>
          <Form.Label>Review</Form.Label>
          <Form.Control as='textarea' rows="5" placeholder='Description...' />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="image">
          <FormLabel>Upload</FormLabel>
          <Form.Control type='file' />
        </Form.Group> */}
        <div className='postBtn'>
          <Button className="modalBtn" onClick={this.props.hideModalHandler} type='submit'>Post Review!</Button>
        </div>
      </Form>
    )
  }
}

export default withAuth0(ReviewModal);
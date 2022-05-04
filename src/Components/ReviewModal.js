import axios from "axios";
import React from "react";
import { Form, Button, FormLabel } from "react-bootstrap";

class ReviewModal extends React.Component{

  handlePost = async review => {
    try{
      let url = `${process.env.REACT_APP_SERVER}/userData`
      await axios.post(url, review)
    } catch (err){
      console.log('we have an err');
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let review = {
      YelpData: this.props.storeData,
      Review: e.target.review.value
    }
    this.handlePost(review);
  }

  render(){
    return(
      <Form onSubmit={this.handleSubmit}>
      <Form.Group className='mb-3' controlId='review'>
        <Form.Label>review</Form.Label>
        <Form.Control type='text' placeholder='Enter Review'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
        <FormLabel>Upload</FormLabel>
        <Form.Control type='file'/>
      </Form.Group>
      <Button className="modalBtn" onClick={this.props.hideModalHandler} type='submit'>Post Review!</Button>
    </Form>
    )
  }
}

export default ReviewModal;
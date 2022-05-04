import React from "react";
import Card from 'react-bootstrap/Card';
import Andrew from "../Images/Andrew.jpg"
import Roger from "../Images/Roger.jpeg"
import Mike from "../Images/Mike.jpg"
import Button from 'react-bootstrap/Button';

class AboutUs extends React.Component {
  render() {
    return (
    <div className="profiles" >
      <Card style={{ width: '32rem' }}>
        <Card.Body>
          <Card.Img className="selfies" src={Andrew} alt="sefie"/>
          <Card.Title>Andrew Schiller</Card.Title>
          <Card.Text>I`ve worked for more than a decade in technical support roles, and now I`m developing software because I want to be more proactive and less reactive. Rather than just talking to users about what`s broken, I want to put my thinking cap on and build interfaces and tools that make users go “wow”. I switched to software development because I went back to the drawing board and decided that coding is a much better fit for who I am. My ideal development job would probably be for a company or product that I`m passionate about. But regardless of where or what I`m coding, my background in journalism and tech support means that I`m a bit of a jack-of-all-trades, which I think helps me excel as a full-stack developer.
          </Card.Text>
          <Button type="button" class="btn btn-secondary"> <a href= 'https://www.linkedin.com/in/schiller-andrew/'> LinkedIn</a></Button>
          <Button type="button" class="btn btn-secondary"> <a href= 'https://github.com/schillerandrew'> GitHub</a></Button>
  
        </Card.Body>
      </Card>
      <Card style={{ width: '32rem' }}>
      <Card.Body>
        <Card.Img className="selfies" src={Roger} alt="sefie"/>
        <Card.Title>Roger Reyes</Card.Title>
        <Card.Text>Hi, my name is Roger Reyes. I am currently building my career as a software developer. Prior to this I was in the Army for 7 years as a satellite communications technician. In that field I worked on large scale operations that spanned the pacific region in Japan. Adaptability was the key trait in succeeding in that field as systems were constantly changing and evolving. This has led me to be much more flexible  in working in unexpected situations, which I am now using to propel myself into software development. I`ve always had a passion for learning the concepts of different languages, and it`s greatly helped my growth in learning both Java and React. I am currently looking to work for a tech company that can provide me with the tools to build myself and allow me to push them closer to accomplishing their mission.
        </Card.Text>
        <Button type="button" class="btn btn-secondary"> <a href= 'https://www.linkedin.com/in/rogermreyes/'> LinkedIn</a></Button>
        <Button type="button" class="btn btn-secondary"> <a href= 'https://github.com/RogerMReyes'> GitHub</a></Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '32rem' }}>
      <Card.Body>
        <Card.Img className="selfies" src={Mike} alt="sefie"/>
        <Card.Title>Mike Brunette</Card.Title>
        <Card.Text>Hello, I am Michael Brunette. I am excited to be here with you today. Currently, I am a Real Estate Agent and Poker player in Las Vegas, Nevada. I am an Air Force Veteran who was able to transition my knowledge into many different fields. Now I am transitioning all my past experiences into Software Development. The discipline, attention to detail, and strive for learning are all habits I have been able to transfer into the software field. I am most interested in developing applications that help us with productivity. Time for humans is our most valuable commodity. Being able to give more "time" to all, is what I strive for.
        </Card.Text>
        <Button type="button" class="btn btn-secondary"> <a href= 'https://www.linkedin.com/in/michael-brunette-0800b5233/'> LinkedIn</a></Button>
        <Button type="button" class="btn btn-secondary"> <a href= 'https://github.com/mcbrunette33'> GitHub</a></Button>
      </Card.Body>
    </Card>
    </div>
    )
  }
}
export default AboutUs;

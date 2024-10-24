
import img from "../assets/img/arpit.jpg"
import img2 from "../assets/img/sachin.jpg"
import img3 from "../assets/img/hod.jpg"
// import img4 from "../assets/img/arpit.jpg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import React from 'react';
// import React, { useState, useEffect } from 'react';
// import { Carousel, Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

import colorSharp from "../assets/img/color-sharp.png"

export const Skills = () => {
  
  // const [index, setIndex] = useState(0);

  // // Array of images to slide
  // const images = [
  //   img,img2,img3,img4
  // ];

  // // Function to handle the sliding effect
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex(prevIndex => (prevIndex + 1) % images.length);
  //   }, 3000); // Change slide every 3 seconds

  //   return () => clearInterval(interval); // Clean up on unmount
  // }, [images.length]);

  // // Function to calculate the three images to show
  // const getDisplayedImages = () => {
  //   const displayedImages = [];
  //   for (let i = 0; i < 3; i++) {
  //     displayedImages.push(images[(index + i) % images.length]);
  //   }
  //   return displayedImages;
  // };



  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Faculty Coordinators</h2>
                        <p>Meet the supportive faculty of DoIT Coding Club<br></br> </p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={img3} alt="Image" />
                                <h5>Dr. ASMITA A MOGHE</h5>
                                <p>Head of Department</p>
                            </div>
                            <div className="item">
                                <img src={img} alt="Image" />
                                <h5>Prof. ARPIT NAMDEV </h5>
                                <p>Head of Coding Club</p>
                            </div>
                            <div className="item">
                                <img src={img2} alt="Image" />
                                <h5>Dr. SACHIN GOYAL</h5>
                               <p>Head of Coding Club</p>
                            </div>
                        </Carousel>

{/* <Container fluid>
      <Carousel controls={false} indicators={false} interval={null} pause={false}>
        <Carousel.Item>
          <Row>
            {getDisplayedImages().map((image, idx) => (
              <Col key={idx}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Slide ${idx}`}
                />
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      </Carousel>
    </Container> */}
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}

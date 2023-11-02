import React, { useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { useHistory } from "react-router-dom";

import Layout from "../../components/global/Layout";
import NavBar from "../../components/global/NavBar";
import IMGS from "../../themes/imgs";
import ICONS from "../../themes/icons";
import Maps from "./Maps";
import { photos } from "./photos";

import { MdPlayCircleFilled } from "react-icons/md";

// const photos = [
//   {
//     src: 'http://example.com/example/img1.jpg',
//     width: 4,
//     height: 3
//   },
//   {
//     src: 'http://example.com/example/img2.jpg',
//     width: 1,
//     height: 1
//   }
// ];

function HomePage() {
  // const classes = useStyles();
  const history = useHistory();

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };


  function clickMe(event, userType) {

    history.push({
      pathname: '/sign-up',
      state: { userType }
    })
  }


  return (
    <>
      <Layout sectionId="homeSection">
        <div id="banner-parent">
          <NavBar />
          <div className="banner-text">
            <h1> <span className='welcome'>Welcome</span> to <span className='dramatini'>DramaTini</span></h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vendus fugiat nostrum reiciendis non eius.</p>
          </div>

          <Container>
            <div className="user-types">
              <Row>
              <Col onClick={(e) => { clickMe(e, 'business') }}>
                  <div className="cat-box business-box">
                    <img src={IMGS.business_card} alt="Logo" />
                    <div className="content-box">
                      <h3>Businesses</h3>
                      <p>Support Theaters,sel Martinis </p>
                      {/* <Link to="/" className="nav-link">Read More</Link> */}
                    </div>
                  </div>
                </Col>
                <Col onClick={(e) => { clickMe(e, 'theater') }}>
                  <div className="cat-box theater-box">
                    <img src={IMGS.theater_card} alt="Logo" />
                    <div className="content-box">
                      <h3>Theaters</h3>
                      <p>Live Theaters,sell more tickets </p>
                      {/* <Link to="/inspiration" className="nav-link">Read More</Link> */}
                    </div>
                  </div>
                </Col>
                <Col onClick={(e) => { clickMe(e, 'tini') }}>
                  <div className="cat-box tini-box">
                    <img src={IMGS.tinis_card} alt="Logo" />
                    <div className="content-box">
                      <h3>Tini</h3>
                      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                      {/* <Link to="/inspiration" className="nav-link">Read More</Link> */}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>


        </div>





        <div id="our-services-parent">
          <Container>
            <div className="service-container">
              <div className="header-text-content">
                <h1>Our Services</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
              </div>

              <div className="service-list-parent">
                <Row>
                  <Col md={4}>
                    <div className="service-box">
                      <img src={ICONS.music_icon} alt="" />
                      <h4>Musicals</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, molestias.</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="service-box">
                      <img src={ICONS.theater_icon} alt="" />
                      <h4>Dramas</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, molestias.</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="service-box">
                      <img src={ICONS.comedy_icon} alt="" />
                      <h4>Comedies</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, molestias.</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="service-box">
                      <img src={ICONS.concert_icon} alt="" />
                      <h4>Concerts</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, molestias.</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="service-box">
                      <img src={ICONS.theater_icon} alt="" />
                      <h4>Theater</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, molestias.</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="service-box">
                      <img src={ICONS.business_icon} alt="" />
                      <h4>Business</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, molestias.</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        </div>

        <div id="video-section-parent">
          <div className="header-text-content">
            <h1>Watch Our  Videos</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />Dolor risus pulvinar eu quam.</p>
          </div>
          <Button variant="contained" disableElevation className='watch-video' startIcon={<MdPlayCircleFilled />}> Watch Now</Button>
        </div>


        <div id="our-gallery">
          <Container>
            <div className="header-text-content">
              <h1>Our Gallery</h1>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit adipisci qui sed quis, nobis rerum.</p>
            </div>
            <Gallery photos={photos} onClick={openLightbox} />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={photos.map(x => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </Container>

        </div>

        <div id="google-map-section">
          <div className="header-text-content">
            <h1>Our Partners</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit adipisci qui sed quis, nobis rerum.</p>
          </div>
          <Maps />
        </div>
      </Layout>
    </>
  );
}

export default HomePage;



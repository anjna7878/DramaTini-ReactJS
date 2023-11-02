import React, { useState } from 'react';
import { Nav, Navbar } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { ALink } from "../../elements";
import LOGOS from "../../../themes/logo";
import UserTab from "./UserTab";




function LoginSignUpTab() {
  const history = useHistory();
  const currentUser = useSelector(state => state.user);

  const [open, setOpen] = useState(false);
  function handleClose() { setOpen(false); }
  function handleClickOpen() { setOpen(true); }

  function clickMe(event, userType) {
    setOpen(false);
    history.push({
      pathname: '/sign-up',
      state: { userType }
    })
  }

  console.log('USER::', currentUser);

  return (
    <>
      {!currentUser.isAuthenticated ? (
        <Nav id="login-sign_up">
          <ul className="navbar-nav ml-auto">
            {/* <ALink to="/sign-up" className="sign-up" label="Create account" /> */}
            <Button variant="contained" disableElevation onClick={handleClickOpen}>Create account</Button>
            <ALink to="/sign-in" className="sign-in" label="Tini member" />
          </ul>
        </Nav>
      ) : (
        <UserTab data={currentUser} />
      )}


      <Dialog open={open} onClose={handleClose} id='sign-up-chooser-pop-up' fullWidth={true} maxWidth='md' aria-labelledby="form-dialog-title">
        <DialogContent className='body-content'>
          <h2>Choose a <span>Tini</span> Membership and “Sign Up” your Account</h2>
          <Row>
            <Col md='4' onClick={(e) => { clickMe(e, 'business') }} >
              <div className='business box'>
                <h5>Businesses</h5>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, sit! Minus dicta magni debitis. Commodi!</p>
              </div>
            </Col>
            <Col md='4' onClick={(e) => { clickMe(e, 'theater') }}>
              <div className='theater box'>
                <h5>Theaters</h5>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, sit! Minus dicta magni debitis. Commodi!</p>
              </div>
            </Col>
            <Col md='4' onClick={(e) => { clickMe(e, 'tini') }} >
              <div className='tinis box'>
                <h5>Tinis</h5>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, sit! Minus dicta magni debitis. Commodi!</p>
              </div>
            </Col>
          </Row>
        </DialogContent>
      </Dialog>
    </>
  );
}



const SiteNavbar = () => {
  return (
    <>
      <Navbar
        expand="md"
        sticky="top"
        id="main-navbar"
      >
        <Navbar.Brand href="/">
          <img src={LOGOS.site_logo_with_bc} alt="Logo" className="app-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav nav-parent"
          className="justify-content-around"
        >
          <Nav id="nav-center-part" >
            <ul className="navbar-nav ml-auto">
              <ALink to="/" className="get-started" label="Get Started" />
              <ALink to="/search" className="search-theaters" label="Search Live Theaters" />
            </ul>
          </Nav>
          <LoginSignUpTab />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default withRouter(SiteNavbar);








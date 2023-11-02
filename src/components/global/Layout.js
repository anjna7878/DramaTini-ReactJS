import React from "react";
// import Header from "./Header";
// import NavBar from "./NavBar";
import Footer from "../global/Footer";
// import { Container } from "react-bootstrap";
import {NotificationContainer} from 'react-notifications';
// import AlertMessage from "./AlertMessage";

const Layout = ({ children, sectionId, AlertBody }) => (
  <> 
    {/* <Header /> */}
    {/* <NavBar /> */}
    {/* <AlertMessage /> */}
    {/* {AlertBody && <AlertMessage data={AlertBody} />} */}

    <section id={sectionId}>
      <main>{children}</main>
      <NotificationContainer/>
    </section>
    <Footer />
  </>
);

export default Layout;

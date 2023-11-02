import React from "react";
import Layout from "../../components/global/Layout";
import NavBar from "../../components/global/NavBar";


const NotFoundPage = ({ history }) => (
  <Layout sectionId="not-found-section">
    <NavBar />

    <div id="not-found-parent">
      <h1>Coming Soon</h1>
    </div>
  </Layout>
);

export default NotFoundPage;

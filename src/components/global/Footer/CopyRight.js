import React from "react";
import Container from "react-bootstrap/Container";
import {  Link } from "react-router-dom";
import {  List } from "semantic-ui-react";

function ListItem({ to, label }) {
  return (
    <List.Item>
      <Link to={to}>{label}</Link>
    </List.Item>
  );
}

function CopyRight() {
  return (
    <>
      <div className="copyright">
        <Container>
          <h4>Copyright &copy; 2021 Drama Tini</h4>
          <List horizontal>
            <ListItem to="/terms-of-use" label="Terms of Use &nbsp;|" />
            <ListItem to="/privacy-policy" label="Privacy Policy" />
          </List>
        </Container>
      </div>
    </>
  );
}

export default CopyRight;

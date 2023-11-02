import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { FaMapMarkerAlt } from "react-icons/fa";
import { red } from "@material-ui/core/colors";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 2rem 1rem;
`;

const useStyles = makeStyles(theme => ({}));

function LocationString(props) {
  const classes = useStyles();

  return (
    <div className="ad-location">
      <h6>
        <FaMapMarkerAlt /> 
        {" " + props.data.street.number +
          " " +
          props.data.street.name +
          " " +
          props.data.city +
          " " +
          props.data.state +
          " " +
          props.data.postcode +
          " "}
      </h6>
    </div>
  );
}

export default LocationString;

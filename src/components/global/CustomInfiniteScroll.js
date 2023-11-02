import React, { Children } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { FaMapMarkerAlt } from "react-icons/fa";
import { red } from "@material-ui/core/colors";
import InfiniteScroll from "react-infinite-scroller";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 2rem 1rem;
`;

const useStyles = makeStyles(theme => ({}));

function CustomInfiniteScroll({ children, ...props }) {
  const classes = useStyles();

  return (
    <>
      <InfiniteScroll
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        threshold={20}
        {...props}

      >
        {children}
      </InfiniteScroll>
    </>
  );
}

export default CustomInfiniteScroll;

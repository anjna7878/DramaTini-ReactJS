// import "rc-pagination/assets/index.css";
// import Pagination from "rc-pagination";
// import React from "react";

// const itemRender = (current, type, element) => {
//   if (type === "page") {
//     return <a href={`#${current}`}>{current}</a>;
//   }
//   return element;
// };

// const textItemRender = (current, type, element) => {
//   if (type === "prev") {
//     return "Prev";
//   }
//   if (type === "next") {
//     return "Next";
//   }
//   return element;
// };

// function CustomPagination() {
//   return (
//     <>
//       <Pagination total={100} itemRender={textItemRender} />
//     </>
//   );
// }

// export default CustomPagination;





// another tyep
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import $ from 'jquery';

window.React = React;



export class Pagination extends Component {
  


  render() {
    return (
      <div className="commentBox">
       
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}




function CustomPagination() {
  return (
    <>
      <Pagination perPage={10} />
    </>
  );
}

export default CustomPagination;
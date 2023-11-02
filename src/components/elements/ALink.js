
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function ALink({ label, to, icon, className, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  let customClassName = (!!className) ? className : '';

  return (
    <li className={match ? `active nav-item  ${customClassName}` : `nav-item ${customClassName}`}>
      <Link to={to} className="nav-link">
        <img src={icon} alt='' />  {label}
      </Link>
    </li>
  );
}

export default ALink;
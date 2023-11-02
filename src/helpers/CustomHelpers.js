import React, { Component }  from 'react';
import { Dropdown } from "react-bootstrap";
import CheckBox from "./../components/elements/CheckBox";


export const firstTwoLetterPicker = name => {
  let initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
};



export const DynamicOptions = (data) =>{
    var returnData = data.length > 0
            && data.map((item, i) => {
            return (
              <option key={i} value={item.id}>{item.name}</option>
            )
          }, this);

     return returnData;
}

export const DynamicCheckBox = (data) =>{
    var returnData = data.length > 0
            && data.map((item, i) => {
            return (
            	<div className="custom-control mb-3   custom-checkbox">
                <input type="checkbox" className="custom-control-input" id={i} value={item.id}/>
                <label className="custom-control-label" htmlFor={i}>{item.name}</label>
              </div>
            )
          }, this);

     return returnData;
}
export const DynamicCheckBoxNew = (data) =>{
    var returnData = data.length > 0
            && data.map((item, i) => {
            return (
              <CheckBox label={item.name} name="featured" id={i} value={item.id}/>
            )
          }, this);

     return returnData;
}

export const DynamicDropdown = (data) =>{
    var returnData = data.length > 0
            && data.map((item, i) => {
            return (
              <Dropdown.Item href="#" eventKey={item.id}>{item.code} {item.name}</Dropdown.Item>
            )
          }, this);

     return returnData;
}
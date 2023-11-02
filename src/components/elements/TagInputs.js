import React from 'react';
import Select from 'react-select';

const TagInputs = ({ label, value, onChange, suggestions }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <Select
        defaultValue={value}
        closeMenuOnSelect={false}
        isMulti
        name="colors"
        options={suggestions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onChange}
      />
    </div>
  </div>
);

export default TagInputs;

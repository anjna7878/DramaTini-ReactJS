import React, { useState } from "react";

function ToggleSwitch(props) {
  const [checked, setChecked] = useState(props.defaultChecked);
  const [Text] = useState(props.Text);

  function onChange(e) {
    setChecked(e.target.value);
    if (props.onToggleChange) props.onToggleChange(e);
  }

  return (
    <div className={"toggle toggle-switch"}>
      <input
        type="checkbox"
        name={props.Name}
        className="toggle-switch-checkbox"
        id={props.id}
        defaultChecked={checked}
        onChange={onChange}
      />
      {props.id ? (
        <label className="toggle-switch-label" htmlFor={props.id}>
          <span
            className={
              props.disabled
                ? "toggle-switch-inner toggle-switch-disabled"
                : "toggle-switch-inner"
            }
            data-yes={Text[0]}
            data-no={Text[1]}
          />
          <span
            className={
              props.disabled
                ? "toggle-switch-switch toggle-switch-disabled"
                : "toggle-switch-switch"
            }
          />
        </label>
      ) : null}
    </div>
  );
}

export default ToggleSwitch;

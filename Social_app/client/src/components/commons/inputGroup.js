import React from "react";
import classNames from "classnames";

const InputGroup = ({
  placeholder,
  name,
  onChange,
  icon,
  value,
  errors
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} aria-hidden="true"/>
        </span>
      </div>

      <input
        className={classNames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
      {errors && <div className="invalid-feedback">{errors} </div>}
    </div>
  );
};

export default InputGroup;

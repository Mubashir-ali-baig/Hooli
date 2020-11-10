import React from "react";
import classNames from "classnames";

const TextFields = ({
  type,
  placeholder,
  name,
  onChange,
  value,
  disabled,
  info,
  errors
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classNames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {errors && <div className="invalid-feedback">{errors} </div>}
    </div>
  );
};

export default TextFields;

import React from "react";
import classNames from "classnames";

const TextArea = ({
  placeholder,
  name,
  onChange,
  value,
  info,
  errors
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classNames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {errors && <div className="invalid-feedback">{errors} </div>}
    </div>
  );
};

export default TextArea;

import React from "react";
import classNames from "classnames";

const SelectList = ({
  name,
  onChange,
  value,
  info,
  options,
  errors
}) => {
  const selectedOption = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classNames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        name={name}
        onChange={onChange}
        value={value}
      >
      {selectedOption}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {errors && <div className="invalid-feedback">{errors} </div>}
    </div>
  );
};

export default SelectList;

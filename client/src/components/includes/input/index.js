import React from "react";

function Input(props) {
  const { id, className, name, type, placeholder, value, readOnly, onChange, label, error } = props;

  return (
    <div className={className}>
      {!label || <label className="form-label">{label}</label>}
      <input
        id={id}
        name={name}
        className={`form-control ${error && "error--container"}`}
        type={type}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
      />
      {typeof error === "boolean" || <small className="error--message">{error}</small>}
    </div>
  );
}

export default Input;

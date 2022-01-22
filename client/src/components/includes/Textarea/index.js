import React from "react";

function TextArea(props) {
  const { id, className, name, type, placeholder, value, readOnly, rows, onChange, label, error } = props;

  return (
    <div className={className}>
      {!label || <label className="form-label">{label}</label>}
      <textarea
        id={id}
        name={name}
        className={`form-control ${error && "error--container"}`}
        type={type}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        rows={rows}
        onChange={onChange}
      />
      {typeof error === "boolean" || <small className="error--message">{error}</small>}
    </div>
  );
}

export default TextArea;

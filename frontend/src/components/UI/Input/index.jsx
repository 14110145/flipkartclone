import React from "react";
import { Form } from "react-bootstrap";

const Input = (props) => {
  let input;
  switch (props.type) {
    case "select":
      input = (
        <Form.Group>
          {props.label && <Form.Label>{props.label}</Form.Label>}
          <select className="form-control form-control-sm" value={props.value} onChange={props.onChange}>
            <option>{props.placeholder}</option>
            {props.options.length
              ? props.options.map((option, index) => {
                  return (
                    <option key={index} value={option.value}>
                      {option.name}
                    </option>
                  );
                })
              : null}
          </select>
        </Form.Group>
      );
      break;
    default:
      input = (
        <Form.Group>
          {props.label && <Form.Label>{props.label}</Form.Label>}
          <Form.Control
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            {...props}
          />
          <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
        </Form.Group>
      );
      break;
  }
  return input;
};

export default Input;

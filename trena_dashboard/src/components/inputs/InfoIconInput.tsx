import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Input, InputGroup, InputGroupText } from "reactstrap";

interface InfoIconInputProps {
  placeholder?: string;
  icon: IconDefinition;
  iconDescription?: string;
  width?: string;
}

export function InfoIconInput({
  placeholder,
  icon,
  iconDescription,
  width,
}: InfoIconInputProps) {
  return (
    <InputGroup>
      <InputGroupText
        style={{
          width: width ? width : "100px",
        }}
      >
        <FontAwesomeIcon icon={icon} />
        <span style={{ marginLeft: "15px" }}>{iconDescription}</span>
      </InputGroupText>
      <Input readOnly addon placeholder={placeholder} />
    </InputGroup>
  );
}

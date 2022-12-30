import React, { ChangeEvent } from "react";
import Input from "./core/Input";

interface Props {
  // Props for the component go here
}

const Register: React.FC<Props> = (props) => {
  const [name, setName] = React.useState("");

  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };

  return (
    <>
      <Input
        value={name}
        handleChange={handleNameChange}
        label={"Please Enter User Name:"}
      />
    </>
  );
};

export default Register;

import React from "react";
import { useState } from "react";


const Form = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault(e);

    if (!name || !email || !message) {
      alert("Lütfen tüm alanları doldurunuz");
      return;
    }

    onAdd({ name, email, message });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <input className="btn btn-block" type="submit" value="Submit"></input>
    </form>
  );
};

export default Form;

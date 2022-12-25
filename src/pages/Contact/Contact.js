import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    justifyItems: "center",
    margin: "2rem",
    position: "relative",
    color: "#F94B25",
    top: "75px",
  },
  btn: {
    backgroundColor: "#78B64D!important",
    borderColor: "#78B64D!important",
  },
}));

function Contact() {
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [result, setResult] = useState(null);

  const sendMail = (e) => {
    e.preventDefault();

    axios
      .post("/sendmail", { ...detail })
      .then((response) => {
        setResult(response.data);
        setDetail({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setResult({
          success: false,
          message: "Something went wrong. Try again later",
        });
      });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setDetail({
      ...detail,
      [name]: value,
    });
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form onSubmit={sendMail} className={classes.form}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={detail.name}
            placeholder="Enter your full name"
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={detail.email}
            placeholder="Enter your email"
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={detail.message}
            rows="3"
            placeholder="Enter your message"
            onChange={onInputChange}
          />
        </Form.Group>
        <Button className={classes.btn} variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Contact;

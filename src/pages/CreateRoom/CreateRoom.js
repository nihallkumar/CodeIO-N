import React from 'react';
import { makeStyles } from '@mui/styles';
import { Form, Button } from 'react-bootstrap';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    justifyItems: 'center',
    margin: '2rem',
    position: 'relative',
    color: '#F94B25',
    top: '75px',
  },
  btn: {
    backgroundColor: '#78B64D!important',
    borderColor: '#78B64D!important',
  },
}));

function CreateRoom() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Form className={classes.form}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Room Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Room Name" />
          <Form.Text className="text-muted">
            We'll never share your secrets with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button className={classes.btn} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateRoom;

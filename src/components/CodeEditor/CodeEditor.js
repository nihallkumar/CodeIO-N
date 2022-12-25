import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Dropdown,
  DropdownButton,
  Button,
  Modal,
  ModalBody,
  ModalDialog,
} from 'react-bootstrap';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { compileCode } from '../../api';
import { socket } from '../../socket';
import { useSelector } from 'react-redux';

const compilerData = [
  {
    python: {
      language: 'python3',
      versionIndex: '3',
    },
    java: {
      language: 'java',
      versionIndex: '3',
    },
    csharp: {
      language: 'csharp',
      versionIndex: '3',
    },
    cpp: {
      language: 'cpp17',
      versionIndex: '0',
    },
  },
];

const useStyles = makeStyles(() => ({
  editor: {
    width: '50%',
    height: '85vh',
    display: 'flex',
    flexDirection: 'column',
  },
  toolbar: {
    width: '100%',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  childtoolbar: {
    display: 'flex',
  },
  textArea: {
    width: '100%',
    height: '500px',
    marginTop: '1rem',
    backgroundColor: 'white',
  },
  btn: {
    marginTop: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#78B64D!important',
    borderColor: '#78B64D!important',
  },
}));

function CodeEditor() {
  const classes = useStyles();
  const editorRef = useRef(null);
  const [UsersJoined, setusers] = useState([]);
  const [value, setValue] = useState('Language');
  const [theme, setTheme] = useState('Theme');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [output, setoutput] = useState('');
  const room_id = useSelector((state) => state.RoomDetails.RoomId);
  const [code, setcode] = useState('//Comment');
  const handleSelect = (e) => {
    setValue(e);
  };
  const handleTheme = (e) => {
    setTheme(e);
  };
  const GetLanguageVersion = (lang) => {
    if (lang === 'python3') {
      return 3;
    }
    if (lang === 'java') {
      return 3;
    }
    if (lang === 'csharp') {
      return 3;
    }
    if (lang === 'cpp17') {
      return 0;
    }
  };
  const SubmitHandler = async (e) => {
    if (code === '') {
      return;
    }
    if (value === 'Language') {
      return;
    }
    const body = {
      script: code,
      language: value,
      versionIndex: GetLanguageVersion(value),
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET
    };
    console.log(body);

    try {
      const res = await compileCode(body);
      console.log(res);
      if (res.data.statusCode == 200) {
        setoutput(res.data.output);
        socket.emit('SHOW-OUT', {
          show: true,
          output: res.data.output,
          code: room_id,
        });
        handleShow();
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleEditorChange(value, event) {
    setcode(value);
    socket.emit('CODE-CHANGED', {
      roomid: room_id,
      newcode: value,
    });
  }

  useEffect(() => {
    socket.on('CODE-CHANGED', (data) => {
      setcode(data);
    });

    socket.on('ROOM-CONNECTION', (data) => {
      setusers(data);
    });

    socket.on('SHOW-OUT', ({show, output}) => {
      setShow(show);
      setoutput(output);
    });

    // socket.emit('SHOW-OUT', { show: show, code: room_id });
  }, []);

  return (
    <div className={classes.editor}>
      <div className={classes.toolbar}>
        <div className={classes.childtoolbar}>
          <DropdownButton
            className={classes.dropdown}
            id="dropdown-basic-button"
            title={value}
            onSelect={handleSelect}
          >
            <Dropdown.Item eventKey="java">Java</Dropdown.Item>
            <Dropdown.Item eventKey="cpp17">C++</Dropdown.Item>
            <Dropdown.Item eventKey="python3">Python</Dropdown.Item>
            <Dropdown.Item eventKey="csharp">C#</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className={classes.childtoolbar}>
          <DropdownButton
            className={classes.dropdown}
            id="dropdown-basic-button"
            title={`Participants - ${UsersJoined.length}`}
            onSelect={handleSelect}
          >
            {UsersJoined.map((i, index) => (
              <Dropdown.Item key={index} eventKey="java">
                {i.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <div className={classes.childtoolbar}>
          <DropdownButton
            className={classes.dropdown}
            id="dropdown-basic-button"
            title={theme}
            onSelect={handleTheme}
          >
            <Dropdown.Item eventKey="light">Light</Dropdown.Item>
            <Dropdown.Item eventKey="vs-dark">Dark</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <div id="textarea" className={classes.textArea}>
        <Editor
          height="100%"
          defaultLanguage={'java'}
          language={value}
          defaultValue="// some comment"
          theme={theme}
          onChange={handleEditorChange}
          value={code}
        />
      </div>
      <Button
        style={{ marginTop: '1rem' }}
        className={classes.btn}
        onClick={(e) => SubmitHandler(e)}
        color="primary"
      >
        Submit
      </Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Output</Modal.Title>
        </Modal.Header>
        <Modal.Body>{output}</Modal.Body>
        <Modal.Footer>
          <Button
            className={classes.btn}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CodeEditor;

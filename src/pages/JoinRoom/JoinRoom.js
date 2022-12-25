import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import JoinRoomModal from '../../components/JoinRoomModal/JoinRoomModal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function JoinRoom() {
  const data = useSelector((state) => state.isRoomCode);
  console.log(data);
  // const [isCodeAvailable, setIsCodeAvailable] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {data ? <CodeEditor /> : <JoinRoomModal />}
    </div>
  );
}

export default JoinRoom;

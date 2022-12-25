import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import menue_icon from './../../assets/list.svg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((menueVisible) => ({
  navbar: {
    width: '100%',
    height: '75px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Prompt',
    fontSize: '25px',
    color: '#F94B25',
    marginLeft: '2rem',
    fontWeight: '800',
  },
  span: {
    color: '#78B64D',
  },
  list: {
    margin: 0,
    padding: 0,
    marginRight: '2rem',
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ['@media(max-Width: 800px)']: {
      marginTop: '3rem',
      width: '100%',
      position: 'absolute',
      top: '0px',
      left: '0px',
      height: '50vh',
      display: (menueVisible) => (menueVisible ? 'block' : 'none'),
    },
  },
  li: {
    margin: '1rem',
    fontFamily: 'Prompt',
    fontSize: '20px',
    fontWeight: '500',
    color: '#F94B25',
    '&:hover': {
      cursor: 'pointer',
      color: '#78B64D',
    },
    ['@media(max-Width: 800px)']: {
      textAlign: 'center',
    },
  },
  ham_img: {
    margin: '1rem',
    display: 'none',
    ['@media(max-Width: 800px)']: {
      display: 'block',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  img_icon: {
    width: '37px',
    height: '37px',
  },
  '&:hover': {
    cursor: 'pointer',
  },
}));

function Navbar() {
  const [menueVisible, setMenue] = useState(false);
  const classes = useStyles(menueVisible);
  return (
    <div className={classes.navbar}>
      <div>
        <Link style={{ textDecoration: 'none' }} to="/">
          <h2 className={classes.title}>
            Code<span className={classes.span}>IO</span>
          </h2>
        </Link>
      </div>
      <ul className={classes.list}>
        {/* <Link style={{ textDecoration: 'none' }} to="/create-room">
          <li onClick={() => setMenue(false)} className={classes.li}>
            Create Room
          </li>
        </Link> */}
        <Link style={{ textDecoration: 'none' }} to="/join-room">
          <li onClick={() => setMenue(false)} className={classes.li}>
            Join Room
          </li>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/about">
          <li onClick={() => setMenue(false)} className={classes.li}>
            About
          </li>
        </Link>
      </ul>
      <li className={classes.ham_img}>
        <img
          onClick={() => setMenue(!menueVisible)}
          src={menue_icon}
          className={classes.img_icon}
          alt="icon"
        />
      </li>
    </div>
  );
}

export default Navbar;

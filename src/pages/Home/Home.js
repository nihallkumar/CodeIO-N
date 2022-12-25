import React from "react";
import { makeStyles } from "@mui/styles";
import github from "./../../assets/github.svg";
import socketIOClient from "socket.io-client";

const useStyles = makeStyles(() => ({
  home: {
    width: "100%",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title_home: {
    fontSize: "65px",
    fontFamily: "Prompt",
    color: "#F94B25",
    ["@media(max-Width: 692px)"]: {
      fontSize: "45px",
    },
  },
  span_bracket: {
    color: "#ffff",
  },
  descr: {
    fontFamily: "Prompt",
    color: "#ffff",
    fontWeight: "300",
    fontSize: "20px",
    width: "70%",
    textAlign: "center",
    ["@media(max-Width: 692px)"]: {
      fontSize: "18px",
    },
  },
  git_icon: {
    marginTop: "0.5rem",
    width: "36px",
    height: "36px",
    "&:hover": {
      cursor: "pointer",
      width: "37px",
      height: "37px",
    },
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.home}>
      <h1 className={classes.title_home}>
        <span className={classes.span_bracket}>&lt;</span> CodeIO{" "}
        <span className={classes.span_bracket}>/&gt;</span>
      </h1>
      <p className={classes.descr}>
        All real-time collaborative code editor. Create your coding room. Share
        your room code with your friends and enjoy coding together.
      </p>
    </div>
  );
}

export default Home;

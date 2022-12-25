import React from "react";
import { makeStyles } from "@mui/styles";
import github from "./../../assets/github.svg";

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
    fontSize: "50px",
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
  descrGit: {
    fontFamily: "Prompt",
    color: "#ffff",
    fontWeight: "400",
    fontSize: "15px",
    width: "20%",
    textAlign: "center",
    ["@media(max-Width: 692px)"]: {
      fontSize: "18px",
    },
  },
  git_icons: {
    width: "15%",
    display: "flex",
    flexDirection: "row",
    margin: "10px 20px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  git_icon: {
    marginTop: "0.5rem",
    width: "36px",
    height: "36px",
    "&:hover": {
      cursor: "pointer",

      transition: "all 0.2s ease-out",
      transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.85)",
    },
  },
}));

function About() {
  const classes = useStyles();
  return (
    <div className={classes.home}>
      <h1 className={classes.title_home}>
        <span className={classes.span_bracket}>&lt;</span> About{" "}
        <span className={classes.span_bracket}>/&gt;</span>
      </h1>
      <p className={classes.descr}>
        This is a great platform which serves the purpose of the peer coding
        very well and efficiently. The app is built upon the Nodejs server using
        sockets to get the real time updated code by your peers. <br />
        You can Execute your programs in the web app itself.
        <br />
      </p>
    </div>
  );
}

export default About;

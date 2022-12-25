const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const requestEndpoint = "https://api.jdoodle.com/execute";

// Server var ------------
let latestCodeVersion;
let countClient = 0;
let rooms = [];
let users = [];

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL, // your email address to send email from
    pass: process.env.PASS, // your gmail account password
  },
});

// API -----------
app.get("/latest-code", (req, res) => {
  console.log("lates-code called");
  if (latestCodeVersion) {
    res.json({ code: latestCodeVersion.code });
  } else {
    res.json({ code: "empty-code" });
  }
});

app.post("/compile", async (req, res) => {
  axios
    .post(requestEndpoint, req.body)
    .then((response) => res.json(response.data));
});

app.post("/sendmail", (req, res) => {
  try {
    const mailOptions = {
      from: req.body.email, // sender address
      to: process.env.email, // list of receivers
      html: `
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Message: ${req.body.message}</li>
      </ul>
      `,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Something went wrong. Try again later",
        });
      } else {
        res.send({
          success: true,
          message: "Thanks for contacting us. We will get back to you shortly",
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong. Try again later",
    });
  }
});

// SOCKET -------------------
io.on("connection", (socket) => {
  countClient++;
  console.log(`New client connected ${socket.id} : number = ${countClient}`);
  socket.on("disconnect", () => {
    if (users.length >= 1) {
      const user = users.filter((i) => {
        if (i.user_id == socket.id) {
          return i;
        }
      });
      if (user.length >= 1) {
        const { user_id, room_id } = user[0];
        users = users.filter((i) => {
          if (i.user_id !== user_id) {
            return i;
          }
        });
        countClient--;
        io.to(room_id).emit("ROOM-CONNECTION", users);
      }
    }
  });

  socket.on("SHOW-OUT", ({ show, output, code }) => {
    io.to(code).emit("SHOW-OUT", { show: show, output: output });
  });

  socket.on("JOIN-ROOM", ({ name, code }) => {
    socket.join(code);
    rooms.push({
      code: code,
    });
    users.push({
      name: name,
      user_id: socket.id,
      room_id: code,
    });
    const user = users.filter((i) => {
      if (i.room_id === code) {
        return i;
      }
    });
    console.log("Total users in " + code + " are " + user.length);
    io.to(code).emit("ROOM-CONNECTION", user);
  });

  socket.on("CODE-CHANGED", (data) => {
    io.to(data.roomid).emit("CODE-CHANGED", data.newcode);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

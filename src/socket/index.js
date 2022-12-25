import socketIOClient from "socket.io-client";

export const socket = socketIOClient(
  "http://127.0.0.1:4001"
);

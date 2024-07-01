import express from "express";
import { WebSocketServer,WebSocket } from "ws";

const app = express();
const httpServer = app.listen(8080,()=>{
    console.log("server running on psot 8080")
});

const wss = new WebSocketServer({ server: httpServer });
let countuser = 1;
wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
 //@ts-ignore
  ws.send("Hello! Message From Server!!",countuser++);
});

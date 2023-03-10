const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const cors = require("cors");
const { Server } = require("socket.io");

//DB Connections
const mongostring = "mongodb://localhost:27017/bookingDB";
mongoose.set("strictQuery", false);
mongoose.connect(mongostring);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database connected!");
});

//Server connection
const app = express();

app.use(cors());
app.use(express.json());

//NEW SERVER
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
  },
});

server.listen(3000, () => {
  console.log(`Server is running on port ${3000}... `);
});

//EVENTS
io.on("connection", (socket) => {
  console.log(`USER CONNECTED ${socket.id}`);

  socket.on("add_booking", (data) => {
    socket.broadcast.emit("recieve_booking", data);
    console.log("DATA", data);
  });

  socket.on("delete_booking", (data) => {
    socket.broadcast.emit("remove_booking", data);
    console.log("DELETED", data);
  });
});

//Routes
app.use("/api", routes);

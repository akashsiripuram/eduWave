// const express = require("express");
// // const connectDB = require("./Connection");
// const app = express();
// const route = require("./route");
// const cors = require("cors");
// require("dotenv").config();
// app.use(express.json({ limit: "50mb" }));
// app.use(cors());
// app.use("/api", route);
// // const io = require('socket.io')(5000)
// const http = require("http")
// const server = http.createServer(app)

// const port = process.env.PORT || 5000;
// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URL);
//     app.listen(port, console.log(`server is listening to port ${port}`));
//   } catch (error) {
//     console.log(error);
//   }
// };
// const io = require("socket.io")(server, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: [ "GET", "POST" ]
// 	}
// })

// io.on("connection", (socket) => {
// 	socket.emit("me", socket.id)

// 	socket.on("disconnect", () => {
// 		socket.broadcast.emit("callEnded")
// 	})

// 	socket.on("callUser", (data) => {
// 		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
// 	})

// 	socket.on("answerCall", (data) => {
// 		io.to(data.to).emit("callAccepted", data.signal)
// 	})
// })
// server.listen(3000,()=>console.log("Lisytening on port 3000"));

//akash branch
const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(5000, () => console.log("server is running on port 5000"))
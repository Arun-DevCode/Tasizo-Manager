import express from "express";
import cors from "cors";

//Imports
import UserRouter from "./src/routers/userRoute.js";
import TaskRouter from "./src/routers/taskRoute.js";
import DBConnection from "./src/config/db.config.js";

// App Setup
const app = express();

// App Middleware
app.use(express.json()); // Body parser
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST","DELETE"],
    credentials: true,
  }),
);

// App Router
app.use("/api/user", UserRouter);
app.use("/api/task", TaskRouter);

// Db Connection - Lose Connection
// mongoose
//   .connect("mongodb://localhost:27017/LocalDB")
//   .then(() => {
//     console.log("DB CONNECTED");
//   })
//   .catch(() => {
//     console.log("DB NOT CONNECTED!");
//   }); // Local DB Server

// Strict DB Server
const PORT = 4000; // SERVER PORT
DBConnection()
  .then(() => {
    console.log("DB CONNECTED"); // DB Log Message
    // Server listen
    app.listen(PORT, () => console.log("Server is running.."));
  })
  .catch((err) => {
    return process.exit(1);
  });

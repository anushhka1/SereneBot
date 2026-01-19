import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js"
import cors from "cors"
// Importing routes 
import userRoutes from "./routes/userRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import journalRoutes from "./routes/journalRoutes.js"; // ✅

dotenv.config()
const app = express()

app.use(cors())
// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend working!");
});

// Using the routes
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/journals", journalRoutes);

    connectDb()
       .then(() => {
          app.listen(process.env.PORT, () => {
             console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection failed:", err));

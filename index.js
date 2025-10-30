import express from "express"
import dotenv from "dotenv"
import connect_db from "./config/db.js"
import auth_Router from "./routes/auth_routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import user_Router from "./routes/user_routes.js"
import message_Router from "./routes/message_route.js"
dotenv.config()

const port = process.env.PORT || 5000
const app = express()

const allowedOrigins = [
  "https://chitthi-goje.onrender.com",
  "https://adarsh-verse.github.io/Chitthi"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());

app.use(express.json()); 
app.use(cookieParser())

app.use("/api/auth", auth_Router)
app.use("/api/user", user_Router)
app.use("/api/message", message_Router)


connect_db().then(() => {
    app.listen(port, () => console.log(`Server started at port ${port}`));
}).catch(err => console.error("DB connection failed:", err));

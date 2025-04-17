const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const cors = require("cors");
const connectDB = require("./db/connectDB");

const PORT = 5000 || process.env.PORT;

connectDB();

//Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/register", require("./routes/register"));
app.use("/send_code", require("./routes/sendEmail"))
app.use("/verify", require("./routes/verifyUser"));
app.use("/login", require("./routes/login"))

app.use("/refresh", require("./routes/refreshToken"))

// signin with google
app.use("/api/auth", require("./routes/googleAuth"))


app.use("/logout", require("./routes/logout"));
app.use("/forgot-password", require("./routes/forgotPassword"));


// app.use(require("./middleware/userVerification"))
app.use("/dashboard", require("./middleware/userVerification"), require("./routes/dashboard"))
app.use("/dashboard", require("./routes/userData"));

app.get("/", (req, res) => {
  res.send("Welcome, user!");
});

app.listen(PORT, () => console.log(`Serving on ${PORT}`));
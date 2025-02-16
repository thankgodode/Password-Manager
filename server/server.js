const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");

const authRoute = require("./middleware/userVerification")

const cors = require("cors");
const connectDB = require("./db/connectDB");

const PORT = 5000 || process.env.PORT;

require("./utils/passport");
connectDB();

//Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// // Signup with google
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/signup" }),
//   (req, res) => {
//     res.redirect("http://localhost:3000/dashboard");
//   }
// );

// app.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) return next(err);

//     console.log("Logged out");
//     res.redirect("/");
//   });
// });

app.use("/register", require("./routes/register"));
app.use("/verify", require("./routes/verifyUser"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/forgot-password", require("./routes/forgotPassword"));

app.use(require("./middleware/userVerification"));
app.use("/dashboard", require("./routes/dashboard"))
app.use("/dashboard", require("./routes/userData"));

app.get("/", (req, res) => {
  res.send("Welcome, user!");
});

app.listen(PORT, () => console.log(`Serving on ${PORT}`));
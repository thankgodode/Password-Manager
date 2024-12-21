const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db/connectDB");

const PORT = 5000 || process.env.PORT;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/register", require("./routes/register"));
// app.use("/verify", require("./routes/verifyEmail.js"));

app.listen(PORT, () => console.log(`Serving on ${PORT}`));

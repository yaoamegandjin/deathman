const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Authroute = require("./Routes/AuthRoute.js");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Database connection failed", err));
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", Authroute);


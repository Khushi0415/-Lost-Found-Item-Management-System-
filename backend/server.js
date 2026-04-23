require("dotenv").config(); // 🔥 हमेशा सबसे ऊपर

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/items"));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
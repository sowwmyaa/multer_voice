const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/voice", express.static("uploads/voice"));
app.use("/api/voice", require("./routes/voice"));

app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});

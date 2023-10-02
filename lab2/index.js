const express = require("express");
const app = express();
const db = require("./routes/database");
const postRoutes = require("./routes/postRoutes");
const putRoutes = require("./routes/putRoutes");
const getRoutes = require("./routes/getRoutes");
const deleteRoutes = require("./routes/deleteRoutes");

app.set("port", 8080);

app.use("/", getRoutes);
app.use("/", postRoutes);
app.use("/", putRoutes);
app.use("/", deleteRoutes);

app.listen(app.get("port"), () =>
  console.log(`server listening on ${app.get("port")}`)
);

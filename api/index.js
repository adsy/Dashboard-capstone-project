const port = process.env.PORT || 80;
require("dotenv").config();
const app = require("./app");

app.listen(port, err => {
  if (err) {
    console.error("Fatal error during server start: ");
    console.error(e.stack || e);
  }
  console.log(`🚀 Cube.js server is listening on ${port}`);
});

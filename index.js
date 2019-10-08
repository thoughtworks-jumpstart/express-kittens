const app = require("./app");
const env = app.get("env"); // process.env.NODE_ENV
const port = 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port} in ${env} mode`);
});

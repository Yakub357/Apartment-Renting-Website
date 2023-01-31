const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

console.log(app.get("env"));

// **Starting a server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
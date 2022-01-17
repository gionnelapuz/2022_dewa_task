const app = require("./app");

const port = process.env.PORT_BACKEND || 4000;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
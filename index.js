const server = require("./api/server.js");
const port = process.env.PORT || 8675;

server.listen(port, () => {
  console.log(`***********\nServer is running on port: ${port}\n**********`);
});

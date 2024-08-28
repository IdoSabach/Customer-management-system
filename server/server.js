const http = require('http')
const fs = require("fs")
const path = require("path")


const port = 8000;

const server = http.createServer((req,res) => {
  res.writeHead(200, {"Contact-Type": "text/plain"});
  res.end("Okay");
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
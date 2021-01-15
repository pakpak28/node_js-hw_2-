const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 8080;
const DATABASE = "db.json";

let users = [];

const server = http.createServer((req, res) => {
  if (req.headers.iknowyoursecret == "TheOwlsAreNotWhatTheySeem") {
    console.log(
      `Glad to see >>> ${req.headers.username} 
      and his ip adress >>> ${req.connection.remoteAddress}.`
    );

    users.push({
      name: req.headers.username,
      ip: req.connection.remoteAddress,
    });
    fs.writeFile(DATABASE, JSON.stringify(users), { flag: "a" }, (err) => {
      console.log("error", err);
    });
  } else {
    console.log("u are not supposed to be here");
  }
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

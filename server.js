const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 8080;
const DATABASE = "db.json";

let users = [];

const server = http.createServer((req, res) => {
  if (req.headers.iknowyoursecret == "TheOwlsAreNotWhatTheySeem") {
    const { username } = req.headers;
    const { remoteAddress } = req.connection;
    console.log(
      `Glad to see >>> ${username} 
      and his ip adress >>> ${remoteAddress}.`
    );

    users.push({
      name: username,
      ip: remoteAddress,
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

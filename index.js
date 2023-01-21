// **Importing core modules
const { resolveNaptr } = require("dns");
const fs = require("fs");
const http = require("http");
const url = require("url");

// ** Importing Own Modules
// TODO: make a replaceTemplate function in the same module file

// *! Reading a database and templates
// ** Reading a data file
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

// *! Creating a server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // ** OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    res.end("hello overview");

    // ** PRODUCT PAGE
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("Product page");

    // ** API PAGE
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });

    res.end(data);

    // ** ERROR PAGE
  } else {
    res.writeHead(404);
    res.end(`Page ${pathname} NOT FOUND`);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening request on port: 8000");
});

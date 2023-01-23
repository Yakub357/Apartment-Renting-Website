// **Importing core modules
const { resolveNaptr } = require("dns");
const fs = require("fs");
const http = require("http");
const url = require("url");

// ** Importing Own Modules
// TODO: make a replaceTemplate function in the same module file
const replaceTemplate = require("./modules/replaceTemplate");

// *! Reading a database and templates
// ** Reading a data file
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

// ** Card template import
const tempCard = fs.readFileSync(
  `${__dirname}/templates/tempCard.html`,
  "utf-8"
);

// ** OVERVIEW PAGE html import
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/tempOverview.html`,
  "utf-8"
);

// ** PRODUCT PAGE reading
const tempApartment = fs.readFileSync(
  `${__dirname}/templates/tempApartment.html`,
  "utf-8"
);

// *! Creating a server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // TODO Create a pathnames for images and icons

  // ** OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    // *! ==== ==== ==== ==== ====
    // TODO complete this with replace template module
    const cardsHTML = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%APARTMENT_CARDS%}", cardsHTML);
    res.end(output);

    // ** APARTMENT PAGE
  } else if (pathname === "/apartment") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const apartment = dataObject[query.id];
    const output = replaceTemplate(tempApartment, apartment);
    res.end(output);

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

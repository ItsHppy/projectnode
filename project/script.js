const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const contentTypes = {
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",

  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
};


webApp = http.createServer(function (request, response) {

    let parsedUrl = url.parse(request.url, true);
  switch (request.url) {
    case `/`:      
      response.writeHead(302, {
        Location: "/index.html",
        "Content-Type": "text/html; charset=utf-8"
      });
      response.end();
      break;
    default:
        const filePath = path.join( 
          __dirname, 
          "./public", 
          parsedUrl.pathname.substring(1) 
        );
      fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
          response.writeHead(404, {
            "Content-Type": "text/html; charset=utf-8",
          });

          response.end("<h1>Not found</h1>");
        } else {
          const extname = path.extname(filePath);
          const contentType =
            contentTypes[extname] || "application/octet-stream";

          response.writeHead(200, {
            "Content-Type": contentType,
          });
          fs.createReadStream(filePath).pipe(response);
        }
    });
   }
});



let port = 1488;
webApp.listen(port, "127.0.0.1", function () {
  console.log(`start 127.0.0.1:${port}`);
});
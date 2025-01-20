const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const { contentTypes } = require("./utils/mimeTypes");
const smartController = require("./controllers/smartController");

const app = http.createServer((request, response) => {
  console.log(`\n\n\nUrl: ${request.url}\n`);
  let parsedUrl = url.parse(request.url, true);
  console.log(`parsedUrl.pathname: ${parsedUrl.pathname}`);
  switch (parsedUrl.pathname) {
    case "/":
      response.writeHead(302, {
        Location: "/index.html",
      });
      response.end();
      break;

    case "/smart":
      smartController.smart(request, response);
      break;

    default:
      parsedUrl.pathname = decodeURI(parsedUrl.pathname);
      const filePath = path.join(
        __dirname,
        "./public",
        parsedUrl.pathname.substring(1)
      );
      console.log(filePath);

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

const port = 3000;
app.listen(port, function () {
  console.log(`start http://127.0.0.1:${port}`);
});

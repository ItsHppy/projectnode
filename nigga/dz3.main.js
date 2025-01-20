function getRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }
  
  const http = require("http");
  const fs = require("fs");
  const path = require("path");

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
  
  const indexTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
   <ul>
    <li><a href="/route1">Рассписание</a></li>
    <li><a href="/route2">Картинки</a></li>
    <li><a href="/route3">Красивые мужчины</a></li>
   </ul>
  </body>
  </html>
  `;
  http
    .createServer(function (request, response) {
      console.log(`[${request.method}] Url: ${request.url}`);

  
      switch (request.url) {
        case "/":
          response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          response.write(indexTemplate);
      response.end();

          break;
        case "/route1":
          let num = getRandomInt(0, 4);
          response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          response.write(`<link rel="stylesheet" href="/css/style.css"><div>Сегодня будет ${num} пар</div>`);
          if (num === 1) {
            response.write(`<div>Сегодня будет математика<div>`);
          } else if (num == 2) {
            response.write(`<div>Сегодня будет математика и география<div>`);
          } else if (num == 3) {
            response.write(
              `<div>Сегодня будет математика, география и биология<div>`
            );
          } else if (num == 4) {
            response.write(
              `<div>Сегодня будет математика, география, биология и химия<div>`
            );
          } else {
            response.write(`<div>Сегодня не будет пар<div>`);

          }
      response.end();

          break;
        case "/route2":
          response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          response.write(`<link rel="stylesheet" href="/css/style.css">Route2<img src="img/1.jpg"></img>`);
          response.end();
          break;
        case "/route3":
          response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          response.write(`<title>Nigger</title><link rel="stylesheet" href="/css/style.css">Route3<img src="img/2.png"></img>`);
          response.end();
          break;

        default:
      const filePath = path.join(__dirname,"./public", request.url.substring(1));
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
  
    })
    .listen(3000, "127.0.0.1", function () {
      console.log("start 127.0.0.1:3000")
    })
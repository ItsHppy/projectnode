const fs = require("fs");
const path = require("path");
const url = require("url");

const smartphones = require("../data/smartphones");
const { getRandomCurrencyObj } = require("../utils/random");

const SmartItemTemplate = fs.readFileSync(
  path.join(__dirname, "../templates/smartItem.html"),
  "utf-8"
);
const SmartListPageTemplate = fs.readFileSync(
  path.join(__dirname, "../templates/smartListPage.html"),
  "utf-8"
);

const currencyObj = getRandomCurrencyObj();

const smart = (request, response) => {
  let parsedUrl = url.parse(request.url, true);
  console.log(
    `\nurl.parse(request.url, true).query: ${JSON.stringify(
      parsedUrl.query,
      null,
      4
    )}`
  );
  const { brand, maxprice, sort } = parsedUrl.query;
  const renderedData = smartphones
    .filterBy(brand, maxprice, sort == "true")
    .map((item) =>
      SmartItemTemplate.replace("{{name}}", item.name)
        .replace(
          "{{price}}",
          `<span style="color: #${currencyObj.hexCode};">${item.price}${currencyObj.symbol}</span>`
        )
        .replace("{{image-src}}", item.src)
    )
    .join("");

  const html = SmartListPageTemplate.replace("{{content}}", renderedData)
    .replace("{{title}}", "Раздел плов")
    .replace("{{titleH1}}", "Воот такой РАНДОМНЫЙ плов мы для вас подобрали (:");

  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  response.end(html);
};

module.exports.smart = smart;

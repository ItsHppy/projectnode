const { getRandomSmart, getRandomInt } = require("../utils/random");

const smartphones = Array.from({ length: getRandomInt(13, 47) }, () => ({
  name: getRandomSmart(),
  price: getRandomInt(5,100),
  src: `smart (${getRandomInt(1, 17)}).jpg`,
}));

const filterBy = (brand, maxprice, sort = true) => {
  let filteredSmartphones = [...smartphones];

  if (brand)
    filteredSmartphones = filteredSmartphones.filter((smartphone) =>
      smartphone.name.toLowerCase().includes(brand.toLowerCase())
    );

  if (maxprice)
    filteredSmartphones = filteredSmartphones.filter(
      (smartphone) => smartphone.price <= (parseInt(maxprice) || Infinity)
    );

  if (sort)
    filteredSmartphones = filteredSmartphones.sort((a, b) => a.price - b.price);
  return filteredSmartphones;
};
console.log(smartphones);

module.exports = {
  smartphones,
  filterBy,
};

document.querySelector("#searchButton").addEventListener("click", (e) => {
  window.location = `/smart?maxprice=${maxpriceInput.value}&brand=${encodeURI(
    brandInput.value
  )}&sort=${sortCheckbox.checked}`;
});

const query = new URLSearchParams(window.location.search);

if (query.has("макс.Цена")) maxpriceInput.value = query.get("макс.Цена");
if (query.has("бренд")) brandInput.value = query.get("бренд");
if (query.has("sort")) sortCheckbox.checked = query.get("sort") == "true";

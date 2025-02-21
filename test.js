const title = "pantalon";
const priceMine = "10";
const priceMax = "100";
const sort = "price-desc";
const page = 1;

const filter = { found: {} };
console.log(filter);

if (title) {
  filter.found.product_name = title;
}
if (priceMine && priceMax) {
  filter.found.product_price = {
    $gte: Number(priceMine),
    $lte: Number(priceMax),
  };
} else if (!priceMine && priceMax) {
  filter.found.product_price = { $lte: Number(priceMax) };
} else if (priceMine && !priceMax) {
  filter.found.product_price = { $gte: Number(priceMin) };
}
if (sort) {
  filter.sort = { product_price: sort.slice(6) };
}

console.log(filter);

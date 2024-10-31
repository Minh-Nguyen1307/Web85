import http from "http";
import { customers, products, orders } from "./data.js";
import url from "url";

const application = http.createServer((request, response) => {
  const endpoint = request.url;
  const method = request.method;
  const parsedUrl = url.parse(endpoint, true);

  if (parsedUrl.pathname === "/products" && method === "GET") {
    const { minPrice, maxPrice } = parsedUrl.query;

    const min = minPrice ? parseInt(minPrice) : null;
    const max = maxPrice ? parseInt(maxPrice) : null;

    const filteredProducts = products.filter((product) => {
      if (min !== null && max !== null) {
        return product.price >= min && product.price <= max;
      }

      if (min !== null) {
        return product.price >= min;
      }

      if (max !== null) {
        return product.price <= max;
      }

      return true;
    });

    response.end(JSON.stringify(filteredProducts));
  } else {
    switch (parsedUrl.pathname) {
      case "/":
        response.end("Hi");
        break;
      case "/customers":
        if (method === "GET") {
          response.end(JSON.stringify(customers));
        } else {
          response.end(JSON.stringify({ error: "Method not allowed" }));
        }
        break;
      default:
        response.end("404 Not Found");
        break;
    }
  }
});

application.listen(8080, () => {
  console.log("Server is running!");
});

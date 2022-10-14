let cart = localStorage.getItem("products");
cart = JSON.parse(cart);

if (cart === null) {
  console.log("je suis vide");
}

for (let item in cart) {
  console.table(item.id);

  fetch("http://localhost:3000/api/products/" + item.id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (product) {
      console.log(product);
    });
}
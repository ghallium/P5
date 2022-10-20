let cart = localStorage.getItem("products");
let totalQuantity = 0;
let totalPrice = 0;
let totalQuantityElt = document.getElementById("totalQuantity");
let totalPriceElt = document.getElementById("totalPrice");
let inputQuantity = document.getElementsByClassName("itemQuantity");

cart = JSON.parse(cart);

if (cart === null) {
  console.log("je suis vide");
}

for (let item of cart) {
  fetch("http://localhost:3000/api/products/" + item.id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (product) {
      if (item.quantity > 0) {
        totalQuantity += item.quantity;
        totalPrice += product.price * item.quantity;
      }
      document.getElementById(
        "cart__items"
      ).innerHTML += `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
          
                    <p>${product.colors}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;

      totalQuantityElt.innerText = totalQuantity;
      totalPriceElt.innerText = totalPrice;
    })
    .then(function () {
      for (let i = 0; i < inputQuantity.length; i++) {
        inputQuantity[i].addEventListener("change", function (event) {
          updateQuantity(this, event);
        });
      }

      // for pour ajouter le btn de delete

    })


}

function updateQuantity(element, event) {
  let newArticle = element.closest("article");
  let newQuantity = event.target.value;

  let productId = newArticle.dataset.id;
  let color = newArticle.dataset.color;
  for (let j = 0; j < cart.length; j++) {
    if (cart[j].id === productId && cart[j].color === color) {
      cart[j].quantity = parseInt(newQuantity);
      localStorage.setItem("products", JSON.stringify(cart));
    }
  }
}

// function (removeProduct) -> AddEventListener(click) puis fonction qui décrémente ?

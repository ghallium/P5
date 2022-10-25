let cart = localStorage.getItem("products");
let totalQuantity = 0;
let totalPrice = 0;
let totalQuantityElt = document.getElementById("totalQuantity");
let totalPriceElt = document.getElementById("totalPrice");
let inputQuantity = document.getElementsByClassName("itemQuantity");
let error;
let inputs = document.getElementsByTagName("input");

// Validation formulaire

for (let i =0; i < inputs.length; i++) {
  console.log(inputs[i]);
  if (!inputs[i].value) {
    erreur = "Veuillez renseigner tous les champs";
  }
}

cart = JSON.parse(cart);

// Gestion du panier

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
      /*function removeItem {
        let items = cart();

        for (i = 0; i < items.length; i++) {
          if (id === items[i][0] && color === items[i[1]]) {
            items.splice(i, 1);
            localStorage.setItem("products", JSON.stringify(items));
            window.location.reload();
          }
        }
      }*/

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
      console.log(newQuantity);
    }
  }
}

// function (removeProduct) -> AddEventListener(click) puis fonction qui décrémente ?
// Les produits ne sont pas encore stockés par types et toutes les couleurs dispo s'affichent 
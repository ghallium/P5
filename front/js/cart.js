let cart = localStorage.getItem("products");
let totalQuantity = 0;
let totalPrice = 0;
let totalQuantityElt = document.getElementById("totalQuantity");
let totalPriceElt = document.getElementById("totalPrice");
let inputQuantity = document.getElementsByClassName("itemQuantity");
let error;
let form = document.getElementsByTagName("input");
let regexEmail = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
let regexNamesAndCityAddress = new RegExp(/^[A-Za-z]{2,}$/);
let deleteItem = document.getElementsByClassName('deleteItem');

cart = JSON.parse(cart);

if (cart === null) {
  console.log("je suis vide");
}


for (let item of cart) {
  console.log('toto')
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
          
                    <p>${item.color}</p>
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
    })
    
    .then(function(){
      for (let i = 0; i < deleteItem.length; i++) {
        deleteItem[i].addEventListener('click' , function (){
          deleteFromCart(this)
        })
      }
    })
}

function updateQuantity(element, event, totalPrice) {
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


function deleteFromCart(element){
  let newArticle = element.closest("article");

  console.log(newArticle);
  let productId = newArticle.dataset.id;
  let color = newArticle.dataset.color;

  for (let u = 0; u < cart.length; u++) {
    if (cart[u].id === productId && cart[u].color === color) {
      cart.splice(u, 1);
      localStorage.setItem("products", JSON.stringify(cart));
    }
  }
  newArticle.remove()  

}

/*
function calculTotal(productId, quantity, totalPrice){
  console.log(totalPrice)
  fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
  .then(function(product) {
    let price = product.price;
    let totalPrice = price * product.quantity
    let totalLocal = parseInt(totalPrice); // Valeur actuel du localstorage au moment du chargement de la page

  })
  .catch((error ) => {
    console.log(error)
  })
  */





// function (removeProduct) -> AddEventListener(click) puis fonction qui décrémente ?
// Les produits ne sont pas encore stockés par types et toutes les couleurs dispo s'affichent

let inputEmail = document.getElementById("email");
inputEmail.addEventListener("focusout", function () {
  emailValidator(this.value);
});

function emailValidator(value) {
  let errorEmail = document.getElementById("emailErrorMsg");

  if (!regexEmail.test(value)) {
    errorEmail.innerText = "Erreur email incorrect";
    return false;
  } else {
    errorEmail.innerText = "";
    return true;
  }
}




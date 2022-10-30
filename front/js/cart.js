let cart = localStorage.getItem("products");
let totalQuantity = 0;
let totalPrice = 0;
let totalQuantityElt = document.getElementById("totalQuantity");
let totalPriceElt = document.getElementById("totalPrice");
let inputQuantity = document.getElementsByClassName("itemQuantity");
let error;
let form = document.getElementsByTagName("input");
let regexEmail = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
let regexNamesAndCity = new RegExp(/^[A-Za-z]{2,}$/);
let regexAddress = new RegExp(/^\s*\S+(?:\s+\S+){2}/);
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
}



// VALIDATION FORMULAIRE

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

let inputFirstName = document.getElementById("firstName");
inputFirstName.addEventListener("focusout", function() {
  firstNameValidator(this.value);
})



function firstNameValidator(value) {
  let errorFirstName = document.getElementById("firstNameErrorMsg");

  if (!regexNamesAndCity.test(value)) {
    errorFirstName.innerText = "Erreur prénom incorrect";
    return false;
  } else {
    errorFirstName.innerText = "";
    return true;
  }
}

let inputLastName = document.getElementById("lastName");
inputLastName.addEventListener("focusout", function() {
  lastNameValidator(this.value);
})

function lastNameValidator(value) {
  let errorLastName = document.getElementById("lastNameErrorMsg");

  if (!regexNamesAndCity.test(value)) {
    errorLastName.innerText = "Erreur nom de famille incorrect";
    return false;
  } else {
    errorLastName.innerText = "";
    return true;
  }

}

let inputAddress = document.getElementById("address");
inputAddress.addEventListener("focusout", function() {
  addressValidator(this.value);
})

function addressValidator(value) {
  let errorAddress = document.getElementById("addressErrorMsg");

  if (!regexAddress.test(value)) {
    errorAddress.innerText = "Erreur format d'adresse incorrect";
    return false;
  } else {
    errorAddress.innerText = "";
    return true;
  }

}

let inputCity = document.getElementById("city");
inputCity.addEventListener("focusout", function() {
  cityValidator(this.value);
})

function cityValidator(value) {
  let errorCity = document.getElementById("cityErrorMsg");

  if (!regexNamesAndCity.test(value)) {
    errorCity.innerText = "Erreur nom de ville incorrect";
    return false;
  } else {
    errorCity.innerText = "";
    return true;
  }

}

// ENVOI FORMULAIRE REQUETE POST 

/*const request = makeRequestBody()
fetch("http://localhost:3000/api/products/order",
  method : "POST",
  body: JSON.stringify(body),
  headers : {
  "Content-Type : application/json"
})
  .then((res) => res.json())
  .then((data) => {
  data.orderId
  window.location.href = "/confirmation.html" + "?orderId=" + orderId
  return console.log(data)
  })
  .catch((err) => console.log(err))*/

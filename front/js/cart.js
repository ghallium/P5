let cart = localStorage.getItem("products");
let totalQuantityElt = document.getElementById("totalQuantity");
let totalPriceElt = document.getElementById("totalPrice");
let totalQuantity = 0;
let totalPrice = 0;
let inputQuantity = document.getElementsByClassName("itemQuantity");
let error;
let form = document.getElementsByTagName("input");
let regexEmail = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
let regexNamesAndCity = new RegExp(/^[A-Za-z]{2,}$/);
let regexAddress = new RegExp(/^\s*\S+(?:\s+\S+){2}/);
let deleteItem = document.getElementsByClassName("deleteItem");
let inputEmail = document.getElementById("email");
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAddress = document.getElementById("address");
let inputCity = document.getElementById("city");

cart = JSON.parse(cart);

// AFFICHAGE DES PRODUITS DU PANIER

/*

   ____           _   
  / ___|__ _ _ __| |_ 
 | |   / _` | '__| __|
 | |__| (_| | |  | |_ 
  \____\__,_|_|   \__|

*/

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
                    <p>${item.color}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}" data-old-value="${item.quantity}">
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

      .then(function () {
         for (let i = 0; i < deleteItem.length; i++) {
            deleteItem[i].addEventListener("click", function () {
               deleteFromCart(this);
            });
         }
      });
}

// GESTION DES QUANTITES - SUPPRIMER UN ARTICLE DU PANIER

function updateQuantity(element, event, totalPrice) {
   let newArticle = element.closest("article");
   let newQuantity = event.target.value;

   let productId = newArticle.dataset.id;
   let color = newArticle.dataset.color;

   let oldValue = element.dataset.oldValue;
   element.dataset.oldValue = newQuantity;

   calculateTotal(productId, oldValue, newQuantity);
   for (let j = 0; j < cart.length; j++) {
      if (cart[j].id === productId && cart[j].color === color) {
         cart[j].quantity = parseInt(newQuantity);
         localStorage.setItem("products", JSON.stringify(cart));
      }
   }
}

function deleteFromCart(element) {
   let newArticle = element.closest("article");
   let productId = newArticle.dataset.id;
   let color = newArticle.dataset.color;
   let input = element.closest("article").querySelector(".itemQuantity");
   let oldValue = input.dataset.oldValue;
   calculateTotal(productId, oldValue, 0);

   for (let u = 0; u < cart.length; u++) {
      if (cart[u].id === productId && cart[u].color === color) {
         cart.splice(u, 1);
         localStorage.setItem("products", JSON.stringify(cart));
      }
   }
   newArticle.remove();
}

function calculateTotal(productId, oldQuantity, newQuantity) {
   fetch("http://localhost:3000/api/products/" + productId)
      .then(function (res) {
         if (res.ok) {
            return res.json();
         }
      })
      .then(function (product) {
         let quantityDifference = 0;
         let price = product.price;
         let priceDifference = 0;
         newQuantity = parseInt(newQuantity);
         oldQuantity = parseInt(oldQuantity);

         // Cas où l'ancienne et la nouvelle quantité sont > 0 -> traitement normal
         if (newQuantity > 0 && oldQuantity > 0) {
            quantityDifference = newQuantity - oldQuantity;
            priceDifference = quantityDifference * price;

            // Cas où l'ancienne quantité est < 0 et la nouvelle quantité est > 0 -> différence = nouvelle quantité
         } else if (newQuantity > 0 && oldQuantity < 0) {
            quantityDifference = newQuantity;
            priceDifference = quantityDifference * price;

            // Cas où l'ancienne quantité est > 0 et la nouvelle quantité est < 0 ->
            // différence = on soustrait l'ancienne quantité
         } else if (newQuantity < 0 && oldQuantity > 0) {
            quantityDifference = -oldQuantity;
            priceDifference = quantityDifference * price;
         }

         /// déconne ici vérifier le HTML rendu

         totalQuantityElt.innerText =
            parseInt(totalQuantityElt.innerText) + quantityDifference;
         totalPriceElt.innerText =
            parseInt(totalPriceElt.innerText) + priceDifference;
      });
}

// VALIDATION FORMULAIRE

// https://patorjk.com/software/taag/#p=testall&f=Small%20Slant&t=VALID%20FORM

/*
                                                                               
,--.   ,--.,---.  ,--.   ,--.,------.      ,------. ,-----. ,------. ,--.   ,--. 
 \  `.'  //  O  \ |  |   |  ||  .-.  \     |  .---''  .-.  '|  .--. '|   `.'   | 
  \     /|  .-.  ||  |   |  ||  |  \  :    |  `--, |  | |  ||  '--'.'|  |'.'|  | 
   \   / |  | |  ||  '--.|  ||  '--'  /    |  |`   '  '-'  '|  |\  \ |  |   |  | 
    `-'  `--' `--'`-----'`--'`-------'     `--'     `-----' `--' '--'`--'   `--' 
                                                                                                                                                                                       
*/


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


inputFirstName.addEventListener("focusout", function () {
   firstNameValidator(this.value);
});

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


inputLastName.addEventListener("focusout", function () {
   lastNameValidator(this.value);
});

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


inputAddress.addEventListener("focusout", function () {
   addressValidator(this.value);
});

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


inputCity.addEventListener("focusout", function () {
   cityValidator(this.value);
});

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

// ENVOI DES DONNEES PANIER ET FORMULAIRE

let submitButton = document.getElementById("order");
submitButton.addEventListener("click", function (e) {
   e.preventDefault();
   let validationError = false;

   const products = JSON.parse(localStorage.getItem("products"));

   if (products === null || products.length < 1) {
      alert("PANIER VIDE");
   } else if (
      emailValidator(email) === false &&
      firstNameValidator(firstName) === false
   ) {
      return (validationError = true);
   } else {
      const productsId = [];
      products.forEach((product) => {
         productsId.push(product.id);
      });

      const order = {
         contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
         },
         products: productsId,
      };

      orderProduct(order);
   }
});

function orderProduct(order) {
   fetch("http://localhost:3000/api/products/order", {
         method: "POST",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(order),
      })
      .then(function (res) {
         if (res.ok) {
            return res.json();
         }
      })
      .then(function (value) {
         window.location = `./confirmation.html?orderId=${value.orderId}`;
         localStorage.clear();
      })
      .catch(function (error) {
         console.log(error);
      });
}


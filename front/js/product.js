let url = window.location.href;
url = new URL(url);
let id = url.searchParams.get("id");
let colorInput = document.getElementById("colors");
let quantity = document.getElementById("quantity");
let button = document.getElementById("addToCart");

// Récupération des infos de produit
function getProduct(id) {
   fetch(`http://localhost:3000/api/products/${id}`)
      .then(function (data) {
         if (data.ok) {
            return data.json();
         }
      })
      // Affichage des informations dans le DOM
      .then(function (product) {
         document.getElementById("title").innerText = product.name;
         const productImage = document.createElement("img");
         productImage.src = product.imageUrl;
         productImage.id = "productImage";
         let itemImg = document.getElementsByClassName("item__img");
         itemImg[0].appendChild(productImage);
         document.getElementById("price").innerText = product.price;
         document.getElementById("description").innerText = product.description;

         for (let color of product.colors) {
            let option = document.createElement("option");
            option.value = color;
            option.innerText = color;
            colorInput.appendChild(option);
         }
      })
      .catch((error) => console.log(error));
}

getProduct(id);

button.addEventListener("click", function () {
   let color = colorInput.value;
   let quantityValue = parseInt(quantity.value);

   if (color === "" || quantityValue === 0) {
      s
      alert("Vous devez sélectionner une couleur et une quantité");
   } else {
      alert("Le produit a été ajouté au panier !");
   }

   // Stockage de l'id, quantité, image et couleur du produit dans le localStorage
   let productOrder = {
      id: id,
      quantity: quantityValue,
      image: document.getElementById("productImage").src,
      title: title.innerText,
      color: color,
   };

   let cart = localStorage.getItem("products");

   if (cart == null) {
      cart = [];
   } else {
      cart = JSON.parse(cart);
   }

   console.log(productOrder);
   let newItem = true;
   //    if(...) Si le produit existe déjà avec la même couleurs dans ce cas faut incrementer la valeur
   // produit.quantity += productOrder.quantity

   for (let produit of cart) {
      if (
         productOrder.id === produit.id &&
         productOrder.color === produit.color
      ) {
         produit.quantity += productOrder.quantity;
         newItem = false;
      }
   }

   if (newItem === true) {
      cart.push(productOrder);
   }

   localStorage.setItem("products", JSON.stringify(cart));
});

// 2 : Récupérer l'info de ce produit
// 3 : Afficher le produit dans le DOM 
// 4 : Créer le panier 

//  product.html?id=42

// Un seul produit donc pas de boucle

let url = window.location.href
url = new URL(url);
let id = url.searchParams.get('id');
let colorInput = document.getElementById('colors');
let quantity = document.getElementById('quantity');

// Récupération des infos de produit
function getProduct(id){

    fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (data){
        if(data.ok){
        return data.json()
        }
     
    })
     // Affichage des informations dans le DOM
    .then(function (product){
        //debugger;
        document.getElementById("title").innerText = product.name;
        const productImage = document.createElement('img');
        productImage.src = product.imageUrl;
        let itemImg = document.getElementsByClassName('item__img');
        itemImg[0].appendChild(productImage);
        document.getElementById("price").innerText = product.price;
        document.getElementById("description").innerText = product.description;
        document.getElementById("colors").innerText = product.colors;
        
        
        

       

        for( let color of product.colors){
   
        let option = document.createElement('option');
        option.value = color;
        option.innerText = color;
        console.log(product)

        colorInput.appendChild(option)

        }

    })
    .catch((error) => console.log(error))
 
}

getProduct(id);



// 1 : Mettre en place une vérification lors de la soumission ( Couleur / Quantité ) selectionner. 
    // a  : En cas d'erreur une simple alert("ALERT")

// 2 : Si pas de prblm sur "1" dans ce cas créer le localstorage avec le produit
    // a : Vérifier si le localstorage existe ? 
        // a:b Si il existe le remplir avec les nouvelles données sans écraser les anciennes et si le produit ainsi que la couleurs 
        // sont déjà présent alors les incrémenter 

// 3 : Message de succès lors de l'ajout dans le panier alert('produit ajouté au panier');



// INFO : NE PAS STOCKER LE PRIX dans le localstorage ( ID, COLOR, QTY )


/// Produit A :  5 exemplaires - Yellow 
/// Produit A : 3 examplaires - Black

// Si j'ajoute un produit yellow j'incrément (+) la valeurs déjà présente dans le localstorage

// PRODUIT A : 1 - YELLOW  ----  6 exemplaires - Yellow 
/// Produit A : 3 examplaires - Black




let button = document.getElementById('addToCart');

button.addEventListener('click', function(){
 
    let color = colorInput.value;
    let qty = parseInt(quantity.value)

    console.log(qty)



})
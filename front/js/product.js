
// 2 : Récupérer l'info de ce produit
// 3 : Afficher le produit dans le DOM 
// 4 : Créer le panier 

//  product.html?id=42

let url = window.location.href
url = new URL(url);
let id = url.searchParams.get('id');


function getProduct(id){

    fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (data){
        if(data.ok){
        return data.json()
        }
     
    })
    .then(function (product){

        // Afficher les informations dans le DOM
        console.log(product)
    })
    .catch((error) => console.log(error))
 
}

getProduct(id);

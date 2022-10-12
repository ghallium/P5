function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(localStorage);
}

function getCart() {
    let cart = localStorage.getItem("cart");
    if(cart === null){
        return [];
    }else{
        return JSON.parse(cart);
    }
}

function addToCart(product){

    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id); // permet de chercher un élément sur un tableau par rapport à une condition

    if(foundProduct != undefined) {
        foundProduct.quantity++;
    }else{
        product.quantity = 1;
        cart.push(product);
    }

    
    saveCart(cart);
}

function removeFromCart(product){

    let cart = getCart();
    
    cart = cart.filter(p => p.id != product.id); // garde tous les produits sauf celui avec un id spécifique
    saveCart();
}


function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(localStorage);
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart"));
}

function addToCart(product){
    let cart = getCart();
    cart.push(product);
    saveCart(cart);
}


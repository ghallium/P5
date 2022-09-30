fetch('http://localhost:3000/api/products')
.then((response) => response.json())
.then(function (resultApi){

    for(let product of resultApi){
        document.getElementById('items').innerHTML += 
        `<a href="./product.html?id=${product._id}">
            <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="${product.name}">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
            </article>
        </a>`
    }

})


.catch((error) => console.log(error))

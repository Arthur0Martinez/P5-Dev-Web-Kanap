let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
console.log(idProduct);

fetch(`http://localhost:3000/api/products/${idProduct}`  )
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
        productData(data)
    })
    .catch(function (error) {
        console.log('Pas de liaison effectué', error)
    })

const productTitle = document.getElementById("title");

function productData(data) {
    productToCart(data);
    document.querySelector("title").innerText = data.name;
    document.getElementById("title").innerText = data.name;
    document.getElementById("description").innerText = data.description;
    document.getElementById("price").innerText = data.price;
    document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`
    // Réussir à faire les couleurs
    // document.getElementById("colors").innerText = data.colors;
    for (let colors of data.colors){
        console.log(colors);
        let productColors = document.createElement("option");
        let listOfColors = document.getElementById("colors");
        listOfColors.appendChild(productColors);
        productColors.innerHTML = colors;
        productColors.value = colors;
    }
}

function productToCart(data) {
    
    let btnProductToCart = document.getElementById("addToCart");
    let numberOfProduct = document.getElementById("quantity");
    
    btnProductToCart.addEventListener ("click", function () {   
        let numberOfProductValue = numberOfProduct.value
        if (colors.value != "" && numberOfProductValue > 0){
            let cartElements = {
               idProduct : idProduct, 
               colorsChoice : colors.value, 
               productNumber : numberOfProductValue,
               productImg : data.imageUrl,
               productImgAlt : data.altTxt,
               productName : data.name,
               productPrice : data.price,
            };
            console.log("Le bouton fonctionne");
            window.alert("L'article à été ajouté au panier");
            let basket = new Basket()
            basket.add(cartElements);
        }
        else{
            window.alert("Veuiller selectionner une couleur et une quantité");
        } 
    })
}

class Basket{
    constructor(){
        let basket = localStorage.getItem("Basket");
        if(basket === null){
            this.basket = [];
        }else{
            this.basket = JSON.parse(basket);
        }
    }
    save() {
        localStorage.setItem("Basket", JSON.stringify(this.basket));
    }
    add(product){
        let foundProduct = this.basket.find((el) => el.idProduct === idProduct && el.colorsChoice === colors.value);
        if(foundProduct){
            let newQuantity = parseInt(cartElements.numberOfProductValue) + parseInt(foundProduct.numberOfProductValue);
            console.log("Le produit est déjà dans le local storage")
            foundProduct.productNumber = newQuantity;
            this.save();
        }else{
            this.basket.push(product);
            this.save();
            console.log("Pas le produit dans le local storage")
        }
        this.save();
    }

}


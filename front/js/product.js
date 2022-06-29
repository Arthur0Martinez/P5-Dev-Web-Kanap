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
    productToCart(data);
}

function productToCart(data) {
    
    let btnProductToCart = document.getElementById("addToCart");
    let numberOfProduct = document.getElementById("quantity");
    
    btnProductToCart.addEventListener ("click", function () {
        
        if (colors.value != "" && numberOfProduct.value > 0){
            let cartElements = [data._id, colors.value, numberOfProduct.value];
            console.log(cartElements);
            console.log("Le bouton fonctionne");
            window.alert("L'article à été ajouté au panier");
            let basket = new Basket()
            basket.add(cartElements)
        }
        else{
            window.alert("Veuiller selectionner une couleur et une quantité");
        } 
    })
}

class Basket{
    constructor(){
        let basket = localStorage.getItem("Basket");
        if(basket == null){
            this.basket = [];
        }else{
            this.basket = JSON.parse(basket);
        }
    }
    save() {
        localStorage.setItem("Basket", JSON.stringify(this.basket));
    }
    add(product){
        let foundProduct = this.basket.find(p => p.id == product.id);
        if(foundProduct != undefined){
            foundProduct.quantity++;
        }else{
            product.quantity = 1;
            this.basket.push(product);
        }
        this.save();
    }
    remove(product){
        let basket = getBasket();
        this.basket = this.basket.filter(p => p.id != product.id);
        saveBasket();
    }
    changeQuantity(product, quantity){
        let foundProduct = this.basket.find(p => p.id == product.id);
        if (foundProduct != undefined) {
            foundProduct.quantity += quantity;
            if(foundProduct.quantity <= 0) {
                this.remove(foundProduct)
            }else {
                this.save();
            }
        }
    }
    getNumberProduct() {
        let number = 0;
        for(let product of this.basket) {
            number += product.quantity
        }
        return number;
    }
    getTotalPrice() {
        let number = 0;
        for(let product of this.basket) {
            number += product.quantity * product.price;
        }
        return number;
    }
}


//function addBasket(data){
  //  let addCartElements = getBasket();
    //addCartElements.push(data);
//}

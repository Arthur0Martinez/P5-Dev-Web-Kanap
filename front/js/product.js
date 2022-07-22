//Récupération de l'id produit compris dans l'URL de la page
let newUrl = new URL(window.location.href);
let idProduct = newUrl.searchParams.get("id");
console.log(idProduct);

//Appel de l'API et récupération des données en fonction de l'id produit
fetch(`http://localhost:3000/api/products/${idProduct}`  )
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
        implementProductData(data)
        productToCart(data)
    })
    .catch(function (error) {
        console.log('Pas de liaison effectué', error)
    })

//Données du produit implémenter dans le DOM
function implementProductData(data) {

    document.getElementById("title").innerText = data.name;    
    document.getElementById("price").innerText = data.price;
    document.getElementById("description").innerText = data.description;
    document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`
    
    //Séléctions différentes couleurs du produit
    for (let colors of data.colors){
        console.log(colors);
        let productColors = document.createElement("option");
        let listOfColors = document.getElementById("colors");
        listOfColors.appendChild(productColors);
        productColors.innerHTML = colors;
        productColors.value = colors;
    }
}


//Ajout des données produits nécéssaires pour le panier
function productToCart(data) {
    
    let btnProductToCart = document.getElementById("addToCart");
    let numberOfProduct = document.getElementById("quantity");
    
    //Implemente les données et permets de vérifier la séléction d'une couleur/quantité
    btnProductToCart.addEventListener ("click", function () {   
        if (colors.value != "" && numberOfProduct.value > 0){
            let cartElements = {
               idProduct : idProduct, 
               colorsChoice : colors.value, 
               productNumber : numberOfProduct.value,
               productImg : data.imageUrl,
               productImgAlt : data.altTxt,
               productName : data.name,
               productPrice : data.price,
            };
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

}


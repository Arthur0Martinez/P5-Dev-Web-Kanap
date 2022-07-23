//Vérifier que les données ont bien été récupérées
let getLocalStorage = JSON.parse(localStorage.getItem("Basket"));
console.table(getLocalStorage);

//Variables utiliser pour séléctioner le panier dans le DOM
const positionEmptyCart = document.querySelector("#cart__items");
const emptyCart = `<p>Aucun article dans le panier</p>`;

//Variables pour récupérer les éléments du formulaire dans le DOM
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const adress = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const submitBtn = document.getElementById("order");



//Vérifier si le panier à un article et en afficher les éléments 
//Affiche les éléments du panier sur la page
function getCart(){
    
    //Affiche un message si le panier est vide
    if (getLocalStorage === null || getLocalStorage == 0) {
        positionEmptyCart.innerHTML = emptyCart;
    
    //Affiche les éléments du panier sur la page
    } else {
        for (let Basket in getLocalStorage) {
            const html = `
                <article class="cart__item" data-id="${getLocalStorage[Basket].idProduit}" data-color="${getLocalStorage[Basket].colorsChoice}">
                    <div class="cart__item__img">
                        <img src="${getLocalStorage[Basket].productImg}" alt="${getLocalStorage[Basket].productImgAlt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${getLocalStorage[Basket].productName}</h2>
                            <p>${getLocalStorage[Basket].colorsChoice}</p>
                            <p>${getLocalStorage[Basket].productPrice} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${getLocalStorage[Basket].productNumber}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article> `;
                positionEmptyCart.insertAdjacentHTML("beforeend", html)
        }
    }
    deleteItem()
    modifyQuantityItem()
}
getCart()

//Suppression du produit
function deleteItem() {
    let deleteItemBtn = document.getElementsByClassName("deleteItem");

    //Boucle pour appliquer la commande à tous les boutons supprimer
    for (let i = 0; i < deleteItemBtn.length; i++){
        deleteItemBtn[i].addEventListener("click", (stop) => {
            stop.preventDefault();
            let idDelete = getLocalStorage[i].idProduit;
            let colorDelete = getLocalStorage[i].colorsChoice;
            getLocalStorage = getLocalStorage.filter(p => p.idProduit != idDelete || p.colorsChoice != colorDelete)
            localStorage.setItem("Basket", JSON.stringify(getLocalStorage));
            location.reload()
            console.log('Ok')
        })
    }
}
//Modification quantité produit 
function modifyQuantityItem() {
    let modifyQuantityItemBtn = document.getElementsByClassName('itemQuantity');

    //Boucle pour appliquer la commande à tous les boutons modifier la quantité
    for (let i = 0; i < modifyQuantityItemBtn.length; i++){
        modifyQuantityItemBtn[i].addEventListener("change", (stop) => {
            stop.preventDefault();
            let modifyQuantity = getLocalStorage[i].productNumber;
            let newQuantity = modifyQuantityItemBtn[i].valueAsNumber;
            let resultFind = getLocalStorage.find((i) => i.newQuantity != modifyQuantity);
            resultFind.productNumber = newQuantity;
            getLocalStorage[i].productNumber = resultFind.productNumber
            localStorage.setItem("Basket", JSON.stringify(getLocalStorage));
            location.reload();
            console.log('Ok')
        }
    )}
}


//Récup quantité de tous les produits
let itemQuantity = document.getElementsByClassName('itemQuantity')
let itemQuantityLength = itemQuantity.length;
totalQuantity = 0;

//Pour chaque produit prend la quantité produit et additione le tout
for (let i = 0; i < itemQuantityLength; i++) {
    totalQuantity += itemQuantity[i].valueAsNumber;
}
let allProductTotalQuantity = document.getElementById('totalQuantity');
allProductTotalQuantity.innerHTML = totalQuantity;


//Récup prix de tous les produits
totalPrice= 0;

//Pour chaque produit prend la quantité produit et multiplie par le prix
for (let i = 0; i < itemQuantityLength; i++) {
    totalPrice += (itemQuantity[i].valueAsNumber * getLocalStorage[i].productPrice);
}
let allProductTotalPrice = document.getElementById('totalPrice');
allProductTotalPrice.innerHTML = totalPrice;


let buttonGetForm = document.getElementById("order");


//Au clic on vérifie si le panier n'est pas vide
//Si il y a au moins un article on enregistre les données du formulaire sur le local storage
buttonGetForm.addEventListener("click", () => {

    //Définir les éléments du formulaire dans le dom
    let inputName = document.getElementById('firstName').value;
    let inputLastName = document.getElementById('lastName').value;
    let inputAdress = document.getElementById('address').value;
    let inputCity = document.getElementById('city').value;
    let inputMail = document.getElementById('email').value;

    //Vérification validation du formulaire
    if(positionEmptyCart.innerHTML === emptyCart){
        window.stop();
        window.alert("Vous n'avez aucun article dans le panier")
     }else{    
        let formContent = {
                firstName : inputName,
                lastName : inputLastName,
                address : inputAdress,
                city : inputCity,
                email : inputMail,
            }
        if( /^[a-z ,.'-]+$/i.test(formContent.firstName) &&
            /^[a-z ,.'-]+$/i.test(formContent.lastName) &&
            /^[a-z ,.'-]+$/i.test(formContent.city) &&
            /^[A-Za-z0-9'\.\-\s\,]+$/i.test(formContent.address) &&
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i.test(formContent.email)
            ){
            console.log("Ok")        
            console.log(formContent)
            let basket = new Basket();
            basket.add(formContent)
            const promise = fetch ("https://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify(formContent),
                headers: {
                    "Content-Type" : "application/json",
                },
            });
            console.log(promise)

        }else{
            window.stop();
            window.alert("Veuillez correctement remplir le formulaire")
        };
    
    }
})
////////////////////////////////////////////////////////////
let inputName = document.getElementById('firstName').value;
let inputLastName = document.getElementById('lastName').value;
let inputAdress = document.getElementById('address').value;
let inputCity = document.getElementById('city').value;
let inputMail = document.getElementById('email').value;

let formContent = {
    firstName : inputName,
    lastName : inputLastName,
    address : inputAdress,
    city : inputCity,
    email : inputMail,
}
const promise = fetch ("https://localhost:3000/api/products/order", {
    method: "POST",    
    headers: {
        Accept: "application/json",
        "Content-Type" : "application/json",
    },
    body: JSON.stringify({
        formContent: {
            firstName: inputName,
            lastName: inputLastName,
            address: inputAdress,
            city: inputCity,
            email: inputMail,
        }
    }),

});    
let data = promise.json;
console.log(promise)
///////////////////////////////////////////////////////////
//Programme orientée objet qui permet de créé et récupérer un conteneur sur le Local Storage
class Basket{
    constructor(){
        let basket = localStorage.getItem("Form Info");
        if(basket == null){
            this.basket = [];
        }else{
            this.basket = JSON.parse(basket);
        }
    }
    save() {
        localStorage.setItem("Form Info", JSON.stringify(this.basket));
    }
    add(product){
        this.basket.push(product);
        this.save();
    }
}
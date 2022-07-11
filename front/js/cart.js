let getLocalStorage = JSON.parse(localStorage.getItem("Basket"));
console.table(getLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");
//Récupérer les éléments du formulaire
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const adress = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const submitBtn = document.getElementById("order");

function getCart(){
    if (getLocalStorage === null || getLocalStorage == 0) {
        const emptyCart = `<p>Aucun article dans le panier</p>`;
        positionEmptyCart.innerHTML = emptyCart;
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

//Suppression produit
function deleteItem() {
    let deleteItemBtn = document.getElementsByClassName("deleteItem");

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
//Quantité produit 
function modifyQuantityItem() {
    let modifyQuantityItemBtn = document.getElementsByClassName('itemQuantity');

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
        }
    )}
}
//Récup quantité
let itemQuantity = document.getElementsByClassName('itemQuantity')
let itemQuantityLength = itemQuantity.length;

totalQuantity = 0;

for (let i = 0; i < itemQuantityLength; i++) {
    totalQuantity += itemQuantity[i].valueAsNumber;
}

let allProductTotalQuantity = document.getElementById('totalQuantity');
allProductTotalQuantity.innerHTML = totalQuantity;
//Récup prix
totalPrice= 0;

for (let i = 0; i < itemQuantityLength; i++) {
    totalPrice += (itemQuantity[i].valueAsNumber * getLocalStorage[i].productPrice);
}

let allProductTotalPrice = document.getElementById('totalPrice');
allProductTotalPrice.innerHTML = totalPrice;

let buttonGetForm = document.getElementById("order")

let inputName = document.getElementById('firstName');
let inputLastName = document.getElementById('lastName');
let inputAdress = document.getElementById('address');
let inputCity = document.getElementById('city');
let inputMail = document.getElementById('email');

buttonGetForm.addEventListener("click", () => {
    //Récupérer les données du formulaire

    let formContent = {
        inputNameV : inputName.value,
        inputLastNameV : inputLastName.value,
        inputAdressV : inputAdress.value,
        inputCityV : inputCity.value,
        inputMailV : inputMail.value
    }
 
    localStorage.setItem("Form", JSON.stringify(formContent));
    const options = {
        method: 'POST',
        body: JSON.stringify(formContent),
        headers: {
            'Accept': 'application/json', 
            "Content-Type": "application/json" 
        },
    }
    fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);

        document.location.href = "confirmation.html";
    })
    .catch((err) => {
        alert ("Problème avec fetch : " + err.message);
    });
})


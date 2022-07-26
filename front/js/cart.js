//*********TOUS LES COMMENTAIRES DECRIVENT LE CODE EN DESSOUS D'EUX*********//
//Vérifier que les données ont bien été récupérées
let getLocalStorage = JSON.parse(localStorage.getItem("Basket"));
let modifyQuantityItemBtn = document.getElementsByClassName('itemQuantity');
//Appel de l'API et récupération des données, erreur en cas d'echec de la requete
fetch('http://localhost:3000/api/products')
.then(function (response) {
    return response.json();
})
.then(function (data) {
    getItemCart(data);
    deleteItem(data);
    modifyQuantityItem(data);
})
.catch(function (error) {
    console.log('Pas de liaison effectué', error);
})
console.table(getLocalStorage);
//Variables utilisées pour séléctioner le panier dans le DOM
const positionEmptyCart = document.querySelector("#cart__items");
const emptyCart = `<p>Aucun article dans le panier</p>`;
//Vérifier si le panier à un article et en afficher les éléments 
//Affiche les éléments du panier sur la page
function getCart(){   
    //Affiche un message si le panier est vide
    if (getLocalStorage === null || getLocalStorage == 0) {
        positionEmptyCart.innerHTML = emptyCart;  
    //Affiche les éléments du panier sur la page
    } else {
        getItemCart(data);    
    }
    deleteItem(data);
    modifyQuantityItem(data);
}
getCart();
//Implémenter les éléments récupérés de la page 'produit' dans le DOM
//Le prix vient directement de l'API pour des raisons de sécurité
function getItemCart(data) {
    for (let i = 0; i < data.length; i++) {
        let dataPriceAll = data[i]._id
        for (let Basket in getLocalStorage) {
            if(getLocalStorage[Basket].idProduct === dataPriceAll){
                console.log(data)
                    const html = `
                        <article class="cart__item" data-id="${dataPriceAll}" data-color="${getLocalStorage[Basket].colorsChoice}">
                            <div class="cart__item__img">
                                <img src="${getLocalStorage[Basket].productImg}" alt="${getLocalStorage[Basket].productImgAlt}">
                            </div>
                            <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${getLocalStorage[Basket].productName}</h2>
                                    <p>${getLocalStorage[Basket].colorsChoice}</p>
                                    <p>${data[i].price * getLocalStorage[Basket].productNumber} €</p>
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
                    positionEmptyCart.insertAdjacentHTML("beforeend", html);
                    //Récupère quantité de tous les produits
                    let itemQuantity = document.getElementsByClassName('itemQuantity');
                    let itemQuantityLength = itemQuantity.length;
                    totalQuantity = 0;
                    //Pour chaque produit prend la quantité produit et additione le tout
                    for (let i = 0; i < itemQuantityLength; i++) {
                        totalQuantity += itemQuantity[i].valueAsNumber;
                    }
                    let allProductTotalQuantity = document.getElementById('totalQuantity');
                    allProductTotalQuantity.innerHTML = totalQuantity;
                    //Récupère le prix de tous les produits
                    totalPrice= 0;
                    //Pour chaque produit prend la quantité produit et multiplie par le prix
                    for (let i = 0; i < itemQuantityLength; i++) {
                        totalPrice += (itemQuantity[i].valueAsNumber * data[i].price);
                    }
                    let allProductTotalPrice = document.getElementById('totalPrice');
                    allProductTotalPrice.innerHTML = totalPrice;  
                }else{
                    console.log("Pas trouvé")
                }
        }
    }
}

//Suppression du produit
function deleteItem(data){
    //Boucle pour appliquer la commande à tous les boutons supprimer
    let deleteItemBtn = document.getElementsByClassName("deleteItem");
    for (let e = 0; e < deleteItemBtn.length; e++){
        deleteItemBtn[e].addEventListener("click", (stop) => {
            stop.preventDefault();
            let idDelete = getLocalStorage[e].idProduct;
            let colorDelete = getLocalStorage[e].colorsChoice;
            getLocalStorage = getLocalStorage.filter(p => p.idProduct != idDelete || p.colorsChoice != colorDelete);
            localStorage.setItem("Basket", JSON.stringify(getLocalStorage));
            location.reload();
        })
    
    }
}
//Modification quantité produit 
function modifyQuantityItem(data) {
    //Boucle pour appliquer la commande à tous les boutons modifier la quantité
    for (let i = 0; i < modifyQuantityItemBtn.length; i++){
        modifyQuantityItemBtn[i].addEventListener("change", (stop) => {
            stop.preventDefault();
            let modifyQuantity = getLocalStorage[i].productNumber;
            let newQuantity = modifyQuantityItemBtn[i].valueAsNumber;
            let resultFind = getLocalStorage.find((i) => i.newQuantity != modifyQuantity);
            resultFind.productNumber = newQuantity;
            getLocalStorage[i].productNumber = resultFind.productNumber;
            localStorage.setItem("Basket", JSON.stringify(getLocalStorage));
            location.reload();
        }
    )}
}
let buttonGetForm = document.getElementById("order");
//Au clic on vérifie si le panier n'est pas vide
//Si il y a au moins un article, on enregistre les données du formulaire sur le local storage
buttonGetForm.addEventListener("click", (e) => { 
    e.preventDefault()
    //Définir les éléments du formulaire dans le dom
    let inputName = document.getElementById('firstName').value;
    let inputLastName = document.getElementById('lastName').value;
    let inputAdress = document.getElementById('address').value;
    let inputCity = document.getElementById('city').value;
    let inputMail = document.getElementById('email').value;
    //Vérification validation du formulaire
    if(positionEmptyCart.innerHTML === emptyCart){
        window.alert("Vous n'avez aucun article dans le panier");
     }else{    
        let formContent = {
                firstName : inputName,
                lastName : inputLastName,
                address : inputAdress,
                city : inputCity,
                email : inputMail,
            }
        //Vérification données envoyées avec RegEx
        //Ajout des données du formulaire dans le Local storage et execution de la fonction sendOrder
        if( /^[a-z ,.'-]+$/i.test(formContent.firstName) &&
            /^[a-z ,.'-]+$/i.test(formContent.lastName) &&
            /^[a-z ,.'-]+$/i.test(formContent.city) &&
            /^[A-Za-z0-9'\.\-\s\,]+$/i.test(formContent.address) &&
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i.test(formContent.email))
            {
            console.log("Ok");       
            console.log(formContent);
            localStorage.setItem("Form Info", JSON.stringify(formContent));
            sendOrder();
        }else{
            window.alert("Veuillez correctement remplir le formulaire")
        };
    }
})
//Envoie du formulaire et récupération de la réponse de l'API
function sendOrder(){
    let inputName = document.getElementById('firstName').value;
    let inputLastName = document.getElementById('lastName').value;
    let inputAdress = document.getElementById('address').value;
    let inputCity = document.getElementById('city').value;
    let inputMail = document.getElementById('email').value;
    //Récupération de tous les Id produits dans le local storage
    let productIdValues = getLocalStorage.map((item) => item.idProduct);  
    //Execution du paramètre POST de l'API 
    fetch ("http://localhost:3000/api/products/order", {
        method: "POST",    
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
        },        
        body: JSON.stringify({
            contact: {
              firstName: inputName,
              lastName: inputLastName,
              address: inputAdress,
              city: inputCity,
              email: inputMail,
            },
            products: productIdValues,
        })
    })
    .then(function (response) {
        return response.json()
    })
    //Local storage vidé et redirection vers la page confirmation
    .then(function (data) {
        console.log(data)
        localStorage.clear();
        document.location.href = `confirmation.html?id=${data.orderId}`;
    })
    .catch(function (error) {
        console.log('Pas de liaison effectué', error)
    })
}
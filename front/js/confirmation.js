//*********TOUT LES COMMENTAIRES DECRIVENT LE CODE EN DESSOUS D'EUX*********//
//On vient récupérer l'ID de la commande présent dans le lien de la page et l'insérer dans le HTML
let newUrl = new URL(window.location.href);
let idProduct = newUrl.searchParams.get("id");
document.getElementById('orderId').innerText = idProduct
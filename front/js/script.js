//*********TOUs LES COMMENTAIRES DECRIVENT LE CODE EN DESSOUS D'EUX*********//
//Appel de l'API et récupération des données, erreur en cas d'echec de la requete
fetch('http://localhost:3000/api/products')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        sofa(data);
    })
    .catch(function (error) {
        console.log('Pas de liaison effectué', error);
    })
//Récupération et implémentation des données de l'API dans le DOM
function sofa(data) {
  console.log(sofa);
  // Boucle qui permet d'implémenter toutes les données produits de l'API
  for (let i = 0; i < data.length; i++) {
    const html = `
    <section id="items">
      <a href="product.html?id=${data[i]._id}"> 
        <article>
          <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
          <h3 class="productName">${data[i].name}</h3>
          <p class="productDescription">${data[i].description}</p>
        </article>
      </a> 
    </section>`;
    const allSofa = document.getElementById("items");
    allSofa.insertAdjacentHTML("beforeend", html);
  }
}
//Appel de l'API et récupération des données
fetch('http://localhost:3000/api/products')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        sofa (data)
    })
    .catch(function (error) {
        console.log('Pas de liaison effectué', error)
    })

//Boucle permettant de récupérer puis de modifier les données dans le HTML
const allSofa = document.getElementById("items")
const sofa = function (data) {
  console.log(data);
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
    allSofa.insertAdjacentHTML("beforeend", html)
  }
  
}

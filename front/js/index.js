
//Recupération des données de l'API
function requeteApi() {
    fetch("http://localhost:3000/api/products")
     .then(response => response.json())
     .then(data => {
       console.log(data);
       let affichage = "";
   //Parcours de la réponse émise par l'API
       for(let produit of data) {
           affichage += `<a href="./product.html?id=${produit._id}">
                          <article>
                           <img src="${produit.imageUrl}" alt="${produit.altTxt}">     
                           <h3 class="productName">${produit.name}</h3>
                           <p class="productDescription">${produit.description}</p>
                          </article>
                         </a>`;
       }
   //Affichage dynamique des produits 
      document.getElementById("items").innerHTML = affichage;
     })
    .catch(erreur => alert("Une erreur est survenue"));
   }
   requeteApi();
   
   
   
   
   
   
     
   
      
      
   
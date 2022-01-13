
//Récupération des paramètres d'URL
const url = new URL(window.location.href);
//Récupération de l'id du produit
const requeteId = url.searchParams.get("id");
console.log(requeteId);


//Récupération des détails du produit depuis l'API
    fetch(`http://localhost:3000/api/products/${requeteId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
//Ajout des détails dans la page produit
        function ajoutProduit() {
          const image = document.querySelector(".item__img").innerHTML = `<img  id="image" src="${data.imageUrl}" alt="${data.altTxt}">`;
          const titre =  document.getElementById("title").innerHTML = `<h1 id="title">${data.name}</h1>`;
          const prix = document.getElementById("price").innerHTML = `<span id="price">${data.price}</span>`;
          const description = document.getElementById("description").innerHTML = `<p id="description">${data.description}</p>`; 
          const couleurs = data.colors;
//Boucle pour parcourir les differentes couleurs
        function ajoutCouleurs() {
          for(let couleur of couleurs) {
            document.getElementById("colors").innerHTML += `<option value="${couleur}">${couleur}</option>`;
          }
        }
        ajoutCouleurs();
      }   
ajoutProduit();
});   

//Ecoute de l'evenement au clic du bouton
const ajoutPanier = document.getElementById("addToCart");
ajoutPanier.addEventListener("click", (event)=> {
 event.preventDefault();

//Création d'un objet à ajouter au panier
const quantite = document.getElementById("quantity").value;
const choixCouleur = document.getElementById("colors").value;
const image = document.getElementById("image").src;
const titre = document.getElementById("title").textContent;
const prix = document.getElementById("price").textContent;

let produitsPanier = {
   id: requeteId,
   quantité: quantite,
   couleur: choixCouleur,
   img: image,
   nom: titre,
   prix: prix
};

//Local storage
//Initialisation du local storage
 let ajoutProduitStorage = JSON.parse(localStorage.getItem("articles"));

//Fenetre de confirmation
let fenetreConfirmation = () => {
  if(window.confirm("Votre article a été ajouté au panier, pour consulter votre panier cliquer sur OK")) {
    window.location.href ="cart.html";
  }
}
//Il y a des articles dans le panier
 if(ajoutProduitStorage) {
   let panierTrouvé = ajoutProduitStorage.find((article) => article.id === requeteId && article.couleur === choixCouleur);
//Incrémentation de la quantité du meme produit dans le panier
   if(panierTrouvé) {
     panierTrouvé.quantité = parseInt(produitsPanier.quantité) + parseInt(panierTrouvé.quantité);
   }
//Le produit commandé n'est pas deja présent dans le panier
   else {
   ajoutProduitStorage.push(produitsPanier);
   }
   localStorage.setItem("articles", JSON.stringify(ajoutProduitStorage));
   fenetreConfirmation();
 } 
 //le panier est vide
 else {
   ajoutProduitStorage = [];
   ajoutProduitStorage.push(produitsPanier);
   localStorage.setItem("articles", JSON.stringify(ajoutProduitStorage));
   fenetreConfirmation();
 }
});
  


 
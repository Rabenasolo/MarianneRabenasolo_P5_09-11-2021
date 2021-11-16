var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let produit = "";

const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");



// Récupération des produits de l'API
function getProduit() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'API insérer dans product
    .then(async function (resultatAPI) {
        produit = await resultatAPI;
        console.table(produit);
        if (produit){
            getPost(produit);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}
    
function getPost(produit){
    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = produit.imageUrl;
    productImg.alt = produit.altTxt;

    // Modification du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = produit.name;

    // Modification du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML =produit.price;

    // Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = produit.description;

    // Insertion des options de couleurs
    for (let colors of produit.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(produit);
}

//Gestion du panier
function addToCart(produit) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

    //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    btn_envoyerPanier.addEventListener("click", (event)=>{
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

    //Recupération du choix de la couleur
    let choixCouleur = colorPicked.value;
                
    //Recupération du choix de la quantité
    let choixQuantite = quantityPicked.value;

    //Récupération des options du produit à ajouter au panier
    let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: produit.name,
        prixProduit: produit.price,
        descriptionProduit: produit.description,
        imgProduit: produit.imageUrl,
        altImgProduit: produit.altTxt
    };

    //Initialisation du local storage
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

    //fenêtre pop-up
    const popupConfirmation =() =>{
        if(window.confirm(`Votre commande de ${choixQuantite} ${produit.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

    //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 produit
    if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
            let newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        //Si le produit commandé n'est pas dans le panier
        } else {
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        }
    //Si le panier est vide
    } else {
        produitLocalStorage =[];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
    }}
    });
}

getProduit();
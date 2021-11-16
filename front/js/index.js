// Récupération des Produits de l'API
async function getProduits() {
    const listProduits = await fetch("http://localhost:3000/api/products")
    return await listProduits.json();
}

    // Répartition des données de l'API insérer dans index

async function fetchListProduits() {
    var result = await getProduits()
    .then(function (resultatAPI){
        const produits = resultatAPI;
        console.log(produits);
        for (let produit in produits) {

            // Insertion de l'élément "a"
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${resultatAPI[produit]._id}`;

            // Insertion de l'élément "produit"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'image
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = resultatAPI[produit].imageUrl;
            productImg.alt = resultatAPI[produit].altTxt;

            // Insertion du titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = resultatAPI[produit].name;

            // Insertion du "price"
            let productPrice = document.createElement("price");
            productArticle.appendChild(productPrice);
            productPrice.classList.add("productPrice");
            productPrice.innerHTML ="Prix :" + resultatAPI[produit].price +" €";
         

            // Insertion de la description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = resultatAPI[produit].description;
        }
    })
    .catch (function(error){
        return error;
    });
}

fetchListProduits();
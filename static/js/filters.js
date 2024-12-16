

// Chargement dynamique des genres avec cases carrées
async function loadGenres() {
    const response = await fetch("/api/genres");
    const data = await response.json();
    const genresMenu = document.getElementById("genresMenu");

    data.genres.forEach(genre => {
        const div = document.createElement("div");
        div.className = "col-6 col-md-3"; // Ajuste selon la largeur souhaitée
        div.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="genre_${genre}" name="genres_filter" value="${genre}">
                <label class="form-check-label" for="genre_${genre}">${genre}</label>
            </div>
        `;
        genresMenu.appendChild(div);
    });
}


async function loadFilmTitles() {
    try {
        const response = await fetch("/api/film-titles");
        const data = await response.json();
        const dataList = document.getElementById("filmList");

        data.titles.forEach(title => {
            const option = document.createElement("option");
            option.value = title;
            dataList.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des titres :", error);
    }
}


// Fonction pour charger dynamiquement les décennies
async function loadDecades() {
    const response = await fetch("/api/decades");
    const data = await response.json();
    const decadesMenu = document.getElementById("decadesMenu");
    decadesMenu.innerHTML = ""; // Nettoyer le conteneur avant d'ajouter des décennies
    data.decades.forEach(decade => {
        const div = document.createElement("div");
        div.className = "form-check form-check-inline";
        div.innerHTML = `
            <input class="form-check-input" type="checkbox" id="decade_${decade}" name="year_range_filter" value="${decade}">
            <label class="form-check-label" for="decade_${decade}">${decade}s</label>
        `;
        decadesMenu.appendChild(div);
    });
}

 // Chargement dynamique des collections (avec recherche)
//  async function loadCollections() {
//     const response = await fetch("/api/collections");
//     const data = await response.json();
//     const collectionsList = document.getElementById("collectionsList");
//     const searchBox = document.getElementById("collectionsSearch");

//     // Fonction pour filtrer les collections
//     function filterCollections(query) {
//         collectionsList.innerHTML = "";
//         const filtered = data.collections.filter(c => c.toLowerCase().includes(query.toLowerCase()));
//         filtered.forEach(collection => {
//             const div = document.createElement("div");
//             div.className = "form-check";
//             div.innerHTML = `
//                 <input class="form-check-input" type="checkbox" id="collection_${collection}" name="collections_filter" value="${collection}">
//                 <label class="form-check-label" for="collection_${collection}">${collection}</label>
//             `;
//             collectionsList.appendChild(div);
//         });
//     }
//     // Initialisation
//     searchBox.addEventListener("input", (e) => filterCollections(e.target.value));
//     filterCollections("");
// }

// Chargement dynamique des collections avec suggestions dans une datalist
async function loadCollections() {
    const response = await fetch("/api/collections");
    const data = await response.json();
    const collectionsList = document.getElementById("collectionsList");

    // Nettoyer la liste avant d'ajouter de nouvelles suggestions
    collectionsList.innerHTML = "";

    // Parcourir les données et parser les objets et print le nom de la collection sur le terminal
    data.collections.forEach(collection => {
        try {
            const parsedCollection = JSON.parse(collection); // Parser la chaîne en objet
            print(parsedCollection);
            if (parsedCollection.name) { // Extraire uniquement le champ 'name'

                const option = document.createElement("option");
                option.value = parsedCollection.name; // Utiliser le nom de la collection
                print(parsedCollection.name);
                collectionsList.appendChild(option);
            }
        } catch (error) {
            console.error("Erreur lors du parsing des collections :", error);
        }
    });
}





// Afficher/Masquer le conteneur des filtres
function toggleFilters() {
    const filterContainer = document.getElementById("filterContainer");
    filterContainer.style.display = filterContainer.style.display === "none" ? "block" : "none";
}

// Fonction pour afficher/masquer un menu spécifique
function toggleFilterMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "flex"; // Affiche les options sous forme de grille
    } else {
        menu.style.display = "none"; // Cache les options
    }
}


// Appeler les fonctions de chargement au démarrage
window.onload = function () {
    loadGenres();
    loadDecades();
    loadFilmTitles();
    loadCollections();
};

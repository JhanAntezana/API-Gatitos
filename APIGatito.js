const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=7&api_key=8a2b70f9-9790-4ca9-a19c-6272395402b0';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=8a2b70f9-9790-4ca9-a19c-6272395402b0';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=8a2b70f9-9790-4ca9-a19c-6272395402b0`;

const spanError = document.getElementById('error');

async function reloadRandomCats(){
    let response = await fetch(API_URL_RANDOM);
    let data = await response.json();

    if(response.status !== 200){
        spanError.innerHTML = "Hubo un error: "+ response.status;
    }else{
        let element = document.getElementById('container_gatitos_random');
        element.innerHTML = "";
        data.forEach((cat, index) => {
            
            element.innerHTML += `
            <article class="card">
                <img id="imagen${index+1}" src="${cat.url}" class="card_img" alt="Foto de gatitos aleatorios">
                <button id="btn${index + 1}" onclick = "addToFavorites('${cat.id}')" class="card_button">Agregar a favoritos</button> 
            </article>`;
        });
    }
}

reloadRandomCats();
/*MI INTENTO
let gatitosFavoritos=[{
        "breeds": [],
        "categories": [
            {
                "id": 1,
                "name": "hats"
            }
        ],
        "id": "37b",
        "url": "https://cdn2.thecatapi.com/images/37b.gif",
        "width": 500,
        "height": 281
}]
function addToFavorites(element){
    //gatitosFavoritos.push(element);
   // console.log(element);
    gatitosFavoritos.forEach((gatito, index) => {
        let img = document.getElementById('favorites');
        img.innerHTML += `
            <section class="card">
                <img src="${gatito.url}" id="imagen${index+1}" class="card_img" alt="Foto de gatitos aleatorios">
                <button class="card_button" onclick="removeFromFavorites()">Remove from favorites</button>  
            </section>
        `;
        
    });
}*/
async function reloadFavoriteCats(){
    let response = await fetch(API_URL_FAVORITES);
    let data = await response.json();
    console.log(data);
    if(response.status !== 200){
        spanError.innerHTML = 'Hubo un error '+response.status + data.mesange;
    }else{
        const section = document.getElementById('favorites');
        section.innerHTML = "";
        data.forEach(cat => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const button = document.createElement('button');
            const buttonText = document.createTextNode('Quitar de favoritos');

            button.className = 'card_button';//<button class="card_button"></button> 
            button.onclick = () => removeFromFavorites(cat.id);//<button class="card_button" onclick="removeFromFavorites()"</button> 
            button.appendChild(buttonText);//<button class="card_button" onclick="addToFavorites()">Agregar a favoritos</button> 
            img.src = cat.image.url;//<img src="${cat.image.url}">
            img.className = 'card_img';//<img src="${cat.image.url}" class="card_img">
            article.className = 'card';
            article.appendChild(img);
            article.appendChild(button);
            section.appendChild(article);

        });
    }
}
reloadFavoriteCats();

async function addToFavorites(id){
    console.log('save')
    const response = await fetch(API_URL_FAVORITES,{//el segundo parametro un objeto que tiene un parametro method por defercto GET
        method: 'POST',
        headers: {'Content-Type': 'application/json'},//le decimos el tipo de respuesta que estamos esperando (especificación de comunicación con el backend)
        body: JSON.stringify({//en body se especifica la informacion que se esta enviando al backend
            image_id: id
        })
    });
    let data = await response.json();
    if(response.status !== 200){
        spanError.innerHTML = 'Hubo un error '+response.status + data.mesange;
    }else{
       reloadFavoriteCats();
    }
}
async function removeFromFavorites(id){
    const response = await fetch(API_URL_FAVORITES_DELETE(id),{
        method: 'DELETE'
    });
    let data = await response.json();
    if(response.status !== 200){
        spanError.innerHTML = 'Hubo un error '+response.status + data.mesange;
    }else{
        console.log('Eliminado');
        reloadFavoriteCats();
    }
}
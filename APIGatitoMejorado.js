const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=7';//modificado (no era necesario para esta operación el API-KEY)
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';//modificaco
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

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

async function reloadFavoriteCats(){
    let response = await fetch(API_URL_FAVORITES,{
        method: 'GET',//agregado
        headers:{//agregado
            'X-API-KEY': '8a2b70f9-9790-4ca9-a19c-6272395402b0'//agregado
        }
    });
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

            button.className = 'card_button';
            button.onclick = () => removeFromFavorites(cat.id); 
            button.appendChild(buttonText);
            img.src = cat.image.url;
            img.className = 'card_img';
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
    const response = await fetch(API_URL_FAVORITES,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': '8a2b70f9-9790-4ca9-a19c-6272395402b0'//agregado
        },
        body: JSON.stringify({
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
        method: 'DELETE',
        headers:{//agragado
            'X-API-KEY': '8a2b70f9-9790-4ca9-a19c-6272395402b0'//agragado
        }
    });
    let data = await response.json();
    if(response.status !== 200){
        spanError.innerHTML = 'Hubo un error '+response.status + data.mesange;
    }else{
        console.log('Eliminado');
        reloadFavoriteCats();
    }
}
//agregado
async function uploadCatPhoto(){
    const form = document.getElementById('uploadCatForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const response = await fetch(API_URL_UPLOAD,{
        method: 'POST',
        headers:{
            //'Content-Type': 'multipart/form-data',
            'X-API-KEY': '8a2b70f9-9790-4ca9-a19c-6272395402b0'
        },
        body:formData
    })
    const data = await response.json();
    if(response.status !== 200){
        spanError.innerHTML = 'Hubo un error '+response.status + data.mesange;
    }else{
        console.log('Foto de gatito subida');
        console.log(data.url);
        addToFavorites(data.id);
    }

}

const previewImage =()=>{
    const file = document.getElementById('file').files;
    console.log(file);
    if(file.length > 0){
        const fileReader = new FileReader();
        fileReader.onload = function (e){
            document.getElementById('preview').setAttribute('src', e.target.result);
        }
        fileReader.readAsDataURL(file[0]);
    }
}
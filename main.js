/*
const URL = 'https://api.thecatapi.com/v1/images/search';

// fetch(URL)
// .then(res => res.json())//comversión de la respuesta en JSON
// .then(data =>{//aca se recibe ya el contenido en si
//     const img = document.querySelector('#iden');
//     img.src = data[0].url;
 
// })
// .catch(error => console.error(error))


async function changeImg(){
    try{
        let res = await fetch(URL);
        let data = await res.json();
        const img = document.querySelector('#iden');
        img.src = data[0].url;
    }catch (e){
        console.error(e);
    }
}
changeImg();
//OTRA FORMA DE ESCUCHAR EL CLICK
// const myButton = document.getElementById('newImg');
// myButton.onclick = changeImg2;*/

//QUERY PARAMETERS
/*const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3';//se agrego query parameters al URL

async function changeImg2(){
    let response = await fetch(API_URL);
    let data = await response.json();
    data.forEach((element, index) => {
        let img = document.querySelector('#imagen'+(index+1));
        img.src = element.url;
    });
    // SIN FOREACH
    // let img1 = document.querySelector('#imagen1');
    // let img2 = document.querySelector('#imagen2');
    // let img3 = document.getElementById('imagen3');//otra forma de obtener la dirección de etiqueta

    // img1.src = data[0].url;
    // img2.src = data[1].url;
    // img3.src = data[2].url;

}

changeImg2();*/

//TRABAJANDO CON API KEY
/*const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=f78c52d7-6f0b-42d9-9723-595d7adfa602';

async function changeImg3(){
    let response = await fetch(API_URL);
    let data = await response.json();
    data.forEach((element, index) => {
        let img = document.querySelector('#imagen'+(index+1));
        img.src = element.url;
    });
}

changeImg3();*/

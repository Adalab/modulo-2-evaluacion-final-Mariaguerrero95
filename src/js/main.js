"use strict";
/*
    PEQUEÑOS PASOS
    PRIMERA PARTE (BUSCAR)
    - Pintar los elementos de mi HTML 
    - Cuando la usuaria haga click en Botón Buscar que me aparezca la lista de series (if)
    - Seleccionar elementos globales para el anterior paso (para guardarlos en variables y constantes):
        - Campo de texto
        - Botón de búsqueda 
        - sección de resultados 
        - Lista de favoritos
    - Recoger los datos de la elección de la usuaria (en caso que haya escrito y pinchado en buscar)
    - Que se muestren en el DOM lo que ha buscado la usuaria
*/

//constantes globales
const searchInput = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-search");
const resultsSection = document.querySelector(".js-container");
const favoriteSeries = document.querySelector(".js-container");

//Creo también una variable global en forma de array de las series
let resultsList = [];
let favoriteSeriesList = [];

//creo una variable global de las series
const getFavorite = localStorage.getItem("favorites")

if(getFavorite !== null){
    resultsList = getFavorite; 

}
//Defino una función para renderizar series, aquí utilizaré document.createElement para crear nuevos elementos en el DOM, cada vez que se llama a esta función para generar nuevos elementos HTML  para mostrar cada serie en el DOM
function renderingSeries (series, resultsSection){
    resultsSection.innerHTML =""; //Pongo comillas vacías para que vacie la sección de resultados
    //A continuación pintaré las series en la página
    for (const serie of series){
        const listOfSeries = document.createElement ("div");
         //Con el id(mal_id lo he conseguido del enlace de la API) con el mal_id identifico cuando la usuaria ha hecho click
        listOfSeries.id = serie.mal_id;
        //Ahora, con el DOM crearé los elementos y subelementos de la lista de series, ya que he dejado vaciado el HTML
        const title = document.createElement("h2");
        const textTitle = document.createTextNode(serie.title);
        title.appendChild(textTitle);
        const cardImg = document.createElement("img");
        cardImg.setAttribute("src", serie.images.jpg.image_url);
        listOfSeries.appendChild(title);
        listOfSeries.appendChild(cardImg);
        resultsSection.appendChild(listOfSeries);
        listOfSeries.addEventListener("click",handleFavoriteSeries);
    }
}
//Para esucchar el click de la usuaria en la serie dependiendo del id que escriba creo una función 

function handleFavoriteSeries (event){
    const idClick = (event.currentTarget.id);
   //console.log("handleFavoriteSeries ejecutada") SE EJECUTA BIEN
   //console.log("ID Clicked:", idClick); FUNCIONA EL CLICK
    //event.currentTarget; event es el objeto que se genera cuando ocurre el click, currentTarget es el elemento HTML en el que ocurrió el evento, es el div que se ha genereado en renderingSeries(la función de arriba)
    //serie.mal_id;database es la propiedad que permite acceder a los atributos personalizados; data es el elemento del HTML(rendering series); con el id me permite acceder al valor, el identificador de la función de arriba renderingSeries.
    const idSerieSelected = resultsList.find ((serie) => {
        return idClick == serie.mal_id;
    });

    //const utilizando .findIndex
    const indexSerieFavorite = favoriteSeriesList.findIndex((favoriteSerie)=>{
        console.log(idClick);
        return idClick == favoriteSerie.mal_id;
    
    //

    
    });
    //Ahora voy a verificar si una serie seleccionada ya está en la lista de series favoritas utilizando .indexOf()
    //const indexSerieFavorite ===


}

//Creo una función flecha donde meteré el fetch (API)
const getApiSeries = () => {
    searchInput.value;
    fetch (`https://api.jikan.moe/v4/anime?q=${searchInput.value}`)
    .then (res => res.json())
    .then (data => {
        resultsList = data.data;
        renderingSeries(resultsList, resultsSection);
        
    })
}
    

//Creo una función manejadora en donde almacenaré los datos del input y para que funcione el click en el botón Buscar
function handleClick(event) {
    event.preventDefault();
    getApiSeries();
}

searchButton.addEventListener("click", handleClick);



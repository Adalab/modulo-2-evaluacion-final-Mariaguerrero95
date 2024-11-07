"use strict";
/*
    PASOS EN HUMANO:

    PRIMERA PARTE, BUSCAR
    - Pintar los elementos de mi HTML 
    - Cuando la usuaria haga click en Botón Buscar que me aparezca la lista de series (if)
    - Seleccionar elementos globales para el anterior paso (para guardarlos en variables y constantes):
        - Campo de texto
        - Botón de búsqueda 
        - sección de resultados 
        - Lista de favoritos
    - Recoger los datos de la elección de la usuaria (en caso que haya escrito y pinchado en buscar)
    - Que se muestren en el DOM lo que ha buscado la usuaria

    SEGUNDA PARTE, FAVORITOS
    - Se cambiaran el color de fondo  y de fuente de la serie seleccionada. se añadirá a favoritos
    - Mostrar la elección favorita de la usuaria en la parte izquierda de la pantalla debajo del formulario de búsqueda.
    - La serie favorita seguirá mostrándose en el DOM aunque la usuaria realice otra búsqueda

    TERCERA PARTE
    - Guardar las selecciones favoritas de la usuaria en el navegador local.
    - Al recargar la pagina se mostrará el listado de favoritos

    CUARTA PARTE (BONUS)
    1ºBONUS (BACKGROUND Y COLOR FAVORITES)
    - En la función "renderingSeries" SI la usuaria añade una serie a favoritos ésta se pondrá de otro color de letra y fondo (IF)

    2ºBONUS (BOTÓN RESET)
    - Crear en mi HTML un boton y darle una clase para css y otra para js
    - Crear constante para botón reset (seleccionar js-reset)
    - Crear una función callback para limpiar los valores de las series favoritas, de la lista y del input
    
*/

//variables globales
const searchInput = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-search");
const resultsSection = document.querySelector(".js-container");
const favoriteSeries = document.querySelector(".js-favorites");

//variable global en forma de array de las series (let porque variará)
let resultsList = [];
let favoriteSeriesList = [];

//Variable global de las series
const getFavorite = localStorage.getItem("favorites")

if(getFavorite !== null){ // Verifico si la variable getFavorite tiene algún valor y no está vacío o nulo.
    favoriteSeriesList = JSON.parse(getFavorite); // Si la condición de if es verdadera (no es null), entonces se ejecuta esta línea / JSON.parse es una función que toma una cadena de texto y lo convierte a objeto
    //console.log("Favoritos recuperados desde localStorage:", favoriteSeriesList);
};

//Defino una función para renderizar series, aquí utilizaré document.createElement para con el DOM crear elementos en mi HTML 
function renderingSeries (series, resultsSection){
    resultsSection.innerHTML =""; //Pongo comillas vacías para que vacie la sección de resultados
    // A continuación pintaré las series en la página
    for (const serie of series){ 
        const listOfSeries = document.createElement ("div");
         // Con el id(mal_id lo he conseguido del enlace de la API) con el mal_id identifico cuando la usuaria ha hecho click
        listOfSeries.id = serie.mal_id;//Accediendo al id del div / serie.mal_id obtiene el valor de esa propiedad de la serie en particular

        //BONUS, verificar su la serie es favorita y aplicarle el estilo de letra y fondo
        const itsFavorite = favoriteSeriesList.some(fav => fav.mal_id === serie.mal_id); // .some recorre un array(lista) y me devuelve true si al menos un elemento del array cumple con una condición que especifiques en la función / fav => función flecha, se ejecuta para cada elemento de favoriteSeriesList
        if (itsFavorite) {
            listOfSeries.style.backgroundColor = "#f3fbe1"; // Color fondo la serie favorita
            listOfSeries.style.color = "rgb(66, 236, 227)"; // Color de texto serie favorita
        }

        // Ahora, con el DOM crearé los elementos y sub-elementos de la lista de series, ya que he dejado vaciado el HTML
        const title = document.createElement("h2");
        const textTitle = document.createTextNode(serie.title);
        title.appendChild(textTitle); //appendChild crea un nuevo elemento al final de la lista de hijos del padre

        const cardImg = document.createElement("img");
        const imageUrl = serie.images?.jpg?.image_url;

        //Ahora, si una serie no tiene imagen le pondré un estilo determinado y si no... (if, else)
        if (!imageUrl || imageUrl === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            // Si la imagen es la predeterminada, usar una imagen de placeholder
            cardImg.setAttribute("src", "https://via.placeholder.com/210x295/ffcc00/666666/?text=Anime");
        } else {
            // Si tiene una imagen válida, usar esa imagen
            cardImg.setAttribute("src", imageUrl);
            // Como no me funciona la imagen, se ve rota en las que no vienen con imagen por defecto, escribo una funcion y meto la imagen
            cardImg.onerror = function() {
                cardImg.setAttribute("src", "https://via.placeholder.com/210x295/ffcc00/666666/?text=Anime");
            }
        }

        // Añadir los elementos creados al contenedor de la serie
        listOfSeries.appendChild(title);
        listOfSeries.appendChild(cardImg);
        
        // Añadir la serie a la sección de resultados
        resultsSection.appendChild(listOfSeries);

         // Añadir el manejador de eventos para el click
        listOfSeries.addEventListener("click",handleFavoriteSeries);
    }
};

// Función manejadora para el click en una serie para agregarla a favoritos
function handleFavoriteSeries (event){
    const idClick = (event.currentTarget.id);
   //console.log("handleFavoriteSeries ejecutada") SE EJECUTA BIEN
   //console.log("ID Clicked:", idClick); FUNCIONA EL CLICK
    //event.currentTarget; event es el objeto que se genera cuando ocurre el click, currentTarget es el elemento HTML en el que ocurrió el evento, es el div que se ha genereado en renderingSeries(la función de arriba)
    //serie.mal_id;database es la propiedad que permite acceder a los atributos personalizados; data es el elemento del HTML(rendering series); con el id me permite acceder al valor, el identificador de la función de arriba renderingSeries.
    const idSerieSelected = resultsList.find ((serie) => {
        return idClick == serie.mal_id;// devuelve algo porque indica a "find" si la serie actual en la iteración es la que estamos buscando.
    });

    //const utilizando .findIndex
    const indexSerieFavorite = favoriteSeriesList.findIndex((favoriteSerie)=>{
        console.log(idClick);
        return idClick == favoriteSerie.mal_id;
    });

    //Ahora voy a verificar ... si una serie seleccionada (if) 
    if (indexSerieFavorite === -1){
        favoriteSeriesList.push(idSerieSelected); //Añade la serie
        localStorage.setItem("favorites", JSON.stringify(favoriteSeriesList));//JSON.stringify lo convierte a texto
        //console.log("Favoritos actualizados", favoriteSeriesList) 
        renderingSeries(favoriteSeriesList, favoriteSeries);
    }
};

// Creo una función flecha para obtener las series desde la API (FETCH)
const getApiSeries = () => {
    searchInput.value;
    fetch (`https://api.jikan.moe/v4/anime?q=${searchInput.value}`)
    .then (res => res.json())
    .then (data => {
        console.log(data);
        resultsList = data.data;
        renderingSeries(resultsList, resultsSection);
        
    })
};

//Creo una función manejadora para manejar el click en el botón de búsqueda
function handleClick(event) {
    event.preventDefault();
    getApiSeries();
};

searchButton.addEventListener("click", handleClick);

//BONUS BOTÓN RESET
//Seleccionar el botón Reset (Variable botón reset)
const resetButton = document.querySelector(".js-reset");
//Creo una función callback para resetear la página
function resetPage(){
    favoriteSeriesList = [];
    //Elimino los favoritos del localStorage
    localStorage.removeItem("favorites");
    //Limpio la sección de resultados y la de favoritos
    resultsSection.innerHTML = "";
    favoriteSeries.innerHTML = "";
    //Limpio el valor del input de búsqueda
    searchInput.value = "";
};
resetButton.addEventListener("click", resetPage);
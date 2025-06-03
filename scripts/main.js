//Variable
const apikey='6631e5f1dc96088e0d26b86da29b5b6a';
let url='';
let filmdetail ='';
let imgUrl="https://image.tmdb.org/t/p/w500";
let idElement='';
let cardInfo='';
//Object
// const swipeHtml=document.querySelector('.swiper-wrapper');
// const buttontHtml=document.querySelector('button');
const wrapperFimlHTML=document.querySelector('.container-bottom');
const buttons=document.querySelector('.buttons');

const closepopupHTML=document.querySelector('.close');
const imagepopuHTML=document.querySelector('.imagedupopup');
const titreserieHTML=document.querySelector('.title-de-la-serie');
const overviewHtml=document.querySelector('.overview');
const popupHTML=document.querySelector('.popup');
const ouvrirpageHTML=document.querySelector('.ouvrirpage');
// const valueInput=document.querySelector('.input-text');
//Function




// dispalay();

displayAll('top_rated');

async function getSeriesByList(list) {
    url=`https://api.themoviedb.org/3/tv/${list}?api_key=${apikey}&language=fr-FR&page=1`;
    try {
        let data=await fetch(url);
        let result = await data.json();
        return result;
    } catch (error) {
        return error;
    }
}

async function displayAll(categoy) {
    localStorage.clear();
    wrapperFimlHTML.innerHTML=``;
    let result = await getSeriesByList(categoy);
    let myrest = result.results;
    let fimlHTML;

    myrest.forEach(serie => {
        const filmdetail = [
            serie.name,        
            `${imgUrl}${serie.poster_path}`,
            serie.popularity,
            serie.overview
        ];
        localStorage.setItem(serie.id, JSON.stringify(filmdetail));
    });
    for(let film of myrest){
        fimlHTML=`
            <div class="card" data-id=${film.id}>
                <h2 class="title">${film.original_name}</h2>
                <img src="${imgUrl}${film.poster_path}" alt="image">
                <div class="popularity"><span>${film.popularity}</span></div>
            </div>
        `;
        wrapperFimlHTML.innerHTML+=fimlHTML;
    }
    
}





buttons.addEventListener('click', (event) => {
    const elementClicked = event.target;

   
    if (elementClicked.tagName !== 'BUTTON') return;

   
    const allButtons = buttons.querySelectorAll('button');
    allButtons.forEach(btn => btn.classList.remove('active'));

   
    elementClicked.classList.add('active');

   
    const nomClasse = elementClicked.className.replace('active', '').trim();

    if (nomClasse) {
        displayAll(nomClasse); 
    }
});


wrapperFimlHTML.addEventListener('click', (event) => {
  const cardElement = event.target.closest('.card');

  if (!cardElement || !wrapperFimlHTML.contains(cardElement)) return;

    idElement = cardElement.dataset.id;
  cardInfo = JSON.parse(localStorage.getItem(idElement));


//   console.log(cardInfo);
  
  if (cardInfo) {
    imagepopuHTML.src = cardInfo[1];
    titreserieHTML.innerHTML = cardInfo[0];
    overviewHtml.innerHTML = cardInfo[3];
    popupHTML.style.display='flex';
  }
});


closepopupHTML.addEventListener('click',(event)=>{
    event.preventDefault();
    popupHTML.style.display='none';
});


// ouvrirpageHTML.addEventListener('click', (event) => {
// //cardInfo
//   console.log(cardInfo);
//   console.log(idElement);
  
//   if (cardInfo) {
//     imagepopuHTML.src = cardInfo[1];
//     titreserieHTML.innerHTML = cardInfo[0];
//     overviewHtml.innerHTML = cardInfo[3];
//     popupHTML.style.display='flex';
//   }
// });

ouvrirpageHTML.addEventListener('click', (event) => {
  event.preventDefault();

  if (idElement && cardInfo) {
    // je stocke l'ID actif
    localStorage.setItem('selectedId', idElement);
    
    // j'ouvre la nouvelle page
    window.location.href = '../serieinfo.html';
  }
});

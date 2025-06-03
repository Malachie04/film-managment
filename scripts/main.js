//Variable
const apikey='6631e5f1dc96088e0d26b86da29b5b6a';
let url='';
let filmdetail ='';
//Object
// const swipeHtml=document.querySelector('.swiper-wrapper');
// const buttontHtml=document.querySelector('button');

// const valueInput=document.querySelector('.input-text');
//Function



const getFilmyTitle=async (title)=>{
    const apikey='6631e5f1dc96088e0d26b86da29b5b6a';
    url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&include_adult=false&language=en-US&page=1&api_key=${apikey}`;
    try {
        let data=await fetch(url);
        let result = await data.json();
        return(result)
    } catch (error) {
        return error;
    }
}




async function  dispalay(titre){
    myrest= await getFilmyTitle(titre);
    let res =myrest.results

    swipeHtml.innerHTML=``;
    console.log(res);
    for(let film of res){
        let titre=film.original_title
        let image='';
        if(film.poster_path)
        image=`https://image.tmdb.org/t/p/w500${film.poster_path}`;
        else{
            image=`https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-300x450.jpg`;
        }

       

        let slide=document.createElement('div');
        slide.classList.add('swiper-slide');

        let content=`
            <div class="top">
                <h2 class="title">${titre}</h2>
            </div>
            <div class="bottom">
                <img src="${image}" alt="">
            </div>
        `;

        slide.innerHTML=content;

        swipeHtml.append(slide)
        

    }
}



// dispalay();


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




async function displayAllTry(){
    let result=await getSeriesByList('popular');
    let myrest=result.results;


    filmdetail=[myrest.original_title,myrest.poster_path,myrest.popularity]

    localStorage.setItem(myrest.id,JSON.stringify(filmdetail));

    console.log(myrest);
    
}


async function displayAll() {
    localStorage.clear();
    let result = await getSeriesByList('top_rated');
    let myrest = result.results;

    myrest.forEach(serie => {
        const filmdetail = [
            serie.name,          // ou serie.original_name
            `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
            serie.popularity,
            serie.overview
        ];
        localStorage.setItem(serie.id, JSON.stringify(filmdetail));
    });

    console.log(myrest);
}


// displayAll();
//Variable
const apikey='6631e5f1dc96088e0d26b86da29b5b6a';
let url='';
let filmdetail ='';
let imgUrl="https://image.tmdb.org/t/p/w500";
let idElement='';
let cardInfo='';
let currentPage=1;
let currentCategorie='top_rated';
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
const nextAndprevHTML=document.querySelector('.nextPrev');
const paginationHTML=document.querySelector('.pageDetail');
// const valueInput=document.querySelector('.input-text');
//Function


// async function getSeriey(list) {
//     url=`https://api.themoviedb.org/3/tv/${list}?api_key=${apikey}`;
//     try {
//         let data=await fetch(url);
//         let result = await data.json();
//         console.log(result);
//     } catch (error) {
//         console(error);
//     }
// }

// getSeriey('top_rated');

// dispalay();

displayAll(currentCategorie);

async function getSeriesByList(list,page) {
    url=`https://api.themoviedb.org/3/tv/${list}?api_key=${apikey}&language=fr-FR&page=${page}`;
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
    let result = await getSeriesByList(categoy,currentPage);
    let myrest = result.results;
    let fimlHTML;

    console.log(myrest);
    
    paginationHTML.innerHTML=`Page ${result.page} sur ${result.total_pages}`;
    // console.log(result.total_pages);
    

    myrest.forEach(serie => {
        const filmdetail = [
            serie.name,        
            `${imgUrl}${serie.poster_path}`,
            serie.popularity,
            serie.overview,
            serie.first_air_date,
        ];
        localStorage.setItem(serie.id, JSON.stringify(filmdetail));
    });
    for(let film of myrest){
        fimlHTML=`
            <div class="card" data-id=${film.id}>
                <h2 class="title">${film.name}</h2>
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

    currentCategorie=nomClasse;
    currentPage=1;
    if (nomClasse) {
        displayAll(currentCategorie); 
    }
});

nextAndprevHTML.addEventListener('click', (event) => {
    event.preventDefault();
    const clickedButton = event.target.closest('button'); 

    if (!clickedButton) return;

    if (clickedButton.classList.contains('next')) {
        currentPage++;
    } else if (clickedButton.classList.contains('previous')) {
        if (currentPage > 1) {
            currentPage--;
        }
    }

    
    // const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.previous');

    if (currentPage <= 1) {
        prevButton.style.opacity = '0';
        prevButton.disabled = true;
    } else {
        prevButton.style.opacity = '1';
        prevButton.disabled = false;
    }

    displayAll(currentCategorie); 
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

// ouvrirpageHTML.addEventListener('click', (event) => {
//   event.preventDefault();

//   if (idElement && cardInfo) {
//     // je stocke l'ID actif
//     localStorage.setItem('selectedId', idElement);
    
//     // j'ouvre la nouvelle page
//     window.location.href = '../serieinfo.html';
//   }
// });



async function envoyerNotificationDiscord(nom, montant) {
    const webhookUrl = `https://discord.com/api/webhooks/1379746306595229816/cHCng6LgPAWFr6l2HUyQOV9Gc0fa4fH519jVnx22bWnkuMDJVRXGgmInwvZSCJUdppsl`;
  
    const payload = {
      content: `💸 ${nom} a simulé un envoi de ${montant} EUR via l'app.`,
      username: "Alpha", // Optionnel : nom affiché dans Discord
      avatar_url: "https://th.bing.com/th/id/OIP.w3pChPezjOrlCa-iq3TyNQHaG6?r=0&rs=1&pid=ImgDetMain" // Optionnel : image du bot
    };
  
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        console.log("✅ Notification envoyée dans Discord !");
      } else {
        console.error("❌ Erreur lors de l'envoi :", response.status);
      }
    } catch (error) {
      console.error("❌ Erreur réseau :", error);
    }
  }
  
  console.log('efds');
//  console.log( envoyerNotificationDiscord('Malachie',50));

async function envoyerMail(nom, emailDestinataire, montant) {


    (function(){
        emailjs.init({
            publicKey: "JJCjd3YGNXc93dVUw",
        });
    })();

    const templateParams = {
      nom_utilisateur: nom,
      email: emailDestinataire,
      montant_envoye: montant
    };
  
    try {
      const response = await emailjs.send('service_gmail', 'template_transfer', templateParams);
      console.log('✅ Email envoyé avec succès !', response.status, response.text);
    } catch (error) {
      console.error('❌ Échec de l’envoi de l’email :', error);
    }
  }

async function envoi(){
    await envoyerMail('Alphonse', 'malakialphonse@gmail.com', 50);
}
// envoi();

function envoyerMail1(nom, emailDestinataire, montant) {
    
    const templateParams = {
      nom_utilisateur: nom,
      email: emailDestinataire,
      montant_envoye: montant
    };
  

    emailjs.send('no-reply', 'template_98v4vfv', templateParams)
      .then(function(response) {
        console.log('✅ Email envoyé avec succès !', response.status, response.text);
      }, function(error) {
        console.error('❌ Échec de l’envoi de l’email :', error);
      });
  }

// envoyerMail1('Alphonse', 'alphamlc993@gmail.com', 15550);

//PayPal

function lancerSimulation() {
    console.log("▶️ Simulation déclenchée. Affichage du bouton PayPal...");

    if (typeof paypal === "undefined") {
      console.error("❌ SDK PayPal non chargé.");
      return "❌ SDK PayPal non chargé.";
    }

    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: { value: '15.00' }
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            console.log(details);
          console.log("✅ Paiement simulé par :", details.payer.name.given_name);
          alert("✅ Merci " + details.payer.name.given_name + ", paiement simulé !");
        });
      },
      onError: function(err) {
        console.error("❌ Erreur lors de la simulation :", err);
        return "❌ Erreur lors de la simulation : " + err;
      }
    }).render('#paypal-button-container');

    return "✅ Simulation déclenchée et bouton PayPal affiché.";
  }

// console.log(lancerSimulation());

console.log(crypto.randomUUID());

//carte
// 🔑 Remplace ici par ta vraie clé publique Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibWFsYWNoaWUwNCIsImEiOiJjbWJoeXh6cWMwMDQzMmlzZGtxOXl0M3U5In0.BcGWxNf-jXqblHpAwckLCw'; 

// Création simple de la carte
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [15.2663, -4.4419], // Kinshasa (longitude, latitude)
  zoom: 10
});

// Marqueur (optionnel mais sympa)
// new mapboxgl.Marker()
//   .setLngLat([15.2663, -4.4419])
//   .setPopup(new mapboxgl.Popup().setText("Kinshasa"))
//   .addTo(map);


// User
async function genererUtilisateurs(nombre) {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=${nombre}?nat=fr`);
      const data = await response.json();
      

      //Data
      console.log(data);
      // Affichage dans la console
      data.results.forEach((user, index) => {
        console.log(`👤 Utilisateur ${index + 1}`);
        console.log(`Nom : ${user.name.first} ${user.name.last}`);
        console.log(`Email : ${user.email}`);
        console.log(`Pays : ${user.location.country}`);
        console.log(`Photo : ${user.picture.thumbnail}`);
        console.log('---------------------------');
      });
  
      return data.results; // Tu peux les réutiliser ailleurs
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des utilisateurs :', error);
    }
  }
  
  // Appel de la fonction
  genererUtilisateurs(5);
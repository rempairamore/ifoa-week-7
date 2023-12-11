const queryParams = new URLSearchParams(window.location.search);
const idFoto = queryParams.get('id');
let oggetto;
let UrlPexel = `https://api.pexels.com/v1/photos/${idFoto}`

grepFoto()


async function grepFoto() {
        
    await fetch(UrlPexel, {
            method: 'GET', 
            headers: {
                Authorization: 'DCR3osMkyuIXtfEKJ0BZvql86xykbvBYZAuSOb1W7jaGt5QZi20kJXiM'
            }
        })
        .then(response => response.json())
        .then(json => oggetto = json )

    creaDOM(oggetto)

}





function creaDOM(oggetto) {
    console.log(oggetto);
        let divPrincipale = document.querySelector('#dettaglio');
        let scheda = document.createElement('div');
        scheda.className = 'd-flex justify-content-center align-items-center text-center';
        scheda.innerHTML = `<div class="card w-75">
        <img src="${oggetto.src.large}" class="card-img-top" alt="Nome Artista">
        <div class="card-body">
            <h5 class="card-title">Photographer: ${oggetto.photographer}</h5>
            <p>${oggetto.alt}</p>
            <a href="${oggetto.photographer_url}" class="btn btn-primary" target="_blank">Vai all'artista</a>
        </div>
        </div>`
        divPrincipale.appendChild(scheda)
}
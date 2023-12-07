
// Chiamate Ajax
let obj = null;
let json = null;
let xhr = new XMLHttpRequest(); 
xhr.open('GET', 'https://striveschool-api.herokuapp.com/books'); 
xhr.send(); 
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
        console.log('The operation is complete');
        json = xhr.responseText;
        obj = JSON.parse(json)
        console.log(obj);
        // console.log("ciao");
        createList(obj);
    }
}


// Avvio Funzioni
arrayStorageOnLoad()

// Funzioni
function createList(oggetto) {

    oggetto.forEach((element, index) => {
        let divCard = document.createElement('div');
        divCard.classList = 'col d-flex align-items-stretch';
        divCard.innerHTML = `
        <div class="card h-100">
          <span class="badge bg-warning text-white rounded-pill my-2 d-flex align-items-center justify-content-center">${element.category}</span>
          <img src="${element.img}" class="card-img-top" alt="book_picture">
          <div class="card-body  d-flex flex-column justify-content-between">
            <h5 class="card-title">${element.title}</h5>
            <span class="asin" style="display: none;">${element.asin}</span>
            <span class="indexNumber" style="display: none;">${index}</span>
            <p class="card-text text-center">${element.price}\$</p>
            <div class="contBtn d-flex justify-content-around">
              <a href="#" class="btn btn-success">Add to Cart</a>
              <a href="#" class="btn btn-danger">Remove</a>
            </div>
          </div>
        </div>`
        let divContenitoreLocandine = document.querySelector('#contenitoreLocandine')
        divContenitoreLocandine.appendChild(divCard) 
    });
    aggiornamentoCarrello()

}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#contenitoreLocandine').addEventListener('click', (e) => {
        e.preventDefault();
        // console.log(e.target.className);
        if(e.target.className == 'btn btn-danger') {
            // console.log(e.target);
            let divContenitoreLocandine = document.querySelector('#contenitoreLocandine')
            let parent = e.target.parentNode.parentNode.parentNode.parentNode;
            // console.log(parent);
            divContenitoreLocandine.removeChild(parent)
        }
        if(e.target.className == 'btn btn-success') {
            // console.log(e.target.parentNode);
            // let asinNumber = e.target.parentNode.parentNode.childNodes[3].innerHTML 
            let indexNumber = e.target.parentNode.parentNode.childNodes[5].innerHTML 
            // console.log(indexNumber);
            let bottoni = e.target.parentNode;
            let card = e.target.parentNode.parentNode.parentNode;
            card.style.border = '3px solid green'
            bottoni.className = ''
            // bottoni.style.display = 'none'
            bottoni.innerHTML = `<span class="spanOnCart" >Already on Cart</span>`
            let arrayJson = localStorage.getItem('carrello');
            let objArray = JSON.parse(arrayJson)
            objArray.push(indexNumber)
            arrayJson = JSON.stringify(objArray)
            localStorage.setItem('carrello', arrayJson)
            aggiornamentoCarrello()


        }
    })
})


function arrayStorageOnLoad() {
    document.addEventListener('DOMContentLoaded', () => {
        if(localStorage.getItem('carrello') === null) {
            let arrayCarrello = [];
            arrayCarrello = JSON.stringify(arrayCarrello);
            localStorage.setItem('carrello', arrayCarrello)
        } else {
            // aggiornamentoCarrello()
        }
    })
}


function aggiornamentoCarrello() {
    let carrelloPrincipale = document.querySelector('#inizioCarrello');
    carrelloPrincipale.innerHTML = ''

    let arrayCarrello = JSON.parse(localStorage.getItem('carrello'))
    // console.log(arrayCarrello);
    let priceTotal = 0;
    arrayCarrello.forEach((elemento, indice) => {
        // console.log(elemento, indice);
        priceTotal = priceTotal + +obj[elemento].price
        let carrelloOggetto = document.createElement('div');
        carrelloOggetto.classList = 'card mb-3';
        carrelloOggetto.style.maxWidth = "540px";
        carrelloOggetto.innerHTML = `
                          <div class="row g-0">
                          <div class="col-md-4">
                            <img src="${obj[elemento].img}" class="img-fluid rounded-start" alt="image description">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title">${obj[elemento].title}</h5>
                              <p class="card-text"><small class="text-body-secondary">${obj[elemento].price}\$</small></p>
                              <a href="#" class="btn btn-danger">Remove</a>
                            </div>
                          </div>
                        </div>`
        carrelloPrincipale.appendChild(carrelloOggetto);
        
    });
    let priceTotalFormatted = parseFloat(priceTotal.toFixed(2));
    
    if(priceTotal != 0){
        let totaltDiv = document.createElement('div')
        totaltDiv.innerHTML = `<span class="h4 m-3">Gross Total: ${priceTotalFormatted}\$</span>`
        carrelloPrincipale.appendChild(totaltDiv)
    } else {
        let totaltDiv = document.createElement('div')
        totaltDiv.innerHTML = `<span class="h6 m-3 mt-6">Cart is Empty</span>`
        carrelloPrincipale.appendChild(totaltDiv)
    }

}
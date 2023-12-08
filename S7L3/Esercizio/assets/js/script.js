
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
    let carrelloJson = localStorage.getItem('carrello');
    let carrelloArray = JSON.parse(carrelloJson)
    console.log(carrelloArray)
    oggetto.forEach((element, index) => {
        // console.log("HELLO" + element.asin)
        let stringaCercare = index.toString()
        if(carrelloArray.includes(stringaCercare)) {
            // console.log("NAPOLI")
            let divCard = document.createElement('div');
            divCard.classList = 'col d-flex align-items-stretch';
            divCard.innerHTML = `
            <div class="card h-100" style="border: 3px solid green; border-radius: 10px;">
              <span class="badge bg-warning text-white rounded-pill my-2 d-flex align-items-center justify-content-center">${element.category}</span>
              <img src="${element.img}" class="card-img-top" alt="book_picture" style="filter: grayscale(100%);">
              <div class="card-body  d-flex flex-column justify-content-between">
                <h5 class="card-title">${element.title}</h5>
                <span class="asin" style="display: none;">${element.asin}</span>
                <span class="indexNumber" style="display: none;">${index}</span>
                <p class="card-text text-center">${element.price}\$</p>
                <span class="spanOnCart" >Already on Cart</span>
                </div>
              </div>
            </div>`
            let divContenitoreLocandine = document.querySelector('#contenitoreLocandine')
            divContenitoreLocandine.appendChild(divCard)  
        } else {
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
        }

    });
    
    aggiornamentoCarrello()

}


function createListRefresh() {
    let divContenitoreLocandine = document.querySelector('#contenitoreLocandine');
    divContenitoreLocandine.innerHTML = ''
    createList(obj)
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
            card.style.border = '3px solid green';
            card.style.borderRadius = '10px';
            card.childNodes[3].style.filter = 'grayscale(100%)';
            bottoni.className = '';
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

    document.querySelector('#offcanvasRight').addEventListener('click', (e) => {
        e.preventDefault();
        if(e.target.className == 'btn btn-danger') {
            let idLocandinaRimossa = e.target.parentNode.childNodes[7].innerText.toString()
            console.log(idLocandinaRimossa);
            let contenitoreCarrello = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
            let parent = e.target.parentNode.parentNode.parentNode.parentNode;
            // console.log(parent);
            contenitoreCarrello.removeChild(parent)
            let arrayJson = localStorage.getItem('carrello');
            let objArray = JSON.parse(arrayJson)
            
            let newOBJ = objArray.filter(e => e !== idLocandinaRimossa)
            
            arrayJson = JSON.stringify(newOBJ)
            localStorage.setItem('carrello', arrayJson)
            console.log(arrayJson)
            aggiornamentoCarrello()
        }
    })

    //Con questo event listener controllo quando viene chiuso il carrello
    document.querySelector('#offcanvasRight').addEventListener('hidden.bs.offcanvas', function () {
        createListRefresh()

    });

    updateCartCount()


    document.querySelector('#refreshLocalStorage').addEventListener('click', () => {
        localStorage.removeItem('carrello')
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
                              <span style="display: none;">${elemento}</span>
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
        let bottoneCheckOut = document.createElement('div')
        bottoneCheckOut.innerHTML = '<a href="#" class="btn btn-success m-3 px-4">Checkout <i class="bi bi-bag-heart bi-sm text-white" style="font-size: 1.5em;"></i></a>'
        carrelloPrincipale.appendChild(bottoneCheckOut)
    } else {
        let totaltDiv = document.createElement('div')
        totaltDiv.innerHTML = `<span class="h6 m-3 mt-6">Cart is Empty</span>`
        carrelloPrincipale.appendChild(totaltDiv)
    }
    updateCartCount()

}

function updateCartCount() {
    let arrayJson = localStorage.getItem('carrello');
    let objArray = JSON.parse(arrayJson) 
    let badgeCart = document.querySelector('#badgeCarrello')
    badgeCart.innerText = objArray.length;
  }

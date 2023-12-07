
// Chiamate Ajax
let xhr = new XMLHttpRequest(); 
xhr.open('GET', 'https://striveschool-api.herokuapp.com/books'); 
xhr.send(); 
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
        console.log('The operation is complete');
        let json = xhr.responseText;
        let obj = JSON.parse(json)
        console.log(obj);
        console.log("ciao");
        createList(obj);
    }
}


// Avvio Funzioni
arrayStorageOnLoad()

// Funzioni
function createList(oggetto) {

    oggetto.forEach((element, index) => {
        let divCard = document.createElement('div');
        divCard.classList = 'col';
        divCard.innerHTML = `
        <div class="card">
          <img src="${element.img}" class="card-img-top" alt="book_picture">
          <div class="card-body">
              <div class="tuttoTitolo d-flex justify-content-between">
                  <h5 class="card-title">${element.title}</h5>
                  <span class="badge bg-primary rounded-pill my-2 d-flex align-items-center justify-content-center">${element.category}</span>
              </div>
            <span class="asin" style="display: none;">${element.asin}</span>
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

}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#contenitoreLocandine').addEventListener('click', (e) => {
        e.preventDefault();
        // console.log(e.target.className);
        if(e.target.className == 'btn btn-danger') {
            // console.log(e.target);
            let divContenitoreLocandine = document.querySelector('#contenitoreLocandine')
            let parent = e.target.parentNode.parentNode.parentNode.parentNode;
            console.log(parent);
            divContenitoreLocandine.removeChild(parent)
        }
        if(e.target.className == 'btn btn-success') {
            // console.log(e.target.parentNode);
            let asinNumber = e.target.parentNode.parentNode.childNodes[3].innerHTML 
            let bottoni = e.target.parentNode;
            let card = e.target.parentNode.parentNode.parentNode;
            card.style.border = '3px solid green'
            bottoni.className = ''
            // bottoni.style.display = 'none'
            bottoni.innerHTML = `<span class="spanOnCart" >Already on Cart</span>`
            let arrayJson = localStorage.getItem('carrello');
            let objArray = JSON.parse(arrayJson)
            objArray.push(asinNumber)
            arrayJson = JSON.stringify(objArray)
            localStorage.setItem('carrello', arrayJson)



        }
    })
})


function arrayStorageOnLoad() {
    document.addEventListener('DOMContentLoaded', () => {
        if(localStorage.getItem('carrello') === null) {
            let arrayCarrello = [];
            arrayCarrello = JSON.stringify(arrayCarrello);
            localStorage.setItem('carrello', arrayCarrello)
        }
    })
}
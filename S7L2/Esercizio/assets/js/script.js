/*
    1.
    Crea un semplice form di registrazione con un input field in cui
    l’utente possa inserire il proprio nome.
    A fianco di questo input field crea due pulsanti: uno salverà il valore in localStorage, 
    uno rimuoverà il valore precedentemente salvato (se presente).
    Mostra sopra l’input field il valore precedentemente salvato, se presente.

    2.
    Crea un contatore che tenga conto del tempo che passa, utilizzando sessionStorage. 
    Aggiornando la pagina il valore prosegue, chiudendo la pagina - ovviamente - ricomincia. 
    Il valore del contatore deve aggiornarsi ad ogni secondo.

*/
checkNameDescription()
prendiInput()
rimuoviInput()
contatore()
addToListButton()
checkBloccoLista()
rimuoviToDo()


function checkNameDescription() {
    if(localStorage.getItem('InputNome') !== null) {
        let nameDescription = document.querySelector('#textNameDescription span')
        nameDescription.innerText = localStorage.getItem('InputNome');
    }
    console.log(localStorage.getItem('InputNome'));
}



function prendiInput() { 
    document.querySelector('#bottoneInput').addEventListener('click', () => {
        let textName = document.querySelector('#textName')
        let testoInput = textName.value
        
        localStorage.setItem("InputNome",testoInput)

        let nameDescription = document.querySelector('#textNameDescription span')
        nameDescription.innerText = testoInput
    })
}


function rimuoviInput() {
    document.querySelector('#bottoneRimuovi').addEventListener('click', () => {
        localStorage.removeItem('InputNome');
    })
}
   

function contatore() {
    window.addEventListener("load", (event) => {
        console.log("page is fully loaded");
        if(sessionStorage.getItem('tempoInizio') === null) {
            let epochTime = Math.floor(Date.now() / 1000);
            console.log(epochTime); 
            sessionStorage.setItem("tempoInizio",epochTime)
        }
      });


      setInterval(() => {
        aumentaContatore()
      }, 1000);
}


function aumentaContatore() {
    let risultatoSecondi = Math.floor(Date.now() / 1000) - sessionStorage.getItem('tempoInizio');
    let spanContatore = document.querySelector('#contatore span')
    spanContatore.innerText = risultatoSecondi
}

function addToListButton() {
    document.querySelector('#bottoneToDo').addEventListener('click', () => {
        let testoDentroInput = document.querySelector('#toAggiungi').value
        // console.log(testoDentroInput);
        let bloccoHTML = document.createElement('li')
        let numeroStorage = "blocco" + (localStorage.length + 1);
        bloccoHTML.classList = 'list-group-item d-flex justify-content-between align-items-start'
        bloccoHTML.innerHTML = `
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${testoDentroInput}</div>
                </div>
                <span class="badge bg-primary rounded-pill"><i class="bi bi-trash3 ciaone p-3" id="${numeroStorage}" ></i></span>
            `
        // document.querySelector('#olPrincipale').appendChild(bloccoHTML)
        document.querySelector('#toAggiungi').value = '';
        addToStorage(bloccoHTML.innerHTML);

    })

}

function addToStorage(blocco) {
    let numeroStorage = "blocco" + (localStorage.length + 1);
    localStorage.setItem(numeroStorage,blocco)
    checkBloccoLista()

}

function checkBloccoLista() {
    let olPrincipale = document.querySelector('#olPrincipale');
    while (olPrincipale.firstChild) {
        olPrincipale.removeChild(olPrincipale.firstChild);
        console.log("ciao");
    }
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith('blocco')) {
            // Fai qualcosa con localStorage.getItem(key)
            let bloccoLi = document.createElement('li')
            bloccoLi.classList = 'list-group-item d-flex justify-content-between align-items-start'

            bloccoLi.innerHTML = localStorage.getItem(key)
            document.querySelector('#olPrincipale').appendChild(bloccoLi)
            console.log("ciao dentro"); 
        }
    }
}

function rimuoviToDo() {
    console.log("rimozione pronta");
    document.querySelectorAll('.ciaone').forEach(elemento => {
        elemento.addEventListener('click', () => {
            // Codice da eseguire quando l'elemento viene cliccato
            console.log('Elemento cliccato!');
        });
    });
}
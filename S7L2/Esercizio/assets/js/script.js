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
    let secondoAttuale = Date.now();
    let risultatoSecondi = Math.floor(Date.now() / 1000) - sessionStorage.getItem('tempoInizio');
    let spanContatore = document.querySelector('#contatore span')
    spanContatore.innerText = risultatoSecondi
}



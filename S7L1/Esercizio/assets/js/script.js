/*
1.
    Crea una classe User per la creazione di oggetti di tipo “utente”. 
    Il suo costruttore dovrà inizializzare ogni oggetto utente con i seguenti attributi:

    -   firstName
    -   lastName
    -   age
    -   location

    Aggiungi alla classe User anche un metodo che restituisca il confronto con l'età di un'altra persona. 
    Ad esempio, date due istanze della classe utente “x” e “y” inizializzate con le proprietà sopra descritte, 
    il metodo dovrà restituire una frase simile a “x è più vecchio di y” a seconda del risultato del confronto.

    Crea degli oggetti a partire dalla classe User e verifica che la comparazione tra le età funzioni correttamente.
*/

class User {
    constructor(firstName, lastName, age, location) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.location = location;
    }

    checkAge(altraPersona) {
        if(this.age >= altraPersona.age) {
            return this.firstName + " è più grande di " + altraPersona.firstName;
        } else {
            return altraPersona.firstName + " è più grande di " + this.firstName;
        }
    }
}

let persona1 = new User("mario","rossi", 33, "Roma");
let persona2 = new User("giovanni","mucaccia", 21, "Bologna");
let persona3 = new User("martina","neri", 55, "Milano");

// console.log(persona1.checkAge(persona3));

/*
    2.
        Crea un form per la creazione di oggetti "Pet" (animali domestici). 

        La classe Pet dovrà essere dotata delle seguenti proprietà: 
        -   petName 
        -   ownerName 
        -   species // (cane, gatto, coniglio etc.) 
        -   breed // (labrador, soriano, nano etc.) 
        
        Nella classe che utilizzerai per creare questi oggetti aggiungi anche un metodo 
        che restituisca true se due animali condividono lo stesso padrone. 
        Crea, raccogliendo i dati dal form, diverse istanze della classe Pet 
        e mostrane i dati in una lista sottostante. 


*/

class Pet {
    constructor(petName, ownerName, species, breed) {
        this.petName = petName;
        this.ownerName = ownerName;
        this.species = species;
        this.breed = breed;
    }

    ownerCheck(altroAnimale) {
        if (this.ownerName === altroAnimale.ownerName) {
            return true
        } else {
            return false
        }
    }
}


document.querySelector('#richiestaAnimale button').addEventListener('click', () => {
    let errore = 0
    let inputUtente = document.querySelectorAll('#richiestaAnimale .form-control, #richiestaAnimale .form-select');
    console.log(inputUtente);

    let petNameError = document.querySelector('#petNameError');
    let ownerNameError = document.querySelector('#ownerNameError');
    let speciesError = document.querySelector('#speciesError');
    let razzaError = document.querySelector('#razzaError');


    let nomeCane = inputUtente[0].value;
    let nomeOwner = inputUtente[1].value;
    let tipoAnimale = inputUtente[2].value;
    let razzaCane = inputUtente[3].value;

    console.log(razzaCane);

    if (nomeCane.length < 3) {
        petNameError.textContent = "The PET name must be at least 3 characters long";
        errore++;
    } else {
        petNameError.textContent = '';
    }

    if (nomeOwner.length < 3) {
        ownerNameError.textContent = "The OWNER name must be at least 3 characters long";
        errore++;
    } else {
        ownerNameError.textContent = '';
    }

    if (tipoAnimale === "Choose Species...") {
        speciesError.textContent = "Please select a species";
        errore++;
    } else {
        speciesError.textContent = '';
    }

    if (razzaCane === "Choose Razza...") {
        razzaError.textContent = "Please select a razza";
        errore++;
    } else {
        speciesError.textContent = '';
    }

    // Se c'è un errore allora esci dalla funzione
    if(errore != 0) {return;}



    let nuovopet = new Pet(nomeCane, nomeOwner, tipoAnimale, razzaCane);
    aggiungiAllaLista(nuovopet);

    nuovopet[0].value = '';
    nuovopet[1].value = '';
    nuovopet[2].value = '';
    nuovopet[3].value = '';
})

function aggiungiAllaLista(animale) {
    let ol = document.querySelector('#risultati ol')

    let newLi = document.createElement('li')
    newLi.classList = 'list-group-item d-flex justify-content-between align-items-start'
    newLi.innerHTML = `
            <div class="ms-2 me-auto">
            <div class="fw-bold">Name: ${animale.petName}</div>
                Owner: ${animale.ownerName}<br>
                Type: ${animale.breed}
            </div>
            <span class="badge bg-primary rounded-pill">${animale.species}</span>
    `
    
    ol.appendChild(newLi);
}
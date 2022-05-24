'use strict'
let page = 1;
let limit = 3;
const monsterUrl = 'http://localhost:3000/monsters'

window.addEventListener('DOMContentLoaded', (event) => {
    getMonsters()
    createNewMonster()
    changePage()
});

function getMonsters(){
    //console.log('test')
    //this is limiting to 50 not 50 per page fix 
    fetch(monsterUrl + `?_limit=${limit}` + `&_page=${page}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById('monster-container').innerHTML="";
        //can replace this with map
        for(let x=0; x<data.length; x++){
            showMonsters(data[x])
        }
    });
}

//show name, age, description
//creates a div and appends all the info to the div - each monster will get 
//their own div 
function showMonsters(monster){
    //console.log(monster)
    let zone = document.createElement("div")
    let monsterName = document.createElement("h1")
    let age = document.createElement("h2")
    let description = document.createElement("h3")
    monsterName.innerHTML = `${monster.name}`
    age.innerHTML = `Age: ${monster.age}`
    description.innerHTML = `Descriptioin: ${monster.description}`
    zone.appendChild(monsterName);
    zone.appendChild(age);
    zone.appendChild(description);
    document.getElementById('monster-container').appendChild(zone);
}

//need name, age, and description fields + submit button
//add field holders
//can add placeholders to look even better
function createNewMonster(){
    const submitForm = document.createElement("form");
    const nameInput = document.createElement("input");
    const ageInput = document.createElement("input");
    const descriptionInput = document.createElement("input");
    const submitBtn = document.createElement("button");
    submitForm.id = "monster-form"
    nameInput.id = "name-input"
    ageInput.id = "age-input"
    descriptionInput.id = "description-input"
    submitBtn.id = "submit-button"
    submitBtn.innerText = "Submit"
    //can use append to put them all in one ()
    submitForm.appendChild(nameInput);
    submitForm.appendChild(ageInput);
    submitForm.appendChild(descriptionInput);
    submitForm.appendChild(submitBtn);
    document.getElementById('create-monster').appendChild(submitForm)
    console.log(submitForm)
    createMonsterSubmitListener()
}

//makes the submit button work
function createMonsterSubmitListener(){
    document.getElementById("monster-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const monstName = document.getElementById("name-input").value
        const monstAge = document.getElementById("age-input").value
        const monstDesc = document.getElementById("description-input").value
        document.getElementById("name-input").placeholder="Input Monster Name:"
        document.getElementById("age-input").placeholder="Input Monster Age:"
        document.getElementById("description-input").placeholder="Input Monster Description:"
        let newMonst = {name:monstName, age: monstAge, description: monstDesc}
        postNewMonster(monsterUrl, newMonst)
    });
}

//post the new monster to the server
//need to make sure the data is the new monster
function postNewMonster(url = monsterUrl, data = {}){
    fetch(monsterUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        }, body: JSON.stringify(data)
    }).then(response => response.json()).then(data => console.log(data));
}

// async function postNewMonster(url = monsterUrl, data = {}){
//     const response = await fetch(monsterUrl, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': "application/json"
//         }, body: JSON.stringify(data)
//     });
//     console.log(response)
//     console.log(response.json());
// }

//make the buttons to go forwards and backwards on the page buttons
//let me grab the 50 monster chunk - then display it 
function changePage(){
    //next page
    let next50 = document.getElementById("forward")
    next50.addEventListener("click", () => {
        //this is the functionality of the forward button
        page++;
        document.getElementById("monster-container").innerHTML.remove
        getMonsters()
        // let newPageMonsters = monster[((page-1)*50)]
        // console.log(monster.slice((page-1)*50), ((page-1)*50)+50)
        // console.log(newPageMonsters)
    });

    //prev page
    let prev50 = document.getElementById("back")
    prev50.addEventListener("click", () => {
        //this is the functionality for the back button 
        page--;
        document.getElementById("monster-container").innerHTML.remove
        getMonsters()
    });
}
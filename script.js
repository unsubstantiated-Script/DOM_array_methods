const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionaires = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = [];


//Fetch Random User and Add Money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json()


    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser)
}

//Double dat cash! 
function doubleMoney() {
    data = data.map(user => {
        //Spread operator to grab old obj, manipulate one element of that object return new array of obj
        return {
            ...user,
            money: user.money * 2
        }
    })

    updateDOM();
}

//Sort users by richest
function sortByRichest() {
    data.sort((a, b) =>
        b.money - a.money
    )
    updateDOM();
}

//Filter only millionaires
function filterMillionaires() {
    data = data.filter(user => user.money >= 1000000)
    updateDOM()
}

//Add up totals
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)

    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `<h3>The total amount of cash here is: <strong>$${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl)

}



//Add new object to data array
function addData(obj) {
    data.push(obj)
    updateDOM()
}

//Update DOM 

function updateDOM(providedData = data) {
    //Clear main DIV
    main.innerHTML = ' <h2><strong>Person</strong> Wealth</h2>'

    providedData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong> $${formatMoney(item.money)}`
        main.appendChild(element)
    })
}

//Format number into money

function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event Listeners

addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
showMillionaires.addEventListener('click', filterMillionaires)
sortBtn.addEventListener('click', sortByRichest)
calculateWealthBtn.addEventListener('click', calculateWealth)
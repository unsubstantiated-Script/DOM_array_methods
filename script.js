const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionaires = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = [];
getRandomUser();


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

//Add new object to data array

function addData(obj) {
    data.push(obj)
}
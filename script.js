const url = 'https://randomuser.me/api/?results=50&inc=gender,name,email,dob,phone,picture&seed=foobar'

const cardsField = document.querySelector('.contentWrapper')
const formWrapper = document.querySelector('.searchFormWrapper')
const form = document.querySelector('.searchForm')
const searchIput = document.querySelector('#searchName')
const burgerMenu = document.querySelector('.burgerForForm')

let users = []

document.addEventListener("DOMContentLoaded", loadData)
form.addEventListener('input', handleFormChange)
form.addEventListener("submit", (e) => e.preventDefault())
burgerMenu.addEventListener('click', searchFormSwitch)

function loadData() {
    try {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                users = data.results;
                renderCards(preparCardsToRender(users))
            })
    } catch (e) {
        console.log(e)
    }
}
function handleFormChange() {
    const searchedByName = searchByName(users)
    const sortedUsers = sortingUsers(searchedByName)
    const filteredByGender = filterByGender(sortedUsers)
    return renderCards(preparCardsToRender(filteredByGender))
}
function searchByName(users) {
    if (form.searchName.value) {
        return users.filter(user =>
            (user.name.first + ' ' + user.name.last).toLowerCase()
                .includes(form.searchName.value.toLowerCase()))
    } else {
        return users
    }
}
function sortingUsers(users) {
    if (form.sort.value === 'ageDown') {
        return users.sort((user1, user2) => {
            if (user1.dob.age < user2.dob.age) {
                return -1
            }
            if (user1.dob.age > user2.dob.age) {
                return 1
            }
            return 0
        })
    }
    if (form.sort.value === 'ageUp') {
        return users.sort((user1, user2) => {
            if (user1.dob.age < user2.dob.age) {
                return 1
            }
            if (user1.dob.age > user2.dob.age) {
                return -1
            }
            return 0
        })
    }
    if (form.sort.value === 'az') {
        return users = users.sort((user1, user2) => {
            if (user1.name.last < user2.name.last) {
                return -1
            }
            if (user1.name.last > user2.name.last) {
                return 1
            }
            return 0
        })
    }
    if (form.sort.value === 'za') {
        return users = users.sort((user1, user2) => {
            if (user1.name.last < user2.name.last) {
                return 1
            }
            if (user1.name.last > user2.name.last) {
                return -1
            }
            return 0
        })
    }
    if (!form.sort.value) {
        return users
    }
}
function filterByGender(users) {
    if (form.male.checked && !form.female.checked) {
        return users.filter(user => user.gender === 'male')
    }
    if (form.female.checked && !form.male.checked) {
        return users.filter(user => user.gender === 'female')
    }
    if (form.male.checked && form.female.checked) {
        return users
    }
    if (!form.male.checked && !form.female.checked) {
        return users
    }
}
function preparCardsToRender(users) {
    return users
        .map(({ picture, name, gender, dob, phone, email }) => {
            const card =
                `<div class="userCard">
                    <div class="face face1">
                        <div class="content">
                            <img src="${picture.large}" alt="user photo">
                            <p class="name">${name.first} ${name.last}</p>
                        </div>
                    </div>
                    <div class="face face2">
                        <div class="content">
                            <p class="gender">${gender}</p>
                            <p class="age">Age ${dob.age}</p>
                            <p class="phone">Tel.:${phone}</p>
                            <p class="email">${email}</p>
                        </div>
                    </div>
                </div>`
            return card
        })
        .join('')
}
function renderCards(cards) {
    cardsField.innerHTML = cards
}

function searchFormSwitch() {
    if (burgerMenu.burgerInput.checked) {
        formWrapper.style.display = 'block'
    }
    if (!burgerMenu.burgerInput.checked) {
        formWrapper.style.display = 'none'
    }
}

// DOM
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const dogFilter = document.querySelector("#good-dog-filter")
allDogs()


//Fetch
function allDogs() {
fetch('http://localhost:3000/pups')
.then(response => response.json())
.then(dogArr => {
    dogArr.forEach(dogObj =>{
        listDogs(dogObj)
        
    })
})
}

function listDogs(dogObj) {
const dogSpan = document.createElement("span")    
    
    dogSpan.innerHTML = `
    <span>${dogObj.name}</span>
    `
    dogBar.append(dogSpan)

dogSpan.addEventListener("mouseover", event => {
    dogInfo.innerHTML = `
    <img src=${dogObj.image}>
    <h2>${dogObj.name}</h2>
    <button>${dogObj.isGoodDog}</button>
    `
    })
    
}

dogFilter.addEventListener("click", event => {
dogBar.innerText = ""
if (dogFilter.innerText == 'Filter good dogs: OFF') {
    dogFilter.innerText = 'Filter good dogs: ON'
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(dogsArr => {
        
        dogsArr.forEach(dogObj => { 
            if (dogObj.isGoodDog == true) {
                listDogs(dogObj)
            }
        })
    })
} else {
    dogFilter.innerText = 'Filter good dogs: OFF'
    allDogs()
}




    

})









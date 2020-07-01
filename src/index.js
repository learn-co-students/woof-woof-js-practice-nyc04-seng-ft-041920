//DOM elements
const dogsContainer = document.querySelector("#dog-bar");
const singleDog = document.querySelector("#dog-info");
const button = singleDog.querySelector("button")

//Event listeners

//Render helpers 

function renderOneDog(dogObject) {
    singleDog.innerHTML = `<img src="${dogObject.image}" alt="${dogObject.name}">
    <h2>${dogObject.name} </h2> 
    <button>${dogObject.name ? "Good Dog!" : "Bad Dog!"}</button>`

    const button = singleDog.querySelector("button")
    if (dogObject.isGoodDog === true) {
        button.textContent = "Good Dog!"
    } else {
        button.textContent = "Bad Dog!"
    }

    button.addEventListener("click", function(event){
        dogObject.isGoodDog = !dogObject.isGoodDog;

        fetch(`http://localhost:3000/pups/${dogObject.id}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dogObject)
            })
                .then(r => r.json())
                .then(dogUpdate => {
                    if (dogUpdate.isGoodDog === true) {
                        button.textContent = "Good Dog!"
                    } else {
                        button.textContent = "Bad Dog!"
                    }
                })
})
}


function renderAllDogs(dogObject) {
    const dogSpan = document.createElement("span")
    dogSpan.dataset.id = dogObject.id
    dogSpan.textContent = dogObject.name

    dogsContainer.append(dogSpan)

    dogSpan.addEventListener("click", function(event) {
        renderOneDog(dogObject)
    })
}

//Initial render

fetch('http://localhost:3000/pups')
.then(response => response.json())
.then(dogArray => {
    dogArray.forEach(renderAllDogs)
});
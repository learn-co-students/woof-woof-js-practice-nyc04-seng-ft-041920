document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/pups")
    .then(function(res) {
        return res.json();
    })
    .then(function(json) {
        console.log(json)
        renderDogBar(json)
    })
})

function renderDogBar(dogObjects) {
    const dogBar = document.querySelector("#dog-bar");
    dogObjects.forEach(function(dogObject) {
        const dogSpan = document.createElement("span")
        dogSpan.textContent = `${dogObject.name}`
        dogBar.append(dogSpan)
        dogSpan.addEventListener("click", function(e) {
            renderDog(dogObject)
        })
    })
}

function renderDog(dogObject) {
    const dogInfo = document.querySelector("#dog-info")
    dogInfo.innerHTML = `
        <img src=${dogObject.image}>
        <h2>${dogObject.name}</h2>
        <button>${dogObject.isGoodDog}</button>`
    const dogButton = dogInfo.querySelector("button")
    dogButton.addEventListener("click", function(e) {
        console.log(e.target, dogObject)
        toggleLike(e.target, dogObject)
    })
}

function toggleLike(dogButton, dogObject) {
    //use ternary op?
    //store in separate function
    let isGood = ""
    if (dogButton.innerText === "true") {
        isGood = false
    }
    else {
        isGood = true
    }
    dogButton.innerText = isGood

    //patch req
    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({isGoodDog: isGood})
    }
    fetch(`http://localhost:3000/pups/${dogObject.id}`, configObj)
    .then(function(res) {
        return res.json();
    })
    .then(function(obj) {
        console.log(obj)
    })
}
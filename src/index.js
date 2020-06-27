let allDogs = ""
document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/pups")
    .then(function(res) {
        return res.json();
    })
    .then(function(json) {
        renderDogBar(json)
        allDogs = json
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


//redo filter, it requires a reload, want it to update immediately

const dogFilterButton = document.querySelector("#good-dog-filter")
dogFilterButton.addEventListener("click", function(e) {
    console.log(e.target, allDogs)
    toggleFilterText(e.target)
    filterGood(allDogs, e.target)
})

function filterGood(allDogs, button){
    //clear dogs
    const dogBar = document.querySelector("#dog-bar");
    dogBar.innerHTML = " ";
    //filter
    if (button.innerText === "Filter good dogs: ON") {
        let newDogArr = []
        allDogs.forEach(function(dogObj) {
            if (dogObj.isGoodDog === true) {
                newDogArr.push(dogObj)
            }
        })
        renderDogBar(newDogArr)
    }
    else {
        renderDogBar(allDogs)
    }
}

function toggleFilterText(filterButton) {
    if (filterButton.textContent === "Filter good dogs: OFF") {
        filterButton.textContent = "Filter good dogs: ON"
    }
    else {
        filterButton.textContent = "Filter good dogs: OFF"
    }
}

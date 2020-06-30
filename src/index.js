// DOM Access Variables
const dogBar = document.querySelector("#dog-bar")

// Render Helpers
function renderOneDog(dog) {
    const dogSpan = document.createElement("span")
    dogSpan.textContent = `${dog.name}`

    dogSpan.addEventListener("click", () => {
        const dogInfo = document.querySelector("#dog-info")
        
        dogInfo.innerHTML = `
            <img src=${dog.image}>
            <h2>${dog.name}</h2>
            <button></button>
        `
        const button = dogInfo.querySelector("button")
        if (dog.isGoodDog === true) {
            button.textContent = "Good Dog!"
        } else {
            button.textContent = "Bad Dog!"
        }

        button.addEventListener("click", () => {
            dog.isGoodDog = !dog.isGoodDog;

            fetch(`http://localhost:3000/pups/${dog.id}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dog)
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

        })
    dogBar.append(dogSpan)
}

// Initialize
fetch("http://localhost:3000/pups")
    .then(r => r.json())
    .then(dogArray => {
        dogArray.forEach(renderOneDog)
    })
let filtering = false // so it's not being filtered rn
let doggiesArr = [];

const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const dogFilter = document.querySelector('#good-dog-filter')

fetch('http://localhost:3000/pups').then(response => response.json())
  .then(dogs => {
    doggiesArr = dogs
    console.log(doggiesArr)
    renderDogs()
  });


dogInfo.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.tagName === 'BUTTON') {
    const doggyId = parseInt(e.target.dataset.id)
    const specificDog = doggiesArr.find(dog => dog.id === doggyId)
    specificDog.isGoodDog = !specificDog.isGoodDog
    renderDoggyDiv(specificDog)

    fetch(`http://localhost:3000/pups/${doggyId}`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({isGoodDog: specificDog.isGoodDog})
    })
  }
})

dogFilter.addEventListener('click', e => {
  filtering = !filtering // toggles it to be the complete opposite because bool magic
  dogFilter.textContent = `Filter good dogs: ${filtering ? "ON" : "OFF"}`
  renderDogs()
})

function renderDogs() {
  dogBar.innerHTML = ""
  if (filtering) {
    // get the good doggies
    const bestDoggies = doggiesArr.filter(dog => dog.isGoodDog)
    bestDoggies.forEach(renderDoggyBar)
  } else {
    doggiesArr.forEach(renderDoggyBar)
  }
}

function renderDoggyBar(doggy) {
    const doggySpan = document.createElement('span')
    doggySpan.textContent = `${doggy.name}`
    doggySpan.dataset.id = doggy.id
    dogBar.appendChild(doggySpan)
    doggySpan.addEventListener('click', e => renderDoggyDiv(doggy))
}


function renderDoggyDiv(pupper) {
  const temperament = pupper.isGoodDog ? "Good" : "Bad"
  dogInfo.innerHTML = `
    <img src="${pupper.image}">
    <h2>${pupper.name}</h2>
    <button data-id="${pupper.id}">${temperament} Dog!</button>
  `
}

fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(renderDogs)

function renderDogs(dogs){
  dogs.forEach(dog => {
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogSpan.setAttribute('data-id', dog.id)
    dogSpan.addEventListener('click', e=>{
      console.log(e.target.dataset.id)
      getDogInfo(e.target.dataset.id)
    })

    const dogBar = document.querySelector('#dog-bar')
    dogBar.append(dogSpan)
  });
}

function getDogInfo(dogId){
  fetch('http://localhost:3000/pups/'+dogId)
  .then(res => res.json())
  .then(renderDog)
}


function renderDog(dogObj){
  const dogInfo = document.querySelector('#dog-info')
  const dogStatus = dogObj.isGoodDog ? "Bad Dog!" : "Good Dog!"
  dogInfo.innerHTML = `
    <img src=${dogObj.image}>
    <h2>${dogObj.name}</h2>
    <button>${dogStatus}</button>
  `

  dogInfo.querySelector('button').addEventListener('click', e =>{
    // debugger
    const dogId = dogObj.id
    const dogIsGood = e.target.innerText === "Good Dog!" ? true : false
    const dogUpdateObj = {
      'isGoodDog': dogIsGood
    }
    updateDogInfo(dogUpdateObj,dogId)
  })
}

function updateDogInfo(dogUpdateObj, dogId){
  fetch('http://localhost:3000/pups/'+dogId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(dogUpdateObj)
  })
  .then(res => res.json())
  .then(renderDog)
}
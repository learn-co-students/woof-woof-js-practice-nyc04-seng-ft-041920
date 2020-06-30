getDogs().then(renderDogs)

function getDogs(){
  return fetch('http://localhost:3000/pups')
    .then(res => res.json())
}



function renderDogs(dogs){
  const dogBar = document.querySelector('#dog-bar')
  dogBar.innerHTML = ""

  console.log(dogs)
  dogs.forEach(dog => {
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogSpan.setAttribute('data-id', dog.id)
    dogSpan.addEventListener('click', e=>{
      // debugger
      console.log(e.target.dataset.id)
      getDogInfo(e.target.dataset.id)
    })
    dogBar.append(dogSpan)
    debugger
  });
}

function getDogInfo(dogId){
  fetch('http://localhost:3000/pups/'+dogId)
  .then(res => res.json())
  .then(renderDog)
}


function renderDog(dogObj){
  const dogInfo = document.querySelector('#dog-info')
  const dogStatus = dogObj.isGoodDog ? "Good Dog!" : "Bad Dog!"
  dogInfo.innerHTML = `
    <img src=${dogObj.image}>
    <h2>${dogObj.name}</h2>
    <button>${dogStatus}</button>
  `

  dogInfo.querySelector('button').addEventListener('click', e =>{
    // debugger
    const dogId = dogObj.id
    const dogIsGood = e.target.innerText === "Good Dog!" ? false : true
    console.log(dogIsGood)
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

const filterBtn = document.querySelector('#good-dog-filter')
filterBtn.addEventListener('click', e => {
  if(e.target.innerText === "Filter good dogs: ON") {
     e.target.innerText = "Filter good dogs: OFF" 
     getDogs().then(renderDogs)
   }else{
      e.target.innerText = "Filter good dogs: ON" 
      getDogs().then(dogs => {
        const filterDogs = dogs.filter(dog => dog.isGoodDog === true)
        renderDogs(filterDogs)
      })
   }

})


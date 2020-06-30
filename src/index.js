document.addEventListener("DOMContentLoaded", function(){
  const dogBar = document.querySelector("#dog-bar")
  const dogInfo = document.querySelector("#dog-info")
  console.log(dogInfo)
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(dogData => {
    for(const dog of dogData){
      console.log(dog)
      const dogSpan = document.createElement("span")
      dogSpan.dataset.id = dog.id
      dogSpan.textContent = dog.name
      dogBar.append(dogSpan)
    }

    dogBar.addEventListener("click", function(event){
      console.log(event.target)
      if (event.target.matches("span")){
        const clickedDog = dogData[event.target.dataset.id -1]
        dogInfo.innerHTML = `<img src="${clickedDog.image}"><h2>${clickedDog.name}</h2>
         <button class="dog-button" data-id="${clickedDog.id}">${clickedDog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`

        const dogButton = document.querySelector(".dog-button")
        dogButton.addEventListener("click", onGoodDogButtonClick)
      }
    })
    
  });

  // outside fetch
  function onGoodDogButtonClick(){
    // if it says good dog, switch to bad dog
    console.log(event.target)
    const dogId = event.target.dataset.id
    let goodDog;
    if (event.target.textContent.includes("Good")){
      event.target.textContent = "Bad Dog!"
      goodDog = false
    }
    else{
      event.target.textContent = "Good Dog!"
      goodDog = true
    }
    // make a patch request and update db

    fetch(`http://localhost:3000/pups/${dogId}`, {
  method: 'PATCH',
  headers: {
    "content-type": "application/json"
  },
  body: JSON.stringify({
    isGoodDog: goodDog
  })
})
.then(response => response.json())
.then(result => {
  console.log('Success:', result);
})
.catch(error => {
  console.error('Error:', error);
});
  }


})
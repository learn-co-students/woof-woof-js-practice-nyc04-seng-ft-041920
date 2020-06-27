const dogBar = document.querySelector("#dog-bar");
// console.log(dogBar);
let allDogs;
const dogFilter = document.querySelector("#good-dog-filter");
dogFilter.addEventListener("click", function (event) {
  dogBar.innerHTML = " ";
  if (dogFilter.innerText === "Filter good dogs: OFF") {
    dogFilter.innerText = "Filter good dogs: ON";
    allDogs.forEach(function (dog) {
      if (dog.isGoodDog) {
        displayEachDoge(dog);
      }
    });
  } else {
    dogFilter.innerText = "Filter good dogs: OFF";
    allDogs.forEach(function (dog) {
      displayEachDoge(dog);
    });
  }
});

fetch("http://localhost:3000/pups")
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    // console.log(json);
    allDogs = json;
    json.forEach(function (dog) {
      displayEachDoge(dog);
    });
  });

function updateGoodDog(puppo, boolean) {
  fetch(`http://localhost:3000/pups/${puppo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      isGoodDog: boolean,
    }),
  });
}

function displayEachDoge(dog) {
  const dogSpan = document.createElement("span");
  dogSpan.innerText = dog.name;

  dogBar.append(dogSpan);

  const dogInfoDiv = document.querySelector("#dog-info");

  dogSpan.addEventListener("click", function (event) {
    let buttonName;
    if (dog.isGoodDog === true) {
      buttonName = "Good Dog!";
    } else {
      buttonName = "Bad Dog!";
    }

    dogInfoDiv.innerHTML = `
            <img src=${dog.image}>
            <h2>${dog.name}</h2>
            <button>${buttonName}</button>
        `;

    const button = dogInfoDiv.querySelector("button");
    button.addEventListener("click", function (event) {
      let bool = true;
      if (button.innerText === "Good Dog!") {
        button.innerText = "Bad Dog!";
      } else {
        button.innerText = "Good Dog!";
        bool = false;
      }

      updateGoodDog(dog, bool);
    });
  });
}

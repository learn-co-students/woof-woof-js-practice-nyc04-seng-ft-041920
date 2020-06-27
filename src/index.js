//fetch puppy object here 
const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')
const filter = document.getElementById('good-dog-filter');
url = "http://localhost:3000/pups"
fetch(url).then(response => response.json()).then(response => {
    response.forEach(element => {
        let dogType = null
        element.isGoodDog === true ? dogType = 'Good Dog!' : dogType = 'Bad Dog!';
        const div = document.createElement('div')
        div.className = 'dog'
        let span = document.createElement('span')
        const img = document.createElement('img')
        const h2 = document.createElement('h2')
        const btn = document.createElement('button')
        span.innerText = element.name
        dogBar.appendChild(span)
        span.addEventListener('click', (event) => {
            img.src = element.image
            h2.innerHTML = element.name
            btn.dataset.id = element.id
            btn.innerHTML = dogType
            div.appendChild(img)
            div.appendChild(h2)
            div.appendChild(btn)
            dogInfo.appendChild(div)
        })

        btn.addEventListener('click', (event) => {
            let dogStatus = null
            if (btn.innerText === 'Bad Dog!') {
                btn.innerText = 'Good Dog!'
                dogType = 'Good Dog!'
                dogStatus = true
            } else if (btn.innerText === 'Good Dog!') {
                btn.innerText = 'Bad Dog!'
                dogType = 'Good Dog!'
                dogStatus = false
            }
            fetch(url + `/${btn.dataset.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: dogStatus
                })
            })
        })
    })
})

filter.addEventListener('click', (event) => {
    const dogDivs = document.querySelectorAll('.dog button')
    let filterStatus = null
    if (filter.innerText === 'Filter good dogs: OFF') {
        filter.innerText = 'Filter good dogs: ON'
        filterStatus = 'on'
    } else if (filter.innerText === 'Filter good dogs: ON') {
        filter.innerText = 'Filter good dogs: OFF'
        filterStatus = 'off'
    }
    dogDivs.forEach(dog => {
        if (dog.innerHTML === "Bad Dog!" && filterStatus === 'on') {
            let ele = document.querySelector(`[data-id="${dog.dataset.id}"]`)
            ele.parentElement.style.display = "none"
        } else {
            let ele = document.querySelector(`[data-id="${dog.dataset.id}"]`)
            ele.parentElement.style.display = "block"
        }
    })
})


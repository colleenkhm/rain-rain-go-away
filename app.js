const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentSunIndex = 202
let width = 15
let direction = 1
let raindropsId
let goingRight = true

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const raindrops = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw() {
    for (let i = 0; i < raindrops.length; i++) {
        squares[raindrops[i]].classList.add('raindrop')
    }
}

draw()

function remove() {
    for (let i = 0; i < raindrops.length; i++) {
        squares[raindrops[i]].classList.remove('raindrop')
    }
}

squares[currentSunIndex].classList.add('sun')

function moveSun(e) {
    squares[currentSunIndex].classList.remove('sun')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentSunIndex % width !== 0) currentSunIndex -=1
            break
        case 'ArrowRight':
            if (currentSunIndex % width < width -1) currentSunIndex +=1
        break
    }
    squares[currentSunIndex].classList.add('sun')
}
document.addEventListener('keydown', moveSun)

function moveRaindrops() {
    const leftEdge = raindrops[0] % width === 0
    const rightEdge = raindrops[raindrops.length -1] % width === width -1
    remove()

    if (rightEdge && goingRight) {
        for (let i = 0; i < raindrops.length; i++) {
            raindrops[i] += width +1
            direction = -1
            goingRight = false
        }
    }
    if (leftEdge && !goingRight) {
        for (let i = 0; i < raindrops.length; i++) {
            raindrops[i] += width -1
            direction = 1
            goingRight = true
        }
    }

    for (let i = 0; i < raindrops.length; i++) {
        raindrops[i] += direction
    }

    draw()

    if (squares[currentSunIndex].classList.contains('raindrop', 'sun')) {
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(raindropsId)
    }

    for (let i = 0; i < raindrops.length; i++) {
        if(raindrops[i] > squares.length + width) {
            resultsDisplay.innerHTML = 'GAME OVER'
            clearInterval(raindropsId)
        }
    }

}

raindropsId = setInterval(moveRaindrops, 100)
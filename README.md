# Project 1 - PacMan 

## Overview
The first of my projects on the General Assembly Software Engineering Immersive. After two weeks of learning HTML, CSS and JavaScript, we were given a week to get creative and produce a grid based game of our choice.  

I went for PacMan game as the idea that it was possible to build such a classic game after two weeks really excited me! Originally I thought I would attempt to build this in the classic 80s style, but I ended up going for the theme of 'Safari ParcMan' as I liked the idea of having more creative freedom with the styling.

So I should say now that PacMan is actually Safari-Parc-Man and the classic ghosts are lions!

[Click to play!](https://jackbdr.github.io/Project-1/)

## The Brief
* **Render a game in the browser**
* **Design logic for winning** & **visually display which player won**
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **Javascript** for **DOM manipulation**
* **Deploy your game online**, where the rest of the world can access it (we will do this together at the end of the project)
* Use **semantic markup** for HTML and CSS (adhere to best practices)

## Technologies used
* HTML5 with HTML5 audio
* CSS3 with animation
* JavaScript (ES6)
* Git
* GitHub
* Google Fonts

## Creating the grid ("arena")
The grid works as the structure of the "arena". It becomes the "arena" once walls, a border and collectable items are added. 

To first create the grid, I used a for loop which creates HTML divs and then appends them to the parent div with class of "arena". 
```ruby
  const arena = document.querySelector('.arena')
  const width = 18
  const sqCount = width * width
  const sqs = []
  createArena()
  
    function createArena() {
    for (let i = 0; i < sqCount; i++) {
      const sq = document.createElement('div')
      sq.id = i
      arena.appendChild(sq)
      sqs.push(sq)
    }
    addZooman(zoomanStart)
  }
```
With the help of flexbox CSS styling, this simply creates an 18 by 18 grid.

Please see below for how I added walls, a border of trees, a holding place for the lions and collectable items.
```ruby
  // trees 
  const treeClass = 'tree'
  const edgeSqs = sqs.filter(sq => (parseFloat(sq.id) % width === 0 && parseFloat(sq.id) !== 144) || parseFloat(sq.id) < width || (parseFloat(sq.id) % width === width - 1 && parseFloat(sq.id) !== 161) || parseFloat(sq.id) + width > sqCount)
  edgeSqs.forEach(sq => sq.classList.add(treeClass))

  // rocks
  const rockClass = 'rock'
  const rockSqs = [sqs[26], sqs[27], sqs[38], sqs[39], sqs[40], sqs[42], sqs[44], sqs[45], sqs[47], sqs[49], sqs[50], sqs[51], sqs[56], sqs[60], sqs[62], sqs[63], sqs[65], sqs[69], sqs[74], sqs[76], sqs[78], sqs[83], sqs[85], sqs[87], sqs[94], sqs[96],
  sqs[97], sqs[100], sqs[101], sqs[103], sqs[110], sqs[111], sqs[112], sqs[121], sqs[122], sqs[123], sqs[132], sqs[137], sqs[146], sqs[148], sqs[150], sqs[155], sqs[157], sqs[159], sqs[164], sqs[166], sqs[168], sqs[173], sqs[175], sqs[177], sqs[184],
  sqs[188], sqs[189], sqs[193], sqs[200], sqs[202], sqs[204], sqs[205], sqs[206], sqs[207], sqs[208], sqs[209], sqs[211], sqs[213], sqs[218], sqs[224], sqs[225], sqs[231], sqs[236], sqs[238], sqs[239], sqs[240], sqs[242], sqs[243], sqs[245], sqs[246], sqs[247], sqs[249],
  sqs[254], sqs[256], sqs[260], sqs[261], sqs[265], sqs[267], sqs[272], sqs[274], sqs[276], sqs[277], sqs[278], sqs[279], sqs[280], sqs[281], sqs[283], sqs[285], sqs[292], sqs[301]]
  rockSqs.forEach(sq => sq.classList.add(rockClass))

  //  add bed (holding place)
  sqs[134].classList.add('bedtopleft')
  sqs[135].classList.add('bedtopright')
  sqs[152].classList.add('bedbottomleft')
  sqs[153].classList.add('bedbottomright')
  
  // mess
  const messClass = 'mess'
  const messSqs = sqs.filter(sq => sq.classList.contains(rockClass) !== true && sq.classList.contains(treeClass) !== true && sq.classList.contains('bedtopleft') !== true && sq.classList.contains('bedtopright') !== true && sq.classList.contains('bedbottomleft') !== true && sq.classList.contains('bedbottomright') !== true)
  messSqs.forEach(sq => sq.classList.add(messClass))
  sqs[223].classList.remove(messClass)

  // sandwiches
  const sandwichClass = 'sandwich'
  const sandwichSqs = [sqs[19], sqs[34], sqs[289], sqs[304]]
  sandwichSqs.forEach(sq => sq.classList.add(sandwichClass))
```
We now have the "arena" complete:

![Screenshot 2022-07-01 at 16 31 13](https://user-images.githubusercontent.com/101710474/176925196-43aceb7d-f942-4ae0-a3dd-3049b35ecdcc.png)

## Movement
### Player Movement
The player needs to be able to move into any square of the grid that isn't a wall or border. To accomplish this, I first added a class of "moveable" to a all the "mess" squares, as this set of squares is exactly all of the squares that aren't a wall or border. 

```ruby
  // * make each messSq have a certain class so zooman or lions can move into them 
  messSqs.forEach(sq => sq.classList.add('moveable'))
```
Below is the start of the function "zoomanMovement". The rest of the function controls collision detection but I will focus on this in the next section. Displayed here is the logic which allows the player to move around "moveable" squares with the arrow keys. The logic checks to see whether the square that the player is trying to move into contains the class "moveable". If it does, then the player will move and if not, the player's position will stay the same. Also, please see the last two "else ifs" of this code block. This is the logic which allows the player to go off one side of the board and appear again on the opposite side. 
```ruby
  function zoomanMovement(event) {
    const key = event.keyCode
    const left = 37
    const right = 39
    const up = 38
    const down = 40

    if (key === left && sqs[zoomanCurrent - 1].classList.contains('moveable') === true) {
      removeZooman(zoomanCurrent)
      zoomanCurrent--
    } else if (key === right && sqs[zoomanCurrent + 1].classList.contains('moveable') === true) {
      removeZooman(zoomanCurrent)
      zoomanCurrent++
    } else if (key === up && sqs[zoomanCurrent - width].classList.contains('moveable') === true) {
      removeZooman(zoomanCurrent)
      zoomanCurrent -= width
    } else if (key === down && sqs[zoomanCurrent + width].classList.contains('moveable') === true) {
      removeZooman(zoomanCurrent)
      zoomanCurrent += width
    } else if (key === left && parseFloat(sqs[zoomanCurrent].id) === 144) {
      removeZooman(zoomanCurrent)
      zoomanCurrent = 161
    } else if (key === right && parseFloat(sqs[zoomanCurrent].id) === 161) {
      removeZooman(zoomanCurrent)
      zoomanCurrent = 144
    } else {
      zoomanCurrent
    }
```
### Lion Movement
The four lions are created with a class contructor: 
```ruby
  class Lion {
    constructor(lionStart, speed) {
      this.lionStart = lionStart
      this.speed = speed
      this.lionCurrent = lionStart
      this.lionTick = NaN
      this.lionRun = false
    }
  }
  let lions = [
    new Lion(134, 225),
    new Lion(135, 225),
    new Lion(152, 225),
    new Lion(153, 225)
  ]
```
Before focusing the the lions' movement I will quickly explain what happens when the player eats a sandwich as this will better explain why the lions' movement function is split into an "else if". When a sandwich is eaten, "lionRun" on all lions is set to true:
```ruby
    if (sqs[zoomanCurrent].classList.contains(zoomanClass && sandwichClass)) {
      sqs[zoomanCurrent].classList.remove(sandwichClass)
      sqs[zoomanCurrent].classList.remove(messClass)
      score += 100
      scoreNum.innerHTML = score
      munchPlay()
      lions.forEach(lion => lion.lionRun = true)
      setTimeout(lionsBackToNorm, 8000)
    }
```
We can then use this boolean in the lions' movement function to give a class of "lionrun" to the lions if "lionRun" is true. This class has CSS styling which causes the lions to flash. 

Creating the lions in this way enabled me to create one function that controls all four of the lions' movement at the same time: 
```ruby
  function moveLion(lion) {
    const directions = [+ 1, - 1, + width, - width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    setTimeout(() => {
      lion.lionTick = setInterval(() => {
        if (gameOver === false) {
          // if lionCurrent + direction is available then move into that space 
          if ((sqs[lion.lionCurrent + direction].classList.contains('moveable') || sqs[lion.lionCurrent + direction].classList.contains('lionMoveable')) && sqs[lion.lionCurrent + direction].classList.contains(lionClass) !== true && lion.lionRun !== true) {
            removeLion(lion.lionCurrent)
            sqs.forEach(sq => sq.classList.remove('lionrun'))
            lion.lionCurrent += direction
            addLion(lion.lionCurrent)
          } else if ((sqs[lion.lionCurrent + direction].classList.contains('moveable') || sqs[lion.lionCurrent + direction].classList.contains('lionMoveable')) && sqs[lion.lionCurrent + direction].classList.contains(lionClass) !== true && lion.lionRun === true) {
            removeLion(lion.lionCurrent)
            sqs[lion.lionCurrent].classList.remove('lionrun')
            lion.lionCurrent += direction
            addLion(lion.lionCurrent)
            sqs[lion.lionCurrent].classList.add('lionrun')
          } else {
            direction = directions[Math.floor(Math.random() * directions.length)]
          }

          if (score > 2000 && speedIncrease < lions.length) {
            speedIncrease++
            lion.speed = 150
            clearInterval(lion.lionTick)
            lions.forEach(lion => sqs[lion.lionCurrent].classList.add('lionrun'))
            setTimeout(() => {
              lions.forEach(lion => sqs[lion.lionCurrent].classList.remove('lionrun'))
            }, 500)
            moveLion(lion)
          }
          // zooman and lion collision
          zoomanHitLion(lion)
          // if no mess left
          gameWon(lion)
          // if energy reaches 0, then GameOver!!
          gameOverFunc(lion)
        }
      }, lion.speed)
    }, 1000)
  }
```
The direction here is simply generated randomly, whereas I originally wanted to create intelligent movement. I will speak more about this at the end of the ReadMe! Once the direction is randomly selected, the function checks to see if there is a wall, a tree or another lion. If there isn't, the lion will move and if there is, a direction is randomly selected again. 

### Collision detection between player and lions





Collision detection
- general collision detection (short)
- if collision between lion and zooman when no sandwich eaten
- if collision between lion and zooman when sandwich eaten

Restart game

What was main struggles, what have you learnt, future improvements

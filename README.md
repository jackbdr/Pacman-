# Project 1 - PacMan 

## Overview
The first of my projects on the General Assembly Software Engineering Immersive. After two weeks of learning HTML, CSS and JavaScript, we were given a week to get creative and produce a grid based game of our choice.  

I went for PacMan game as the idea that it was possible to build such a classic game after two weeks really excited me! Originally I thought I would attempt to build this in the classic 80s style, but I ended up going for the theme of 'Safari ParcMan' as I liked the idea of having more creative freedom with the styling.

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
The grid works as the base of the "arena". Using a for loop, HTML divs are created and then appended to the parent div with class of "arena". 
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
      // sq.innerText = i
      arena.appendChild(sq)
      sqs.push(sq)
    }
    addZooman(zoomanStart)
    // addLion(lionStart)
  }
```
With the help of flexbox CSS styling, this simply creates an 18 by 18 grid. However, I needed to 


section1 - what each day consisted of

section2 - what each language does

section3 - short psuedocode of each event (e.g. clicking start button or arrow up)

section4 - what was main struggles, what have you learnt, future improvements

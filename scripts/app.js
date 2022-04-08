function init() {
  

  // * Character set-up
  const zoomanClass = 'zooman'
  const startPosition = 224
  let currentPosition = startPosition



  //  ***** Create Arena top *****
  const arena = document.querySelector('.arena')

  const width = 18
  const sqCount = width * width
  const sqs = []

  function createArena() {
    for (let i = 0; i < sqCount; i++) {
      const sq = document.createElement('div')
      sq.id = i
      sq.innerText = i
      arena.appendChild(sq)
      sqs.push(sq)
    }
    addZooman(startPosition)
  }
  createArena()


  // * Add trees to arena

  const treeClass = 'tree'
  const edgeSqs = sqs.filter(sq => (parseFloat(sq.id) % width === 0 && parseFloat(sq.id) !== 144) || parseFloat(sq.id) < width || (parseFloat(sq.id) % width === width - 1 && parseFloat(sq.id) !== 161) || parseFloat(sq.id) + width > sqCount)
  edgeSqs.forEach(sq => sq.classList.add(treeClass))


  //  * add bed (holding place)
  sqs[134].classList.add('bedtopleft')
  sqs[135].classList.add('bedtopright')
  sqs[152].classList.add('bedbottomleft')
  sqs[153].classList.add('bedbottomright')



  // * add rocks (walls)
  const rockClass = 'rock'
  const rockSqs = [sqs[38], sqs[39], sqs[40], sqs[42], sqs[44], sqs[45], sqs[47], sqs[49], sqs[50], sqs[51], sqs[56], sqs[60], sqs[62], sqs[63], sqs[65], sqs[69], sqs[74], sqs[76], sqs[78], sqs[80], sqs[81], sqs[83], sqs[85], sqs[87], sqs[94], sqs[96],
    sqs[98], sqs[99], sqs[101], sqs[103], sqs[109], sqs[111], sqs[112], sqs[121], sqs[122], sqs[124], sqs[132], sqs[137], sqs[146], sqs[148], sqs[150], sqs[155], sqs[157], sqs[159], sqs[164], sqs[166], sqs[168], sqs[173], sqs[175], sqs[177], sqs[184],
    sqs[188], sqs[189], sqs[193], sqs[200], sqs[202], sqs[203], sqs[204], sqs[206], sqs[207], sqs[209], sqs[210], sqs[211], sqs[213], sqs[218], sqs[231], sqs[236], sqs[238], sqs[239], sqs[240], sqs[242], sqs[243], sqs[245], sqs[246], sqs[247], sqs[249],
    sqs[254], sqs[256], sqs[260], sqs[261], sqs[265], sqs[267], sqs[272], sqs[274], sqs[276], sqs[277], sqs[278], sqs[279], sqs[280], sqs[281], sqs[283], sqs[285]]
  rockSqs.forEach(sq => sq.classList.add(rockClass))


  // * add mess 
  const pooClass = 'poo'
  const pooSqs = sqs.filter(sq => sq.classList.contains(rockClass) !== true && sq.classList.contains(treeClass) !== true && sq.classList.contains('bedtopleft') !== true && sq.classList.contains('bedtopright') !== true && sq.classList.contains('bedbottomleft') !== true && sq.classList.contains('bedbottomright') !== true)
  pooSqs.forEach(sq => sq.classList.add(pooClass))
  sqs[224].classList.remove(pooClass)


  // * add sandwich treat
  const sandwichClass = 'sandwich'
  const sandwichSqs = [sqs[19], sqs[34], sqs[289], sqs[304]]
  sandwichSqs.forEach(sq => sq.classList.add(sandwichClass))

// ***** create arena bottom *****

  // * Add zooman 
  function addZooman(position) {
    sqs[position].classList.add(zoomanClass)
  }

  // * Remove zooman
  function removeZooman(position) {
    sqs[position].classList.remove(zoomanClass)
  }



  // * movement function *

  // score variables
  let score = 0
  const scoreNum = document.querySelector('#scorenum')

  pooSqs.forEach(sq => sq.classList.add('moveable'))

  function zoomanMovement(event) {

    const key = event.keyCode
    const left = 37
    const right = 39
    const up = 38
    const down = 40

    if (key === left && sqs[currentPosition - 1].classList.contains('moveable') === true) {
      removeZooman(currentPosition)
      currentPosition--
    } else if (key === right && sqs[currentPosition + 1].classList.contains('moveable') === true) {
      removeZooman(currentPosition)
      currentPosition++
    } else if (key === up && sqs[currentPosition - width].classList.contains('moveable') === true) {
      removeZooman(currentPosition)
      currentPosition -= width
    } else if (key === down && sqs[currentPosition + width].classList.contains('moveable') === true) {
      removeZooman(currentPosition)
      currentPosition += width
    } else if (key === left && parseFloat(sqs[currentPosition].id) === 144) {
      removeZooman(currentPosition)
      currentPosition = 161
    } else if (key === right && parseFloat(sqs[currentPosition].id) === 161) {
      removeZooman(currentPosition)
      currentPosition = 144
    } else {
      currentPosition
    }
    
    // * eating sandwich

    if (sqs[currentPosition].classList.contains(zoomanClass && sandwichClass)) {
      sqs[currentPosition].classList.remove(sandwichClass)
      sqs[currentPosition].classList.remove(pooClass)
      score += 100
      scoreNum.innerHTML = score
      // * change of movement in 'ghosts' here??? 
      // as 'here' is 'less global' will it override the big setInterval function used for normal ghost movement ???
      // can call func here and write it somewhere else
    }

    // * clearing mess

    if (sqs[currentPosition].classList.contains(zoomanClass && pooClass)) {
      sqs[currentPosition].classList.remove(pooClass)
      score += 19
      scoreNum.innerHTML = score
    }






    addZooman(currentPosition)
  }

  
  

  





  document.addEventListener('keydown', zoomanMovement)






}

window.addEventListener('DOMContentLoaded', init)
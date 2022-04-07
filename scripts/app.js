function init() {


  //  * Create Arena
  const arena = document.querySelector('.arena')

  const width = 18
  const cellCount = width * width
  const sqs = []
  
  function createArena() {
    for (let i = 0; i < cellCount; i++) {
      const sq = document.createElement('div')
      sq.id = i 
      arena.appendChild(sq)
      sqs.push(sq)
    }
  }
  createArena()































}

window.addEventListener('DOMContentLoaded', init)
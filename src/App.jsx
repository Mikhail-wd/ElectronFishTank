import { useState, useRef } from 'react';
import Tank from "./img/tank.png"
import fish1_left from "./img/fish_1_left.png"
import fish2_left from "./img/fish_2_left.png"
import fish3_left from "./img/fish_3_left.png"
import fish4_left from "./img/fish_4_left.png"
import fish5_left from "./img/fish_5_left.png"
import fish6_left from "./img/fish_6_left.png"
import fish1_right from "./img/fish_1_right.png"
import fish2_right from "./img/fish_2_right.png"
import fish3_right from "./img/fish_3_right.png"
import fish4_right from "./img/fish_4_right.png"
import fish5_right from "./img/fish_5_right.png"
import fish6_right from "./img/fish_6_right.png"
import coral1 from "./img/coral_1.png"
import coral2 from "./img/coral_2.png"
import coral3 from "./img/coral_3.png"
import weed from "./img/weed_1.png"
import submarine_left from "./img/submarin_left.png"
import submarine_right from "./img/submarin_right.png"
import './App.css'

import { useEffect } from 'react';


function App() {
  const canvas = document.getElementById("canvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const ctx = canvas.getContext("2d")
  const tank = new Image()
  tank.src = Tank
  const crabsAmount = []
  const bubbleTrail = []
  const fishAmount = []
  const coralsAmount = []
  const coralsAmountBackground = []
  const bubles = []
  const positionX = (Math.random() * 10) / 2

  class Fish {
    constructor(direction = Math.random() * 11) {
      this.width = 100
      this.height = 80
      this.fish = new Image()
      this.speedX = Math.ceil((Math.random() * 11))
      this.direction = direction
      this.arrLeft = [fish1_left, fish2_left, fish3_left, fish4_left, fish5_left, fish6_left, fish6_left]
      this.arrRight = [fish1_right, fish2_right, fish3_right, fish4_right, fish5_right, fish6_right, fish6_right]
      this.x = this.direction <= 5 ? canvas.width + 250 : -250
      this.y = Math.random() * canvas.height - 100 <= 0 ? Math.random() * 200 : Math.random() * canvas.height - 230
      this.fish.src = this.direction <= 5 ? this.arrLeft[Math.ceil(Math.random() * 6)] : this.arrRight[Math.ceil(Math.random() * 6)]
    }
    move_left() {
      this.x -= this.speedX
    }
    move_right() {
      this.x += this.speedX
    }
    draw() {
      ctx.drawImage(this.fish, this.x, this.y, this.width, this.height)
      if (this.direction <= 5) {
        this.move_left();
      } else {
        this.move_right();
      }
    }
  }
  class Crab {
    constructor() {
      this.scale = {
        width: 60,
        height: 40
      }
      this.crab = new Image()
      this.speedX = Math.ceil((Math.random() * 10) / 2 + 7)
      this.direction = Math.random() * 10
      this.x = this.direction <= 5 ? canvas.width + (Math.random() * 11) + 100 : (Math.random() * 11) - 100
      this.y = Math.random() * canvas.height - 300 <= 0 ? 300 : Math.ceil(Math.random() * canvas.height - 430)
      this.crab.src = this.direction <= 5 ? "./img/crab_left.png" : "./img/crab_right.png"
    }
    move_left() {
      this.x -= this.speedX
    }
    move_right() {
      this.x += this.speedX
    }
    draw(value) {
      ctx.drawImage(this.crab, this.x, this.y, this.scale.width, this.scale.height)
      if (this.direction <= 5) {
        this.move_left();
        this.y += Math.sin(value) * 10
      } else {
        this.move_right();
        this.y += Math.sin(value) * 10
      }
    }
  }

  class Submarine {
    constructor() {
      this.bubbleTrailInterval = 200
      this.width = 300
      this.height = 110
      this.submarine = new Image()
      this.speedX = Math.ceil((Math.random() * 10) / 2 + 3)
      this.direction = Math.ceil(Math.random() * 10)
      this.x = this.direction <= 5 ? canvas.width + (Math.random() * 11) + 300 : (Math.random() * 11) - 300
      this.y = Math.random() * canvas.height - 100 <= 0 ? Math.random() * 200 : Math.random() * canvas.height - 230
      this.submarine.src = this.direction <= 5 ? submarine_left : submarine_right
    }
    move_left() {
      this.x -= this.speedX
      if (this.bubbleTrailInterval <= 1) {
        for (let x = 0; x < 3; x++) {
          bubles.push(new Bubble((Math.random() * 10) / 2, this.x + 280, this.y + 73))
        }
        this.bubbleTrailInterval += 200
      } else (
        this.bubbleTrailInterval -= this.speedX + 55
      )
    }
    move_right() {
      this.x += this.speedX
      if (this.bubbleTrailInterval <= 0) {
        for (let x = 0; x < 3; x++) {
          bubles.push(new Bubble((Math.random() * 10) / 2, this.x, this.y + 73))
        }
        this.bubbleTrailInterval += 200
      } else (
        this.bubbleTrailInterval -= this.speedX + 55
      )

    }
    draw() {
      ctx.drawImage(this.submarine, this.x, this.y, this.width, this.height)
      if (this.direction <= 5) {
        this.move_left();
      } else {
        this.move_right();
      }
    }
  }

  class Bubble {
    constructor(speed, positionX, positionY = canvas.height - 180) {
      this.size = Math.random() * 5
      this.x = positionX
      this.y = positionY
      this.speedX = speed * Math.random() + 2
      this.round = [
        4, 0, 2 * Math.PI
      ]
    }
    move_up() {
      this.y -= this.speedX
      this.x += (Math.random() * 10 <= 5 ? -0.8 : +0.8)
      this.changeSize(this.y)
    }
    changeSize(value) {
      if (value < 800) {
        this.round = [5, 0, 2 * Math.PI]
      } if (value < 600) {
        this.round = [8, 0, 2 * Math.PI]
      } if (value < 400) {
        this.round = [9, 0, 2 * Math.PI]
      } if (value < 200) {
        this.round = [11, 0, 2 * Math.PI]
      }
    }
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, ...this.round)
      ctx.strokeStyle = "#ffffff8a"
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(this.x - 3, this.y - 3, this.round[0] - this.round[0] / 1.5, ...this.round.slice(1, 3))
      ctx.fillStyle = "#ffffff8a"
      ctx.fill()
      this.move_up()
    }
  }

  class Coral {
    constructor() {
      this.width = 350
      this.heigth = 350
      this.weed = new Image()
      this.arr = [coral1, coral2, coral3, coral3]
      this.weed.src = this.arr[Math.ceil(Math.random() * 3)]
      this.x = Math.random() * canvas.width
      this.y = canvas.height - 430
    }
    draw() {
      ctx.drawImage(this.weed, this.x, this.y, this.width, this.heigth)
    }
  }
  for (let x = 0; x < 1; x++) {
    crabsAmount.push(new Submarine())
  }
  for (let x = 0; x < 12; x++) {
    fishAmount.push(new Fish())
  }
  for (let x = 0; x < 3; x++) {
    coralsAmount.push(new Coral())
  }
  for (let x = 0; x < 6; x++) {
    coralsAmountBackground.push(new Coral())
  }
  for (let x = 0; x < 15; x++) {
    bubles.push(new Bubble((Math.random() * 10) / 2, positionX * (canvas.width / 2 + 300)))
  }


  function animate() {
    ctx.drawImage(tank, 0, 0, canvas.width, canvas.height)
    bubbleTrail.map(element =>
      element.draw()
    )
    bubles.map(element =>
      element.draw()
    )
    crabsAmount.map(element =>
      element.draw()
    )
    coralsAmountBackground.map(element =>
      element.draw()
    )
    fishAmount.map(element =>
      element.draw()
    )
    coralsAmount.map(element =>
      element.draw()
    )
  }

  useEffect(() => {
    setInterval(() => {
      animate()
    }, 42)

    setInterval(() => {
      for (let x = 0; x < 18; x++) {
        fishAmount.push(new Fish())
      }
    }, 8000);

    setInterval(() => {
      let positionX = (Math.random())
      for (let x = 0; x < 15; x++) {
        bubles.push(new Bubble((Math.random() * 10) / 2, (positionX * canvas.width)))
      }
    }, 3000);

    setInterval(() => {
      for (let x = 0; x < 1; x++) {
        crabsAmount.push(new Submarine())
      }
    }, 20000)

    setInterval(() => {
      bubles.map((element, index) => {
        if (element.y < -5) {
          bubles.splice(index, 1)
        }
      })
      fishAmount.map((element, index) => {
        if (element.x <= - 300 || element.x >= canvas.width + 300) {
          fishAmount.splice(index, 1)
        }
      })
      crabsAmount.map((element, index) => {
        if (element.x <= -510 || element.x >= canvas.width + 20) {
          crabsAmount.splice(index, 1)
        }
      })
    }, 10000)
  }, [])
  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  )
}
export default App

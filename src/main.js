let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let lineWidth = 5

autoSetCanvasSize(canvas)

listenToUser(canvas)

let eraserEnabled = false
eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
clear.onclick = function () {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

black.onclick = function () {
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
red.onclick = function () {
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')
}
green.onclick = function () {
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')
}
blue.onclick = function () {
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  green.classList.remove('active')
  red.classList.remove('active')
  black.classList.remove('active')
}

thin.onclick = function () {
  lineWidth = 5
  thin.classList.add('active')
  thick.classList.remove('active')
}
thick.onclick = function () {
  lineWidth = 10
  thick.classList.add('active')
  thin.classList.remove('active')
}

function drawLine (x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = lineWidth
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

function drawCricle (x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}

function autoSetCanvasSize (canvas) {
  canvasSize()
  window.onresize = function () {
    canvasSize()
  }

  function canvasSize () {
    let pageWidth = document.documentElement.clientWidth
    let pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function listenToUser (canvas) {

  let using = false
  let lastPoint = {
    x: undefined,
    y: undefined
  }
  if (document.body.ontouchstart === undefined) {
    canvas.onmousedown = function (a) {
      let x = a.clientX
      let y = a.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          x: x,
          y: y
        }
      }
    }
    canvas.onmousemove = function (a) {
      let x = a.clientX
      let y = a.clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        let newPoint = {
          x: x,
          y: y
        }
        drawCricle(x, y, lineWidth / 2)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function () {
      using = false
    }
  } else {
    canvas.ontouchstart = function (a) {
      let x = a.touches[0].clientX
      let y = a.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          x: x,
          y: y
        }
      }
    }
    canvas.ontouchmove = function (a) {
      let x = a.touches[0].clientX
      let y = a.touches[0].clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        let newPoint = {
          x: x,
          y: y
        }
        drawCricle(x, y, lineWidth / 2)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function () {
      using = false
    }
  }
}
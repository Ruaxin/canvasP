let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

autoSetCanvasSize(canvas)
listenToUser(canvas)
let eraserEnabled = false

eraser.onclick = function () {
  eraserEnabled = true
  actions.className = 'actions x'
}

brush.onclick = function () {
  eraserEnabled = false
  actions.className = 'actions'
}

function drawLine (x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = 5
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
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
    canvas.onmousedown = function (point) {
      let x = point.clientX
      let y = point.clientY
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
    canvas.onmousemove = function (point) {
      let x = point.clientX
      let y = point.clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        let newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function () {
      using = false
    }
  } else {
    canvas.ontouchstart = function (point) {
      let x = point.touches[0].clientX
      let y = point.touches[0].clientY
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
    canvas.ontouchmove = function (point) {
      let x = point.touches[0].clientX
      let y = point.touches[0].clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        let newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function () {
      using = false
    }
  }
}
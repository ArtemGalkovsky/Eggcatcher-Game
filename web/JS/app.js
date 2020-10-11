const canvas = document.querySelector(".canvas")

const c = canvas.getContext("2d")

const w = canvas.width = canvas.offsetWidth
const h = canvas.height = canvas.offsetHeight

function drawBg () {
	c.fillStyle = "#43cffa"
	c.fillRect(0, 0, 700, 500)

	c.fillStyle = "#15b046"
	c.fillRect(0, 500, 700, 200)
}


function createEgg (x, y, color, w, h) {
	
	c.beginPath()
	c.fillStyle = `rgb(${color.join(", ")})`
	c.ellipse(x, y, w, h, 0, 0, Math.PI * 2)
	c.fill()
	return [x, y, color]
}

function createBasket (x, y, w, h) {
	c.lineWidth = 10
	c.strokeStyle = "#916e0c"
	c.fillStyle = "#916e0c"
	c.ellipse(x, y, w, h, 0, 0 * Math.PI / 180,  180 * Math.PI / 180)
	c.stroke()
	c.fill()
}

var canvasObject = {
	"basket": [350, 570, 4, 60, 90],
	"eggs": []
}

function movePlatform (event) {
	let key = event.key
	if (key === "ArrowRight") {
		canvasObject["basket"][0] += canvasObject["basket"][2]
	} else if (key === "ArrowLeft") {
		canvasObject["basket"][0] -= canvasObject["basket"][2]
	}
}

window.addEventListener("keydown", (event) => {movePlatform(event)})

var time = 0
var dy = 2
var health = 5
var points = 0
var pointsIgnore = [0]

function animation () {
	c.beginPath()
	c.clearRect(0, 0, w, 700, 700)
	drawBg()

	canvasObject["eggs"].forEach((item, index) => {
		createEgg(item[0], item[1], item[2], item[3], item[4])
		if (item[1] + 30 > 700) {
			canvasObject["eggs"].splice(index, 1)
		
			--health
		}

		if ((canvasObject["basket"][0] - canvasObject["basket"][3] < item[0] &&
		 item[0] < canvasObject["basket"][0] + canvasObject["basket"][3]) && (canvasObject["basket"][1] < item[1] + item[4])) {
			console.log("COLLIDE")
			++points
			canvasObject["eggs"].splice(index, 1)
		}

		item[1] += dy
	})

	c.beginPath()

	createBasket(canvasObject["basket"][0], canvasObject["basket"][1], canvasObject["basket"][3], canvasObject["basket"][4])

	c.fillStyle = "#e3ae1b"
	c.font = "60px Arial"
	c.textAlign = 'left'

	c.fillText(points, 30, 50)

	c.fillStyle = "#ff2a00"
	c.textAlign = 'right'
	c.fillText(health, canvas.width - 30, 50)

	time += 1
	if (time === 60 * 5) {
		time = 0
		let x = Math.random() * (680 - 20 + 1) + 20
		let y = Math.random() * (300 - 20 + 1) + 20
		let color = [Math.random() * (255 + 1), Math.random() * (255 + 1), Math.random() * (255 + 1)]
		canvasObject["eggs"].push([x, y, color, 30, 50])
	}

	if ((points / 5 === 1) && !(pointsIgnore.includes(points))) {
		console.log('FUNC')
		dy += 1
		pointsIgnore.push(points)
		console.log('FUNC')
	}

	const tm = setTimeout(() => {requestAnimationFrame(animation)}, 16.6)

	if (health === 0) {
		clearTimeout(tm)	
	}
}

animation()
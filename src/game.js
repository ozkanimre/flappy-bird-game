const cvs = document.getElementById("game")
const ctx = cvs.getContext("2d")

//player properties
const player = {
    x: 40,
    y: cvs.height / 2 - 15,
    w: 30,
    h: 30,
    src: 'smiley.gif',
    score: 0
}

//colum1 properties
const column1 = {
    x: 400,
    y: cvs.height / 2,
    w: 100,
    h: 250,
    speed: 2
}

//colum2 properties
const column2 = {
    x: 850,
    y: 0,
    w: 100,
    h: 250,
    speed: 2
}





//draw text
const drawText = (text, x, y, color) => {
    ctx.fillStyle = color
    ctx.font = '20px sans-serif'
    ctx.fillText(text, x, y)
}

//draw rectangle

const drawRect = (x, y, w, h, color) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
}

//check if up and down arrow keys pressed
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        player.src = 'angry.gif'
        player.y -= 15
    }
    else if (e.keyCode == '40') {
        player.src = 'angry.gif'
        player.y += 5
    }
}
document.onkeyup = checkKeyUp;
function checkKeyUp(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        player.src = 'smiley.gif'
    }
    else if (e.keyCode == '40') {
        player.src = 'smiley.gif'
    }
}

//check collision
const collision = (p, c1, c2) => {
    p.left = p.x
    p.right = p.x + p.w
    p.top = p.y
    p.bottom = p.y + p.h

    c1.left = c1.x
    c1.right = c1.x + c1.w
    c1.left = c1.x
    c1.top = c1.y

    c2.left = c2.x
    c2.right = c2.x + c2.w
    c2.left = c2.x
    c2.bottom = c2.h


    if (p.bottom > c1.top && Math.abs(c1.left - p.right) < 2) {
        console.log('true')
        return true
    } else if (c1.top - p.bottom < 1 && p.right > c1.left && p.left < c1.right) {
        console.log('true')
        return true
    } else if (p.top < c2.bottom && Math.abs(c2.left - p.right) < 0) {
        console.log('true')
        return true
    } else if (p.top - c2.bottom < 1 && p.right > c2.left && p.left < c2.right) {
        console.log('true')
        return true
    }
}

//components state update function
const update = () => {
    //gravity and score
    player.score += 1
    player.y += 2

    //column move
    column1.x -= column1.speed;
    if (column1.x + column1.w < 0) {
        column1.x = cvs.width
    }
    column2.x -= column2.speed;
    if (column2.x + column2.w < 0) {
        column2.x = cvs.width
    }


    //make game harder at some point
    if (player.score > 200 && player.score < 500) {
        column1.speed = 3
        column2.speed = 3
    } else if (player.score > 500 && player.score < 1000) {
        column1.speed = 5
        column2.speed = 5
    } else if (player.score > 1000) {
        column1.speed = 7
        column2.speed = 7
    }


    //check collision
    if (collision(player, column1, column2)) {
        clearInterval(interval)
    }

    //check if player touched the ground
    if (player.y + player.h > cvs.height) {
        clearInterval(interval)
    }

    //stop player when it go too much up 
    if (player.y < 50) {
        player.y += 15
    }

}





//render function
const render = () => {
    //game area
    let gameArea = new Image()
    gameArea.src = 'bg.png'
    ctx.drawImage(gameArea, 0, 0)

    //scoreboard
    drawText('Score : ' + player.score, 10, 50, "white")

    //player 
    let p = new Image()
    p.src = player.src
    ctx.drawImage(p, player.x, player.y)

    //column 1
    let c1 = new Image()
    c1.src = 'bottom.png'
    ctx.drawImage(c1, column1.x, column1.y)

    //column 2
    let c2 = new Image()
    c2.src = 'top.png'
    ctx.drawImage(c2, column2.x, column2.y)


}


const game = () => {
    update()
    render()
}

const interval = setInterval(game, 20)

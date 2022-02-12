// making the button dynamic allowing to hide and reveal the rules with a click of a button
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');


//Rules and close event handlers
rulesBtn.addEventListener('click', () => {
       rules.classList.add('show')
});

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
})

//Create canvas context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Create and draw ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = 'goldenrod';
    ctx.fill();
    ctx.closePath();
}



//Creating and drawing paddle on canvas
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = 'goldenrod';
    ctx.closePath();
    ctx.fill();
    ctx.closePath();
}

//Create bricks
const brickRowCount = 9;
const brickColumnCount = 5;

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
        bricks[i] = [];
for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo }
    }
}
console.log(bricks)

//showing the bricks on canvas

const drawBricks = () => {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? 'black' : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    })
}

//Drawing the Score
let score = 0;
const drawScore = () => {
    let score = 0;
    ctx.font = '20px Arial';
    ctx.fillText(`Score ${score}`, canvas.width - 100, 30)
}

//Draw Everything
const draw = () => {
    drawBall();
    drawPaddle(); 
    drawScore();
    drawBricks();
}

//updating the drawing and animation
const update = () => {
    draw();

    requestAnimationFrame(update);
}

//Add update() - Animate - 
//move paddle
//Move ball
//Add wall boundaries
// Increase score when bricks break
// Lose functionality/reset Score

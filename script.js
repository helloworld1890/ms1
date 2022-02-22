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
});

//Create canvas context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Create and draw ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 1.1,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
    state: false
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

//Looping through the Array 
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
        bricks[i] = [];
for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo }
    }
}


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
    ctx.font = '20px Arial';
    ctx.fillText(`Score ${score}`, canvas.width - 100, 30)
}

//paddle animation
const movePaddle = () => {
    paddle.x += paddle.dx;

//Add wall boundaries/ wall detection
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    } if (paddle.x < 0) {
        paddle.x = 0;
    }
}

//ball animation 
const moveBall = () => {
ball.x += ball.dx;
ball.y += ball.dy;

//wall detection on the sides 
if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
}
//wall detection on the vertical path
if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
}
//paddle collision
if(ball.x + ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
}
// brick collision
bricks.forEach(column => {
    column.forEach(brick => {
        if(brick.visible) {
        if (ball.x - ball.size > brick.x && ball.x + ball.size < brick.x + brick.w &&
            ball.y + ball.size > brick.y && ball.y - ball.size < brick.y + brick.h) {
                ball.dy *= -1;
                brick.visible = false;
                increaseScore();
            }
        }
    });
    });
    //Making lose game 
    if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
    //finished all bricks
 completedBricks();
 
}

//increase the score
const increaseScore = () => {
    score++;
    if(score % (brickRowCount * brickRowCount) === 0) {
        showAllBricks();
    }
}

//resetting the bricks
const showAllBricks = () => {
    bricks.forEach(column => {
        column.forEach(brick => brick.visible = true);
    })
}

//finishing all the bricks
const completedBricks = () => {
    if (score === 45) {
        showAllBricks()
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 1.1;
        score = 0;
        alert(`You Won!`);
        
    }
}

//Draw Everything
const draw = () => {
    //clearing the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(); 
    drawScore();
    drawBricks();
}

//updating the drawing and animation
const update = () => {
    //animation to move paddle 
    movePaddle();
    //animation to move the ball
    moveBall();
    //drawing everything
    draw();
//updating the animation
    requestAnimationFrame(update);
}

update();



//keydown animation
const keyDown = (e) => {
if(e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
} else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
}
};

//keyup
const keyUp = (e) => {
if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = 0;
} 
}

//Add keyboard eventListener 
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);



//https://developer.mozilla.org/en-US/docs/Web/API/setInterval
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
////https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
//https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
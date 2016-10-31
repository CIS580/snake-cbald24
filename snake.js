"use strict";


const growthTimer = 5000;
const appleTimer = 3000;

/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();
var moveTimer = 0;
var snake = [];
var head = new Piece({x: 375, y: 235}, true, "left");
var temp1 = new Piece({x: head.position.x + 10, y: head.position.y}, false, "left");
var temp2 = new Piece({x: temp1.position.x + 10, y: temp1.position.y}, false, "left");
snake.push(temp1);
snake.push(temp2);
var move = false;
var gameOver = false;
var score = 0;
var obstacle = new Obsticle({x: 100, y: 100});
var apple = new Apple({x: head.position.x - 100, y: head.position.y});
var apple2 = new Apple({x: head.position.x - 200, y: head.position.y});
var apple3 = new Apple({x: getRandomInt(5,755), y: getRandomInt(5, 475)});
var input = {
  left: false,
  right: false,
  up: false,
  down: false
};
//hello
/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */


function loop(newTime) {
  var elapsedTime = newTime - oldTime;
  oldTime = newTime;
  update(elapsedTime);
  render(elapsedTime);
  // Flip the back buffer
  frontCtx.drawImage(backBuffer, 0, 0);
  // Run the next loop
  window.requestAnimationFrame(loop);

}

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
  if(input.up && head.direction != "down" && moveTimer <= 0)
  {
    head.direction = "up";
    snake[0].positionAtTurn = head.position;
    moveTimer = 10;
  }  
  else if(input.left && head.direction != "right" && moveTimer <= 0)
  {
    head.direction = "left";
    head.positionAtTurn = head.position;
    moveTimer = 10;
  }
  else if(input.right && head.direction != "left" && moveTimer <= 0)
  {
    head.direction = "right";
    head.positionAtTurn = head.position;
    moveTimer = 10;
  }
  else if(input.down && head.direction != "up" && moveTimer <= 0)
  {
    head.direction = "down";
    head.positionAtTurn = head.position;
    moveTimer = 10;
  }  
  var temp = head.direction;
  
  for(var i = 0; i < snake.length; i++)
  {
    if(snake[i].positionAtTurn.x == snake[i].position.x && snake[i].positionAtTurn.y == snake[i].position.y)
    {
      snake[i].positionAtTurn == snake[i].position;
      snake[i].direction = temp;
      
      if(i+1 > snake.length)
      {
        snake[i+1].positionAtTurn = snake[i].position;
      }
    }
    temp = snake[i].direction;
    snake[i].update();  
  }
  head.update();
  moveTimer--;
  checkCollisionApple(head, apple);
  checkCollisionApple(head, apple2);
  checkCollisionApple(head, apple3);
  if(head.position.x < 0 || head.position.x + 10 > 760 || head.position.y < 0 || head.position.y + 10 > 480)
  {
    gameOver = true;
  }
  checkObs(head, obstacle);
  // TODO: Spawn an apple periodically
  // TODO: Grow the snake periodically
  // TODO: Move the snake
  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  // TODO: Determine if the snake has eaten an apple
  // TODO: Determine if the snake has eaten its tail
  // TODO: [Extra Credit] Determine if the snake has run into an obstacle

}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) {
  if (gameOver)
  {
    backCtx.fillStyle = "white";
    backCtx.font = "100px Arial";
    backCtx.fillText("GAME OVER", 100, 480/2);
  }
  else{
    backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);
  backCtx.fillStyle = "black";
  backCtx.fillRect(0, 0, 760, 480);
  // TODO: Draw the game objects into the backBuffer
  head.render(backCtx);
  for(var i = 0; i < snake.length; i++)
  {
    snake[i].render(backCtx);
  }
  apple.render(backCtx);
  apple2.render(backCtx);
  apple3.render(backCtx);
  obstacle.render(backCtx);
  backCtx.fillStyle = "white";
    backCtx.font = "10px Arial";
    backCtx.fillText("Score: "+score, 7, 7);
  }
}

/* Launch the game */
window.requestAnimationFrame(loop);

window.onkeydown = function(event) {
  switch(event.key) {
    case 'ArrowUp': // up
    case 'w':
      input.up = true;
      break;
    case 'ArrowLeft': // left
    case 'a':
      input.left = true;
      break;
    case 'ArrowRight': // right
    case 'd':
      input.right = true;
      break;
    case 'ArrowDown':
    case 's':
       input.down = true;
      break;
  }
  head.cPosition = head.position;
}
 
window.onkeyup = function(event) {
  switch(event.key) {
    case 'ArrowUp': // up
    case 'w':
      input.up = false;
      break;
    case 'ArrowLeft': // left
    case 'a':
      input.left = false;
      break;
    case 'ArrowRight': // right
    case 'd':
      input.right = false;
      break;
    case 'ArrowDown':
    case 's':
      input.down = false;
      break;
  }
}

function Piece(position, isHead, direction)
{
    this.position = {
        x: position.x,
        y: position.y
    };
    this.positionAtTurn = {
      x: 0,
      y: 0
    };
    this.direction = direction;
    this.isHead = isHead;
    
}

Piece.prototype.update = function()
{
    if(this.isHead)
    {
        switch (this.direction)
        {
            case "left":
                this.position.x -= 1;
                break;
            case "right":
                this.position.x += 1;
                break;
            case "up":
                this.position.y -= 1;
                break;
            case "down":
                this.position.y += 1;
                break;
        }
    }
    else
    {
        switch (this.direction)
        {
          case "left":
            this.position = {
              x: this.position.x - 1,
              y: this.position.y
            };
            
            break;
          case "right":
            this.position = {
              x: this.position.x + 1,
              y: this.position.y
            };
            break;
          case "up":
            this.position = {
              x: this.position.x,
              y: this.position.y - 1
            };
            break;
          case "down":
            this.position = {
              x: this.position.x,
              y: this.position.y + 1
            };
            break;
        }
        
    }
}

Piece.prototype.render = function(ctx)
{
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, 10, 10);
}

function Apple(position)
{
  this.pos = { 
    x: position.x,
    y: position.y
  };
  this.height = 10;
  this.width = 10;
  this.sprite = new Image();
  this.sprite.src = 'assets/apple.png';
}

Apple.prototype.render = function(ctx)
{
  ctx.drawImage(this.sprite, 0, 0, 735, 738, this.pos.x, this.pos.y, this.height, this.width);
}

function checkCollisionApple(head, apple)
{
  if(head.position.x +9 < apple.pos.x || head.position.x + 1 > apple.pos.x + apple.width || head.position.y + 9 < apple.pos.y || head.position.y + 1 > apple.pos.y + apple.height)
  {
    return false;
  }
  apple.pos.x = getRandomInt(5,755);
  apple.pos.y = getRandomInt(5, 475);
  growSnake();
  score += 10;
  return true; 
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function growSnake()
{
  var temp = snake[snake.length - 1];
  switch(temp.direction)
  {
    case "up":
    snake.push(new Piece({x: temp.position.x, y: temp.position.y + 10}, false, "up"));
    break;
    case "left":
    snake.push(new Piece({x: temp.position.x + 10, y: temp.position.y}, false, "left"));
    break;
    case "right":
    snake.push(new Piece({x: temp.position.x - 10, y: temp.position.y}, false, "right"));
    break;
    case "down":
    snake.push(new Piece({x: temp.position.x, y: temp.position.y - 10}, false, "down"));
    break;
  }
}

function Obsticle(post)
{
  this.pos={
    x: post.x,
    y: post.y
  };
}

Obsticle.prototype.render = function(ctx)
{
  ctx.fillStyle = "red";
  ctx.fillRect(100, 100, 25, 25);
}

function checkObs(head, obs)
{
  if(head.position.x +9 < obs.pos.x || head.position.x + 1 > obs.pos.x + 25 || head.position.y + 9 < obs.pos.y || head.position.y + 1 > obs.pos.y + 25)
  {
    return false;
  }
  gameOver = true;
  return true;
}
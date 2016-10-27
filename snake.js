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
  backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);
  backCtx.fillStyle = "black";
  backCtx.fillRect(0, 0, 760, 480);
  // TODO: Draw the game objects into the backBuffer
  head.render(backCtx);
  for(var i = 0; i < snake.length; i++)
  {
    snake[i].render(backCtx);
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
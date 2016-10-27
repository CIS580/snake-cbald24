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

var snake = [];
var head = new Piece({x: 375, y: 235}, true, "left");
var temp1 = new Piece({x: head.position.x + 10, y: head.position.y}, false, "left");
var temp2 = new Piece({x: temp1.position.x + 10, y: temp1.position.y}, false, "left");
snake.push(temp1);
snake.push(temp2);
//hello
/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());

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
  head.update(head.position);
  var temp = head.position;
  var cur;
  for(var i = 0; i < snake.length; i++)
  {
    var cur = snake[i].position;
    snake[i].update(temp);
    temp = t;
  }
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
      if(head.direction != "down")
      {
        head.direction = "up";  
      }  
      break;
    case 'ArrowLeft': // left
    case 'a':
      if(head.direction != "right")
      {
        head.direction = "left";
      }   
      break;
    case 'ArrowRight': // right
    case 'd':
      if(head.direction != "left")
      {
        head.direction = "right";
      }   
      break;
    case 'ArrowDown':
    case 's':
      if(head.direction != "up")
      {
        head.direction = "down";
      }   
      break;
  }
}

window.onkeyup = function(event) {
  switch(event.key) {
    case 'ArrowUp': // up
    case 'w':
      break;
    case 'ArrowLeft': // left
    case 'a':
      break;
    case 'ArrowRight': // right
    case 'd':
      break;
    case 'ArrowDown':
    case 's':
      break;
  }
}

function Piece(position, isHead, direction)
{
    this.position = {
        x: position.x,
        y: position.y
    };
    this.direction = direction;
    this.isHead = isHead;
}

Piece.update = function(postion)
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
                this.postion.y -= 1;
                break;
            case "down":
                this.position.y += 1;
                break;
        }
    }
    else
    {
        this.postion = {
            x: postion.x,
            y: postion.y
        };
    }
}

Piece.render = function(ctx)
{
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, 10, 10);
}
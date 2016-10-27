"use strict";

/**
 * @module exports the Apple class
 */
module.exports = exports = Apple;

function Apple(position)
{
    this.position = {
        x: position.x,
        y: position.y
    };
    this.sprite = new Image();
    this.sprite.src = 'assets/apple.png';
}

Apple.prototype.render = function(ctx)
{
    ctx.drawImage();
}
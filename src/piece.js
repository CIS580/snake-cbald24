"use strict";

/**
 * @module exports the Piece class
 */
module.exports = exports = Piece;

function Piece(position, isHead, direction)
{
    this.position = {
        x: position.x,
        y: position.y
    };
    this.direction = direction;
    this.isHead = isHead;
}

Piece.prototype.update = function(postion)
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

Piece.prototype.render = function(ctx)
{
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, 10, 10);
}
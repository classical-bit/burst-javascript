canvas = document.getElementById('can');
context = canvas.getContext('2d');

canvas.width = window.innerWidth;

var Bubble = function(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = '#FFFFFF';

    this.draw = function(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2* Math.PI);
        context.closePath();
        context.fillStyle= this.color;
        context.fill();
        
    }

    this.update = function(){
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}



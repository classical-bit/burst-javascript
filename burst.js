var canvas = document.getElementById('can');
var context = canvas.getContext('2d');
var raf;

canvas.width = window.innerWidth;

var Bubble = function(x, y, radius){
    this.x = x;
    this.y = y;
    this.velocity = {
        x: Math.random() * 5 + 3,
        y: Math.random() * 5 + 3
    };
    this.radius = radius;
    this.color = '#FFFFFF';
}
Bubble.prototype.draw = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
}
Bubble.prototype.update = function () {
    if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
        this.velocity.y = -this.velocity.y
        this.wallCollision();
    }
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.velocity.x = -this.velocity.x
        this.wallCollision();
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
}
Bubble.prototype.wallCollision = function () {
    for (let index = 0; index < 10; index++) {
        drops.push(new Drop(this.x, this.y, 5))
    }
}

var Drop = function (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = '#FFFFFF';
    this.gravity = 1;
    this.energy_loss = 0.9;
    this.velocity = {
        x: Math.random() * 10 - 5,
        y: Math.random() * 30 - 15
    }
}
Drop.prototype.draw = function(){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
}
Drop.prototype.update = function () {
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.velocity.y = -this.velocity.y + this.energy_loss
    }else{
        this.velocity.y += this.gravity;
    }
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.velocity.x = -this.velocity.x
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw();
}

var bubbles;
var drops;
function init() {
    bubbles = [];
    drops = [];
    for (let i = 0; i < 2; i++) {
        bubbles.push(new Bubble(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 20 + 10
        ));
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    bubbles.forEach(bubble => {
        bubble.update();
    });

    drops.forEach(drop => {
        drop.update();
    });
    requestAnimationFrame(animate);
}

init();
animate();

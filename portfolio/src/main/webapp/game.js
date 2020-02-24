


var myVar, canvas, ctx, x, y, dx, dy, factor, color, colorStr;

function init() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    x = canvas.width/2;
    y = canvas.height-30;
    dx = 2;
    dy = -2;
    factor = 1;
    myVar = setInterval(draw, 10);
    color = ["blue", "red", "green", "orange", "black", "brown", "white"];
    colorStr = color[0];
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStar(colorStr);
    if(x + dx > canvas.width-(10*factor) || x + dx < (10*factor)) {
        dx = -dx;
    }
    if(y + dy > canvas.height-(10*factor) || y + dy < (10*factor)) {
        dy = -dy;
    }
    window.addEventListener('keydown', function (event) {
      if(event.keyCode === 67){
          //c pressed
          colorStr = color[Math.floor(Math.random() * 7)];
      }else if(event.keyCode === 83){
           factor = Math.random();
      }
    })
    x += dx;
    y += dy;
}

function drawStar(col) {
    console.log("in draw star");
    ctx.fillStyle = col;
    ctx.beginPath();
    //ctx.moveTo(108, 0.0);
    ctx.moveTo(x, y);
    
    //ctx.lineTo(141, 70);
    ctx.lineTo( x + (33 * factor), y + (70 * factor));
    
    //ctx.lineTo(218, 783);
    ctx.lineTo( x + (110 * factor), y + (78.3 * factor));
    
    //ctx.lineTo(162, 131);
    ctx.lineTo( x + (54 * factor), y + (131 * factor));
    
    //ctx.lineTo(175, 205);
    ctx.lineTo( x + (67 * factor), y + (205 * factor));
    
    
    //ctx.lineTo(108, 170);
    ctx.lineTo(x, y + (170 * factor));
    
    //ctx.lineTo(41.2, 205);
    ctx.lineTo(x - (66.8 * factor), y + (205 * factor));
    
// ctx.lineTo(55, 131);
    ctx.lineTo(x  - (53 * factor), y + (131 * factor));
    
    //ctx.lineTo(1, 78);
    ctx.lineTo(x - (107 * factor), y + (78 * factor));
    
    //ctx.lineTo(75, 68);
    ctx.lineTo(x - (33 * factor), y + (68 * factor));
    
    //ctx.lineTo(108, 0);
    ctx.lineTo(x, y);
    
    ctx.closePath();
    ctx.fill();
}

window.onload = init;
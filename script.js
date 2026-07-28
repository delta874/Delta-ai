const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let star = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30
};

let planet = {
    angle: 0,
    distance: 150,
    radius: 10,
    speed: 0.02
};

function draw() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2);
    ctx.fillStyle = "yellow";
    ctx.fill();


    let planetX = star.x + Math.cos(planet.angle) * planet.distance;
    let planetY = star.y + Math.sin(planet.angle) * planet.distance;


    ctx.beginPath();
    ctx.arc(planetX, planetY, planet.radius, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();


    planet.angle += planet.speed;

    requestAnimationFrame(draw);
}

draw();

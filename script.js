const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// CAMERA
let camera = {
    x: 0,
    y: 0,
    zoom: 1
};


// BACKGROUND STARS
let stars = [];

for (let i = 0; i < 500; i++) {

    stars.push({
        x: Math.random() * 2000 - 1000,
        y: Math.random() * 2000 - 1000,
        size: Math.random() * 2 + 1
    });

}


// STAR (our sun)
let star = {
    x: 0,
    y: 0,
    radius: 90
};


// PLANETS
let planets = [
{
    name: "Ash",
    angle: 0,
    distance: 250,
    radius: 8,
    speed: 0.05,
    color: "#555555"
},

{
    name: "Inferno",
    angle: 1,
    distance: 450,
    radius: 14,
    speed: 0.025,
    color: "#8b2e00"
},

{
    name: "Genesis",
    angle: 2,
    distance: 700,
    radius: 16,
    speed: 0.015,
    color: "#3399ff"
},

{
    name: "Titan",
    angle: 3,
    distance: 1000,
    radius: 40,
    speed: 0.008,
    color: "#c58b3c"
},

{
    name: "Frost",
    angle: 4,
    distance: 1400,
    radius: 25,
    speed: 0.004,
    color: "#66ccff"
}
];


// PINCH ZOOM
let lastDistance = null;

canvas.addEventListener("touchmove", function(e){

    if(e.touches.length === 2){

        e.preventDefault();

        let touch1 = e.touches[0];
        let touch2 = e.touches[1];

        let dx = touch2.clientX - touch1.clientX;
        let dy = touch2.clientY - touch1.clientY;

        let distance = Math.sqrt(dx * dx + dy * dy);


        if(lastDistance !== null){

            let change = distance - lastDistance;

            camera.zoom += change * 0.01;


            if(camera.zoom < 0.2){
                camera.zoom = 0.2;
            }

            if(camera.zoom > 5){
                camera.zoom = 5;
            }

        }

        lastDistance = distance;
    }

}, {passive:false});


canvas.addEventListener("touchend", function(){

    lastDistance = null;

});


// DRAW UNIVERSE
function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.save();

    // CAMERA
    ctx.translate(
        canvas.width / 2 - camera.x,
        canvas.height / 2 - camera.y
    );

    ctx.scale(camera.zoom, camera.zoom);


    // DRAW BACKGROUND STARS
    for(let i = 0; i < stars.length; i++){

        let s = stars[i];

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

    }


    // DRAW SUN
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();


    // PLANET POSITION
    let planetX = star.x + Math.cos(planet.angle) * planet.distance;
    let planetY = star.y + Math.sin(planet.angle) * planet.distance;


    // MOON POSITION
    let moonX = planetX + Math.cos(moon.angle) * moon.distance;
    let moonY = planetY + Math.sin(moon.angle) * moon.distance;


    // PLANET BODY
    let gradient = ctx.createRadialGradient(
        planetX - 3,
        planetY - 3,
        2,
        planetX,
        planetY,
        planet.radius
    );

    gradient.addColorStop(0, "#4db8ff");
    gradient.addColorStop(1, "#003366");


    ctx.beginPath();
    ctx.arc(
        planetX,
        planetY,
        planet.radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = gradient;
    ctx.fill();


    // ATMOSPHERE GLOW
    ctx.beginPath();
    ctx.arc(
        planetX,
        planetY,
        planet.radius + 3,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle = "rgba(100,200,255,0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();


    // DRAW MOON
    ctx.beginPath();
    ctx.arc(
        moonX,
        moonY,
        moon.radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#cccccc";
    ctx.fill();


    ctx.restore();


    // MOVE OBJECTS
    planet.angle += planet.speed;
    moon.angle += moon.speed;


    requestAnimationFrame(draw);

}

draw();

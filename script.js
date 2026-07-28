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
    radius: 30
};


// PLANET
let planet = {
    angle: 0,
    distance: 150,
    radius: 10,
    speed: 0.02
};


// PINCH ZOOM
let lastDistance = null;

canvas.addEventListener("touchmove", function(e){

    if(e.touches.length === 2){

        let touch1 = e.touches[0];
        let touch2 = e.touches[1];

        let dx = touch2.clientX - touch1.clientX;
        let dy = touch2.clientY - touch1.clientY;

        let distance = Math.sqrt(dx * dx + dy * dy);


        if(lastDistance){

            let change = distance - lastDistance;

            camera.zoom += change * 0.005;


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



    // DRAW PLANET
    ctx.beginPath();
    ctx.arc(planetX, planetY, planet.radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();



    ctx.restore();



    // MOVE PLANET
    planet.angle += planet.speed;


    requestAnimationFrame(draw);

}


draw();

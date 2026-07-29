let respect = 50;
let hunger = 50;


function startGame(){

document.getElementById("scene").innerHTML =
`
You awaken in the chamber.

The sound comes first.

THUMP.

THUMP.

THUMP.

Before you stands the Heart.

A god older than memory.

It waits.
`;

showChoices();

}


function showChoices(){

let choices = document.getElementById("choices");

choices.innerHTML = "";


let feed = document.createElement("button");
feed.innerHTML="Feed the Heart";

feed.onclick=function(){

respect += 10;
hunger -= 10;

document.getElementById("scene").innerHTML=
`
You give what you found to the Heart.

The chamber grows warmer.

The heartbeat becomes calmer.

But your stomach aches.
`;

};


let keep = document.createElement("button");
keep.innerHTML="Keep the food";

keep.onclick=function(){

respect -= 10;
hunger += 10;

document.getElementById("scene").innerHTML=
`
You hide the food away.

For the first time in days...

you feel like you chose yourself.

The Heart says nothing.
`;

};


choices.appendChild(feed);
choices.appendChild(keep);

}


startGame();

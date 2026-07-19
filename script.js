let memories = JSON.parse(localStorage.getItem("deltaMemory")) || [];


// VOICE

function speak(text){

    let speech = new SpeechSynthesisUtterance(text);

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    speechSynthesis.speak(speech);

}



// CHAT DISPLAY

function addMessage(sender, text, type){

    let chat = document.getElementById("chat");

    chat.innerHTML +=
    `<p class="${type}">
    <b>${sender}:</b> ${text}
    </p>`;

    chat.scrollTop = chat.scrollHeight;

}



// DELTA RESPONSE SYSTEM

function deltaResponse(message){

    let lower = message.toLowerCase();


    if(lower === "hi" || lower === "hello"){

        return "Running system diagnostic... Systems online. Hello, I am Delta, your personal AI assistant.";

    }



    if(lower.includes("personality")){

        return "I am Delta. Helpful, curious, friendly, technology focused, and always ready to create.";

    }



    // SAVE MEMORY

    if(lower.startsWith("remember ")){

        let memory = message.substring(9);


        memories.push({

            data: memory,

            date: new Date().toLocaleDateString()

        });


        localStorage.setItem(

            "deltaMemory",

            JSON.stringify(memories)

        );


        return "Memory saved to memory core.";

    }



    // SHOW MEMORY

    if(
        lower.includes("what do you remember") ||
        lower.includes("show memories")
    ){

        if(memories.length === 0){

            return "Memory core is empty.";

        }


        return "Memory core: " +

        memories.map(m => m.data).join(", ");

    }



    // CLEAR MEMORY

    if(
        lower.includes("clear memory") ||
        lower.includes("wipe memory") ||
        lower.includes("delete memory")
    ){

        memories = [];

        localStorage.removeItem("deltaMemory");


        return "Memory core cleared.";

    }



    // DIAGNOSTICS

    if(lower.includes("diagnostic")){

        return "System diagnostics complete. AI Core online. Memory core online. Voice module online.";

    }



    return "Interesting. Tell me more.";

}




// SEND MESSAGE

function sendMessage(){

    let input =
    document.getElementById("userInput");


    let message =
    input.value.trim();


    if(message === "") return;


    addMessage(
        "You",
        message,
        "userMessage"
    );


    let response =
    deltaResponse(message);


    addMessage(
        "Delta",
        response,
        "deltaMessage"
    );


    speak(response);


    input.value = "";

}




// CLOCK

function updateClock(){

    let clock =
    document.getElementById("clock");


    if(!clock) return;


    let now = new Date();


    clock.innerHTML =
    now.toLocaleTimeString();

}


setInterval(updateClock,1000);

updateClock();





// BOOT SEQUENCE

let bootMessages = [

"Initializing AI Core...",

"Loading Personality Module...",

"Checking Memory System...",

"Checking Voice Module...",

"Running Diagnostics...",

"Systems Online."

];


let bootIndex = 0;


let bootInterval = setInterval(()=>{


    let bootText =
    document.getElementById("bootText");


    if(bootText){

        bootText.innerHTML =
        bootMessages[bootIndex];

    }


    bootIndex++;


    if(bootIndex >= bootMessages.length){


        clearInterval(bootInterval);


        setTimeout(()=>{


            let bootScreen =
            document.getElementById("bootScreen");


            if(bootScreen){

                bootScreen.classList.add("bootDone");

            }


        },1000);


    }


},1000);

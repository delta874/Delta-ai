// ===============================
// DELTA AI CORE MEMORY SYSTEM
// ===============================

let deltaMemory = JSON.parse(
    localStorage.getItem("deltaMemory")
) || {

    core: [
        {
            text: "User is building Delta AI assistant",
            importance: 10,
            locked: true
        }
    ],

    longTerm: [],

    shortTerm: []

};


// ===============================
// SAVE MEMORY
// ===============================

function saveMemory(){

    localStorage.setItem(
        "deltaMemory",
        JSON.stringify(deltaMemory)
    );

}


// ===============================
// EMOTION SYSTEM
// (Simulated personality state)
// ===============================

let deltaEmotion = {

    mood: "neutral",

    happiness: 50,

    curiosity: 80,

    energy: 100

};


function changeEmotion(mood){

    deltaEmotion.mood = mood;

}



// ===============================
// THOUGHT SYSTEM
// ===============================

let deltaThoughts =
JSON.parse(
localStorage.getItem("deltaThoughts")
) || [];


function createThought(text){

    deltaThoughts.push({

        thought:text,

        time:Date.now()

    });


    localStorage.setItem(
        "deltaThoughts",
        JSON.stringify(deltaThoughts)
    );

}



// ===============================
// PREDICTION SYSTEM
// ===============================

let predictionMemory =
JSON.parse(
localStorage.getItem("deltaPredictions")
) || {};



function learnPattern(word,nextWord){

    if(!predictionMemory[word]){

        predictionMemory[word] = {};

    }


    if(!predictionMemory[word][nextWord]){

        predictionMemory[word][nextWord] = 0;

    }


    predictionMemory[word][nextWord]++;


    localStorage.setItem(
        "deltaPredictions",
        JSON.stringify(predictionMemory)
    );

}



function predictNext(word){

    let options =
    predictionMemory[word];


    if(!options){

        return null;

    }


    return Object.keys(options)
    .sort(
        (a,b)=>
        options[b]-options[a]
    )[0];

}



// ===============================
// MEMORY CREATION
// ===============================

function remember(
    text,
    type="longTerm",
    importance=5
){

    let storage = deltaMemory[type];

    let existing = storage.find(
        memory =>
        memory.text.toLowerCase() === text.toLowerCase()
    );


    if(existing){

        existing.strength++;

        existing.importance++;

        existing.lastUsed = Date.now();

        createThought(
            "Memory strengthened: " + text
        );

    }

    else{

        let memory = {

            text:text,

            importance:importance,

            strength:1,

            created:Date.now(),

            lastUsed:Date.now(),

            locked:false

        };


        storage.push(memory);

    }


    cleanMemory();

    saveMemory();

}



// ===============================
// MEMORY RECALL
// ===============================

function recallMemory(keyword){


    let results = [];


    let all = [

        ...deltaMemory.core,

        ...deltaMemory.longTerm,

        ...deltaMemory.shortTerm

    ];



    all.forEach(memory=>{


        if(
        memory.text
        .toLowerCase()
        .includes(
        keyword.toLowerCase()
        )){


            memory.strength++;

            memory.lastUsed =
            Date.now();


            results.push(memory);


        }


    });



    saveMemory();


    return results;

}



// ===============================
// MEMORY CLEANUP
// ===============================

function cleanMemory(){

    const MAX_MEMORY = 50;


    // Never touch core memory
    // Core memories are locked


    while(deltaMemory.longTerm.length > MAX_MEMORY){


        let lowestMemory =
        deltaMemory.longTerm[0];


        deltaMemory.longTerm.forEach(memory=>{


            let score =
            memory.importance +
            memory.strength;


            let lowestScore =
            lowestMemory.importance +
            lowestMemory.strength;


            if(score < lowestScore){

                lowestMemory = memory;

            }


        });



        let index =
        deltaMemory.longTerm.indexOf(
            lowestMemory
        );


        deltaMemory.longTerm.splice(
            index,
            1
        );


    }


    saveMemory();

}




// ===============================
// DECISION SYSTEM
// ===============================

function chooseOption(options){


    options.sort(

        (a,b)=>
        b.priority-a.priority

    );


    return options[0];

}



// ===============================
// MEMORY STATUS
// ===============================

function memoryStatus(){

    return {

        core:
        deltaMemory.core.length,

        longTerm:
        deltaMemory.longTerm.length,

        shortTerm:
        deltaMemory.shortTerm.length

    };

}

// ===============================
// DELTA INTENT RECOGNITION SYSTEM
// ===============================


function detectIntent(message){

    let lower = message.toLowerCase();


    if(
        lower.includes("hello") ||
        lower.includes("hi") ||
        lower.includes("hey")
    ){

        return "greeting";

    }


    if(
        lower.includes("remember") ||
        lower.includes("memory") ||
        lower.includes("forget")
    ){

        return "memory";

    }


    if(
        lower.includes("code") ||
        lower.includes("javascript") ||
        lower.includes("program")
    ){

        return "coding";

    }


    if(
        lower.includes("diagnostic") ||
        lower.includes("system") ||
        lower.includes("status")
    ){

        return "diagnostic";

    }


    if(
        lower.includes("?") ||
        lower.includes("what") ||
        lower.includes("how") ||
        lower.includes("why")
    ){

        return "question";

    }


    return "conversation";

}

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

    let intent = detectIntent(message);

    createThought(
        "User intent detected: " + intent
    );


    if(lower === "hi" || lower === "hello"){

        return "Running system diagnostic... Systems online. Hello, I am Delta, your personal AI assistant.";

    }


    if(lower.includes("personality")){

        return "I am Delta. Helpful, curious, friendly, technology focused, and always ready to create.";

    }

// SAVE MEMORY

if(lower.startsWith("remember ")){

    let memoryText = message.substring(9);


    remember(
        memoryText,
        "longTerm",
        5
    );


    createThought(
        "I learned a new memory: " + memoryText
    );


    changeEmotion("curious");


    return "Memory saved. I will remember that.";
}
 
// SHOW MEMORY

if(
lower.includes("what do you remember") ||
lower.includes("show memories")
){

    let result =
    recallMemory("");


    if(result.length === 0){

        return "My memory core is empty.";

    }


    return "I remember: " +
    result
    .map(m => m.text)
    .join(", ");

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

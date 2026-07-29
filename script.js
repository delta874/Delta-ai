let heartSound = document.getElementById("heartSound");

// THE CARETAKER
// Main Game Script


function startGame(){
heartSound.volume = 0.35;
heartSound.play();

    
    // Hide main menu
    document.getElementById("menu").style.display = "none";


    // Show game screen
    document.getElementById("game").style.display = "block";


    // Opening journal entry
    document.getElementById("scene").innerHTML = `

    <p>
    I woke in the sacred chambers.
    </p>

    <p>
    The cold had settled into the stone walls.
    I could feel it creeping through my clothes,
    through my hands,
    through my bones.
    </p>

    <p>
    The only light came from my small oil lantern.
    The flame danced against the darkness,
    barely reaching the ancient walls around me.
    </p>

    <p>
    I had spent another night beneath the earth.
    Another night beside the Heart.
    </p>

    <p>
    Then I heard it.
    </p>

    <p>
    THUMP.
    </p>

    <p>
    THUMP.
    </p>

    <p>
    THUMP.
    </p>

    <p>
    My god was awake.
    </p>

    `;


    // First choice buttons
    showFirstChoice();

}



function showFirstChoice(){

    let choices = document.getElementById("choices");

    choices.innerHTML = "";


    let approach = document.createElement("button");

    approach.innerHTML = "Approach the Heart";


    approach.onclick = function(){

        document.getElementById("scene").innerHTML = `

        <p>
        I stepped closer.
        </p>

        <p>
        Every step echoed through the sacred chamber.
        </p>

        <p>
        I placed my hand upon the cold stone surrounding it.
        </p>

        <p>
        The Heart answered with a sound that shook the room.
        </p>

        <p>
        THUMP.
        </p>

        `;

        choices.innerHTML = "";

    };


    let wait = document.createElement("button");

    wait.innerHTML = "Remain in the darkness";


    wait.onclick = function(){

        document.getElementById("scene").innerHTML = `

        <p>
        I stayed where I was.
        </p>

        <p>
        Some days I wondered if I feared the Heart...
        or if I feared what would happen without it.
        </p>

        `;

        choices.innerHTML = "";

    };


    choices.appendChild(approach);
    choices.appendChild(wait);

}

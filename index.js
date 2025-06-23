let comp = [];
let level = 0;

function startGame() {
    nextRound();
}

function nextRound() {
    handleComputer(comp, level);
    level++;
    
    handlePlayer(comp, function(didLose) {
        if (didLose) {
            $(".level").text("Wrong move. Game Over!");
        } else {
           
            setTimeout(() => {
                nextRound(); 
            }, 800);
        }
    });
}

function handleComputer(comp, level){
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    console.log("Computer: " + randomNumber);
    comp.push(randomNumber);

    $(".level").text("Level " + (level + 1));

    $(".box").each(function() {
        if (txt(randomNumber) === $(this).text().trim()) {
            $(this).addClass("active");
            handleSound(txt(randomNumber));
            setTimeout(() => {
                $(this).removeClass("active");
            }, 100);
        }
    });
}

function handlePlayer(comp, onResult) {
    let i = 0;

    $(".box").off("click").on("click", function () {
        let clicked = $(this).text().trim();

        if (clicked !== txt(comp[i])) {
            $(".box").off("click");
            onResult(true);
        } else {
            $(this).addClass("active");
            handleSound(clicked);
            setTimeout(() => {
                $(this).removeClass("active");
            }, 100);
            i++;

            if (i === comp.length) {
                $(".box").off("click");
                onResult(false); 
            }
        }
    });
}

function handleSound(active){
    switch(active){
        case "one":
            new Audio("./sound/crash.mp3").play();
            break;
        case "two":
            new Audio("./sound/snare.mp3").play();
            break;
        case "three":
            new Audio("./sound/tom-1.mp3").play();
            break; 
        case "four":
            new Audio("./sound/tom-3.mp3").play();
            break;           
    } 
}

function txt(num){
    if(num === 1) return "one";
    if(num === 2) return "two";
    if(num === 3) return "three";
    if(num === 4) return "four";
}

startGame();

console.log("Connected...!!!");

let gameSeq = [];
let userSeq = [];
let btns = ["purple", "orange", "blue", "aqua"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");


document.addEventListener("keypress", function() {
    if( started == false ) {
        console.log("Game started.");
        started = true;
    }

    levelUp();
})


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`

    //Random color choose
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    // console.log(randomColor);
    // console.log(randomBtn);
    gameSeq.push(randomColor);   
    console.log(gameSeq);
    
    //sending the random in the function
    gameFlash(randomBtn);
}

function checkAns(idx) {
    // console.log(idx);
    console.log(`Game Seq "${gameSeq[idx]}", User Seq "${userSeq[idx]}"`);
    console.log(`Game seq len "${gameSeq.length}", User seq len "${userSeq.length}"`);
    
    if( gameSeq[idx] === userSeq[idx] ) {
       if( gameSeq.length == userSeq.length ) {
        console.log("Leveling up...!!");
        setTimeout(levelUp, 1000);
       }
    } else {
        h2.innerHTML = `Game over. Your score is <b>${level}</b> <br>Press any key to start again.`
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();

    }   
}


function btnPress() {
    //console.log(this.classList[1]);
    let clickedBtn = this;
    userFlash(clickedBtn);  
    
    userColor = clickedBtn.getAttribute("id");
    //console.log(userColor);
    
    userSeq.push(userColor); // S1 - adding one color into userSeq
    console.log(userSeq.length-1); // Continuing S1, now current length 
    
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
//Button press (clicked) by user
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}



//Game flash the button color
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250)
}

//User flash the button color
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250)
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}






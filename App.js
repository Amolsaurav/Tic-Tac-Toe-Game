let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#newGame-btn");
let ResetGameBtn = document.querySelector("#reset-btn");

let turnX = true; //playerX will play First
let count=0; //To track draw game condition

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnX){
            box.innerText="X";
            box.classList.add("clicked", "x-color");
            turnX=false;
            box.classList.add("clicked");
            setTimeout(() => {
            box.classList.remove("clicked");
            },300); // Remove after animation
        }
        else{
            box.innerText="O";
            box.classList.add("clicked", "o-color");
            turnX=true;
        }
        box.disabled=true;
        count++;
        let isWinner=checkWinner();

        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});

const checkWinner=()=>{
    for(let pattern in winPatterns){
        let pos1Val= boxes[winPatterns[pattern][0]].innerText;
        let pos2Val= boxes[winPatterns[pattern][1]].innerText;
        let pos3Val= boxes[winPatterns[pattern][2]].innerText;

        if(pos1Val!==""&& pos2Val!==""&& pos3Val!==""){
           if(pos1Val===pos2Val && pos2Val===pos3Val){
            showWinner(pos1Val);
            return true;
           }
        }
    }
    return false;
}

const showWinner=(Winner)=>{
    msg.innerText=`Congratulations! Winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    setTimeout(() => {
        msgContainer.classList.add("show");
    }, 10); // Add show class after a short delay for animation
    disableBoxes();
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.classList.remove("x-color", "o-color");
    }
}

const gameDraw = () => {
    msg.innerText = "Game Draw ";
    msgContainer.classList.remove("hide");
    setTimeout(() => {
        msgContainer.classList.add("show");
    }, 10);
    disableBoxes();
};


const resetGame=()=>{
    turnX=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
    msgContainer.classList.remove("show");
    msgContainer.classList.add("hide");

}

newGameBtn.addEventListener("click",resetGame); 
ResetGameBtn.addEventListener("click",resetGame);



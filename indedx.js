let boxes = document.querySelectorAll(".box");

let gameinfo = document.querySelector(".game-info");

let newgamebtn = document.querySelector(".btn");


let currentplayer;
let Gamegrid;

const WinningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//Let's create a function to initialize the game.

function initgame() {
      
    currentplayer="X";
    Gamegrid=["","","","","","","","","",];

    //UI pr bhi empty krna padega
    boxes.forEach((box, index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //initialize boxes with initial properties again
        box.classList=`box box${index+1}`;

    })

    newgamebtn.classList.remove("active");
    
    gameinfo.innerText = `Current Player - ${currentplayer}`;
   
};

initgame();

function swapturn(){
    if(currentplayer==="X"){
        currentplayer="O";
    }
    else{
        currentplayer="X";
    }
    //UI Update
    gameinfo.innerText=`Current Player - ${currentplayer}`;
}

function checkgameover(){
    let answer ="";

    WinningPositions.forEach((position)=>{
        //all 3 boxes should be non-empty and exactly same in value
        if((Gamegrid[position[0]] !=="" || Gamegrid[position[1]] !=="" || Gamegrid[position[2]] !=="")
        && (Gamegrid[position[0]] === Gamegrid[position[1]]) && (Gamegrid[position[1]] === Gamegrid[position[2]])){
            

            //Check if Winner is X
            if(Gamegrid[position[0]] === "X"){
              answer ="X";
            }
            else{
               answer="O";
           }

               //Disable Pointerevents
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

               //Now we know X or O is a winner

         boxes[position[0]].classList.add("win");
         boxes[position[1]].classList.add("win");
         boxes[position[2]].classList.add("win");
        


          }
    });
    
    //it means we have a winner
    if (answer !== ""){
        gameinfo.innerText=`Winner Player - ${answer}`;
        newgamebtn.classList.add("active");
        return;
    }

    //When there is no winner (tie)

    let fillcount =0;

    Gamegrid.forEach((box)=>{
        if(box !== "")
        fillcount++;
    });

    //Board is filled

    if (fillcount === 9){
        gameinfo.innerText="Game Tied!";
        newgamebtn.classList.add("active");
    }

}

function HandleCLick(index){
    if(Gamegrid[index] === ""){
       boxes[index].innerText= currentplayer;
       Gamegrid[index] = currentplayer;
       boxes[index].style.pointerEvents="none";
       //swap kro turn ko
       swapturn();
       //check winning
       checkgameover();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        HandleCLick(index);
    })
});

newgamebtn.addEventListener('click',initgame);
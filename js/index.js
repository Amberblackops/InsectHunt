// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {                            
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){               //both coordinates equal you collided
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){       //if you go out of the grid
        return true;
    }
        
    return false;              //not collided
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){                             
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0};    //reset inpur direction after gameover
        alert("Game Over. Press any key to play again!");      
        snakeArr = [{x: 13, y: 15}];       //reset the snake array 
        musicSound.play();                //restarting of game
        score = 0;                    
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;              //adding score to display
        if(score>hiscoreval){                   //high score val breaks
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));       //setting highscore to local storage
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;         //change highscore 
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});          //add element to snake body 
        let a = 2;
        let b = 16;                                                //2-16 to not get food on wall 
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}    //generates random number b/w the 2-16 by formula to add new food at new position
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) {         //using second last element and reverse for loop for shifting snake body segmwnt positions from
        snakeArr[i+1] = {...snakeArr[i]};             //-behind    ...used to create new object so all the things not refrence to same object, last position shifted to seccond last
    }

    snakeArr[0].x += inputDir.x;                 //moving the head to a new position
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";                //empty the innerHtML of board
    snakeArr.forEach((e, index)=>{       //arrow function 
        snakeElement = document.createElement('div');   //adding css to new element using javascript
        snakeElement.style.gridRowStart = e.y;         //gives location to sanke in the grid
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');    //css in head
        }
        else{
            snakeElement.classList.add('snake');    //display body
        }
        board.appendChild(snakeElement);  //put the snake elment in baord
    });
    // Display the food same as display the snake
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;  //place food in grid 
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{   //event added to start game
    inputDir = {x: 0, y: 1}      // Start the game
    moveSound.play(); 
    musicSound.play();                //restarting of game
    switch (e.key) {               //to know which key is pressed
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;     //snake can only move in one direction at a time
            inputDir.y = -1;   //as snake moves up y distance get reduced 
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;        //for going down distance increases
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;            //same as vertical
            inputDir.y = 0;            //horizontal movement 
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
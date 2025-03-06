let colors = ['yellow','red','blue','violet','green']; //array of colors
let windowWidth = window.innerWidth; //variable that calculates the width of the screen 
let windowHeight = window.innerHeight; //variable that calculates the height of the screen 
let body = document.body; 
let scores = document.querySelectorAll('.score'); //created a variable for all elements with the class name 'score'
let num = 0; //how many balloons have been popped, initial value of 0

//total numbers of balloon to be popped
let total = 100; //to increase, after each 10 balloons, the tempo at which the balloons are released

let currentBalloon = 0; //to get unique numbers such as 0, 1, 2, 3, and so on for each balloon

let gameOver = false; //initial value “false” which means that the game is still on.
/*Bwe created it because the function called “deleteBalloon” removed the balloon when it reached the position of 
the height of the screen + 200px. As a result, the variable called num was increased by 1*/



let totalShadow = document.querySelector('.total-shadow'); //to display the block with class name “total-shadow”

let startBtn = document.querySelector('.start-game-button'); //here we search for the start button


function createBalloon() {
    let div = document.createElement('div');
    // * by the lenght of the array
    let rand = Math.floor(Math.random() * colors.length); //to get an element of the array chosen randomly
    div.className = 'balloon balloon-' +colors[rand];
    //we added a class name balloon to the div (chech html file)
    //then the name of the class balloon-  + the color[index the variable rand]
    
    //because we want the balloons to appear in a different place
    //so we need another randomly generated number,
    //This integer number will indicate by how many pixels a balloon has to be shifted from the left edge of the screen.
    rand = Math.floor(Math.random() * (windowWidth - 100)); //100px is the width of a baloon

    div.style.left = rand + 'px'; //to apply this number in pixels to a balloon
    div.dataset.number = currentBalloon; //property dataset --> to set the attribute with the name “data-number”
    //we write “number” and assign to it the value of the variable “currentBalloon” 
    //As a result, we will get for each balloon something like data-number equals to 0 , 1 and so on

    currentBalloon++; //increase by one each time a new balloon appears (in other words to set another number for the next balloon)

    body.appendChild(div); //to add the div to the body
    animateBalloon(div);
}

function animateBalloon(elem) { //will be animating a balloon or in other words an element
    let pos = 0; //a variable for tracking by how many pixels a balloon has been shifted
    let random = Math.floor(Math.random() * 6 -3); //to get a random generation of numbers within the range from minus 3 to plus 3 not included.
    //so each balloon will float from the bottom to the top at a different pace.
    
    //setInterval function assigned to interval variable
    //The function called setInterval calls another function called frame which is executed each 12 milliseconds.
    //12 to get onyl positive numbers !!!!!
    let interval = setInterval(frame,12 - Math.floor(num / 10) + random); //To increase the tempo for each 10 balloons and get an integer number
//WHY? -> suppose that 60 balloons have already been released. 
//Therefore, the value of the variable “num” = to 60. That means 60 divided by 10 is 6
//Then 10 minus 6 equals to 4. That’s why the tempo at which the balloons are released is 4 milliseconds.
//Now suppose, that 70 balloons have already been released: 70 divided by 10 is 7 and 10 minus 7 equals to 3 milliseconds.

    //this function checks whether the position of a balloon is greater or equal to the height of the browser’s screen + 200px (the height of a balloon)
    function frame() {
        //data-number -> to check whether a balloon already exists on the web page, 
        //“Data-number” because in “div.dataset.number” we specified that the attribute’s name has to be with the word number at the end
        //(to somehow distinguish each balloon from other balloons)
        // ******!!!!!!!
        if(pos >= (windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]') !== null)) { //doesn't have to be equal to null
            clearInterval(interval); //so if a balloon is shifted up by the height of the browser’s screen + height of a balloon the balloon stops floating
            //which means that when the statement is true, the setInterval function has to be stopped
            //we write gameOver = true; instead of deleteBalloon(elem);
            gameOver = true; //the game is over

        } else {
            pos++; //increased by one
            //to specify by how many pixels a balloon has to be shifted up

            elem.style.top = windowHeight - pos + 'px'; 
            //The program sets the new position for a balloon: equal to the height of the browser’s screen 
            // - the value of the variable called pos + “px” to get the result in pixels

//WHY? suppose the height is equal to 1000px.
//So at the top of the screen we have the height of the screen equal to 1000px
//and also if a balloon is at the top of the browser’s screen, its pos is equal to 1000px.
//If a balloon is at the bottom of the browser’s screen, the pos is equal to 0px
//When the top part of a balloon reaches the position of 1000px = to the height of the screen which is also 1000px,
//we get 0 -> because 1000 minus 1000 is 0
//But to hide a balloon behind the screen, we need to shift it up additionally by its height,
//which is 200px. When a balloon is hidden, the program stops.
        }
    }
}


//The balloon stopped floating, so now we need to delete it:
function deleteBalloon(elem) { //elem = balloon
    elem.remove(); //function remove()
    num++; //the variable called “num” has to be increased by 1 each time a user pops (delete) a balloon
    updateScore(); //when a balloon is popped, the total number of popped balloons has to be updated
    playBallSound(); //when a balloon is popped you get the special sound when a balloon is popped
}


//to get the special sound when a balloon is popped
function playBallSound() {
    let audio = document.createElement('audio'); //created the audio tag
    audio.src = '/sounds/pop.mp3'; //path to the mp3 file
    audio.play(); //play function to play the music
    //we can play any music even without having an <audio> tag on the web page
}


//to update the total number of balloons popped by a user
function updateScore() {
    for(let i = 0; i<scores.length; i++){ //for loop, because we have lots of elements with the class called 'score'
        scores[i].textContent = num; //Then we change the content of the element with the index number [i]
        //and then assign to this element the value of the variable called “num”
    }
}

//to automate the process of creating a balloon
function startGame() {
    restartGame(); 
    //so each time the game starts, all balloons will be deleted from the web page and the score will be updated to 0
    
    //The value of this variable will be created randomly in the range from minus 100 to plus 500.
    let timeout = 0; //starting with a value of 0

    //to clear up the function called “setInterval” so we assign the setInterval function to the variable called “loop”
    let loop = setInterval(function() {
        timeout = Math.floor(Math.random() * 600 - 100); //Because if we multiply the range from 0 to 1 (not including) by 600, 
        //we will get the new range from 0 to 600
        //But we need to get the range from -100 to 500: to get it, we wrote “-100”. 
        //As a result we will get the range from -100 to 500.
        if(!gameOver && num !== total) { // if the value of the variable game0ver is not equal to true,
        //and the total number of popped balloons is not equal to 10, then the program has to keep creating new balloons.
            createBalloon(); //keep create new balloons
        } else if (num !== total) { //if the value of the variable called “gameOver” is equal to true,
        //but the value of the variable called num is not equal to total, 
        //that means that a user let a balloon reach the top
            clearInterval(loop); //loop is the argument of clearInterval function
            totalShadow.style.display = 'flex'; //check style.css file in total-shadow{}
            //to display the pop-up window for a loser
            totalShadow.querySelector('.lose').style.display = 'block';
        } else { //If the value of the variable num is equal to the value of the variable total, then it means that a user popped all balloons
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            //to display the pop-up window for a winner
            totalShadow.querySelector('.win').style.display = 'block';
        }
    //800 milliseconds
    }, 800 + timeout); //So if we add - 100 to 800, we get 700. And if we add 500 plus 800, we get 1300 and so on
}

//Each time a user clicks on the “YES” button the game has to be started from the beginning
function restartGame() {
    let forRemoving = document.querySelectorAll('.balloon');//we assign to this variable, all balloons which exist on the webpage
    // to delete all the balloons we use a for loop
    for(let i=0; i < forRemoving.length; i++){ //less than
        forRemoving[i].remove(); //each balloon with the [i] index number has to be deleted
    }
    gameOver = false; //to change it back to false
    num = 0; //no balloons on the web page
    updateScore(); //called the function to update the score
}


//event delegation because we can add an eventhandler only to any HTML element which we already have on the web page
//the balloons are not stored beforehand, they are created when the game is on
//so the main idea of the event delegation is attaching an event listener to elements which already exist on the web page,
//but still it will work for those elements which do not exist on the web page.
document.addEventListener('click', function(event) { //in our case we can attach an event listener to the whole web page -> document
    //the “function” we want to be executed when a user clicks on the web page:
    //if the value of the property with the name “target” = to the <div> with the class name balloon, then the program has to delete the balloon.
    if(event.target.classList.contains('balloon')) { // when a user clicks on the webpage, the program will check all child elements of the web page
        deleteBalloon(event.target); //if the user clicks on the balloon the program will delete it.
    }
})
//by writing “event” as the argument of this function, 
//event = special object that keeps track of all actions made by a user
//console.log(event) = "mouseEvent” appears in the console -> interested in the property called “target”
//target: body  ->  this property specifies on which element we have clicked ---> since we clicked on the <body> tag, we have target: body
//if we click on the score-block div tag, you will get --> target: div.score-block
//if we click on a balloon you get target:balloon.balloon-'color', THAT'S WHY WE WRITE -> event.target.classList.contains('balloon') 




//We are going to add an event listener to these “YES” and “NO” buttons.

//YES button
document.querySelector('.restart').addEventListener('click',function(){
    totalShadow.style.display = 'none'; //to hide the block with the class “total-shadow"
    totalShadow.querySelector('.win').style.display = 'none'; //to hide the pop-up windows for a winner
    totalShadow.querySelector('.lose').style.display = 'none'; //to hide the pop-up windows for a loser
    startGame(); //to start a new game
})
//to be able to hide either one or the other pop up window in CSS we wrote:
// .lose{
//     display: none;
// .win {
//     display: none;
// }


//NO button
document.querySelector('.cancel').addEventListener('click',function(){
    totalShadow.style.display = 'none';
    document.querySelector('.bg-music').pause(); // so the music stops if you click the no button
})


//So the game and the music start only after clicking on the start button
startBtn.addEventListener('click', function(){
    startGame();
    document.querySelector('.bg-music').play(); //searched the audio tag (background music) by his class name
    
    document.querySelector('.start-game-window').style.display = 'none'; 
    //so the div start-game-window is hidden as soon as the background music starts playing
})




/*
******!!!!!!!
WHY so many quotes.
we wrapped the special selector --> '[ ]' 
the name of an attribute --> data-number
then a = sing
in " " the value of the attribute ---> +elem.dataset.number+ 
and then wrap it in a pair of ' ' quotes

'[ data-number = " '+elem.dataset.number+' " ]'

To check whether a balloon already exists on the web page, we need to distinguish each balloon from other balloons.
With this purpose, we use the attribute which name consists of 2 parts: the first part is the word “data” with -
and for the second part you may add any word you wish, we decided to add the word “number”
To apply this attribute we wrote “div.dataset.number = currentBalloon”
Then in this part of code we check whether a balloon with the attribute called “data-number”
already exists on the web page.
If it exists -> then the program deletes this balloon and increases the value of the variable “num” by 1 and also updates the score.

But if a balloon doesn’t exist on the web page, that means it is equal to Null, then nothing happens.
*/


/*
if(pos >= (windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]') !== null))

this line of code --> (document.querySelector('[data-number="'+elem.dataset.number+'"]') !== null)) 
was previously written in the deleteBalloon() function

it was moved because with (pos >= (windowHeight + 200)
because if the position of a balloon is greater than or = to the height of the browser’s screen + 200px, then gameOver is true.

EXPLAINED: 
Suppose, 5 balloons have been created. You popped the first balloon and are ready to pop the other balloons.
The problem is that even if the first balloon has been deleted from the web page,the function called animateBalloon() 
still works --> menaing that the first balloon reaches the top and then goes out of the edge of the screen, 
so the value of the variable called gameOver becomes equal to “true” and the game is over.

That’s why we cut this part of code and paste it there with the logical operator && (&& = AND).
*/


/*
!!!!!
Suppose, that 99 balloons have already been released: 99 divided by 10 will be rounded up to 9. Then 10 minus 9 is 1

Suppose that as the value of the variable “random”, the number 3 was generated, 1 - 3 gives us -2 
-> The tempo can’t be -2 (a negative number) milliseconds.
*/



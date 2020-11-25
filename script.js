// challenge 1: Your age in days

function AgeInDays() {
    var BirthYear = prompt('what year you were born?');
    var AgeInDayss = (2020 - BirthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('you are '+AgeInDayss+' days old.');
    h1.setAttribute('id','AgeInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset() {
    document.getElementById('AgeInDays').remove();
}

// Challenge 2: Cat Generator

function generate() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://media.tenor.com/images/e4e412aecf8c06eda458eab082e21a92/tenor.gif";
    div.appendChild(image);
}

// Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;

    botChoice = numberToChoice(randToRpsInt()); 
    console.log('Computer choice:', botChoice);

    results = decideWinner(humanChoice, botChoice); // [0,1] human lost | bot won
    console.log(results);

    message = finalMessage(results); // ('message': 'you won!', color: 'green)
    console.log(message);
    
    rpsfrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
    };   
    
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    
    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'you lost!', 'color': 'red'};
    } else if (yourScore === 0.5){
        return {'message': 'you tied!', 'color': 'yellow'};
    } else {
        return {'message': 'you won!', 'color': 'green'};
    }
}

function rpsfrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
        
    }
    // LET'S remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>" 
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>" 

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}


// Challenge 4: change the color of all the button

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++) { 
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
      buttonsRed();
    } else if (buttonThingy.value === 'green') {
      buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
      buttonsColorsReset();
    } else if (buttonThingy.value === 'random') {
      randomColors();
    } 
}

function buttonsRed() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsColorsReset() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

    for (let i=0; i < all_buttons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}


// Challenge :5 blackjack
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap' : {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'wins': 0, 
    'losses': 0, 
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {

            if (blackjackGame['isStand'] === false) {
                let card = randomCard();
                showCard(card, YOU);
                updateScore(card, YOU);
                showScore(YOU);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activeplayer) {
if (activeplayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activeplayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true){

    blackjackGame['isStand'] = false;
    var yourImages = document.querySelector('#your-box').querySelectorAll('img');
    var dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for (let i=0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }
    
    for (let i=0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }
 
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent  = 0;
    document.querySelector('#dealer-blackjack-result').textContent  = 0;
   
    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color  = '#ffffff';
   
    document.querySelector('#blackjack-result').textContent  = "Let's play";
    document.querySelector('#blackjack-result').style.color  = 'black';

    blackjackGame['turnsOver'] = true;
    }
}
function updateScore(card, activeplayer) {
if (card === 'A') {
// if adding 11 keeps me below 21, add 11. Otherwise add 1
    if  (activeplayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
        activeplayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
        activeplayer['score'] += blackjackGame['cardsMap'][card][0];
    }
} else {

    activeplayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activeplayer) {
    if (activeplayer['score'] > 21) {
        document.querySelector(activeplayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activeplayer['scoreSpan']).style.color = 'red';
    } else {
    document.querySelector(activeplayer['scoreSpan']).textContent = activeplayer['score'];
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function dealerLogic() { 
    blackjackGame['isStand'] = true;
    
    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {     
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);
    
}

// compute winner and return who just won!
// Update the wins, lossess and draws
function computeWinner(){
    let winner;

    if (YOU['score'] <= 21) {
       
    // condition: higher score than dealer or when dealer busts but you're the winner. 

    if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {

        blackjackGame['wins']++;
        winner = YOU;

    } else if (YOU['score'] < DEALER['score']) {
        blackjackGame['losses']++;
        winner = DEALER;

    } else if (YOU['score'] === DEALER['score']) {
        blackjackGame['draws']++;
    }
        
    // condition: when user busts but dealer doesn't
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;
        
        
    // conditon: when you and the dealer busts.
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
        
        return winner;
    }

function showResult(winner) {

    let message, messageColor;

    if(blackjackGame['turnsOver'] === true) {

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'blue';
            winSound.play();

        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();

        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
        
    } 
}

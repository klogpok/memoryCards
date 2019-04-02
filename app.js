const elBoard = document.querySelector('.board');
const selectSize = document.querySelector('#selectSize');
const btn = document.querySelector('#btn');
const infoResult = document.querySelector('#info-result');

let previousCard = null;
let flippedCouplesCount = 0;
//let cardsCount = 0;
let accessToFlip = true;
let countOfTries = 0;

let totalCoupleCount = 4;

selectSize.addEventListener('change', event => {
    totalCoupleCount = event.target.value;
    initGame(totalCoupleCount);
});

btn.addEventListener('click', () => initGame(totalCoupleCount));

// const setBoardWidth = (numCouples = 4) => {
//   if (numCouples > 4) {
//     elBoard.style.width = '580px';
//   } else {
//     elBoard.style.width = numCouples * 125 + 30 * (numCouples - 1) + 'px';
//   }
// };

const createElCard = num => {
    const img = document.createElement('img');
    img.setAttribute('src', `images/bridge${num}.jpg`);

    const front = document.createElement('div');
    front.className = 'flip-card-back';
    front.appendChild(img);

    const back = document.createElement('div');
    back.className = 'flip-card-front';

    const cardInner = document.createElement('div');
    cardInner.className = 'flip-card-inner';
    cardInner.appendChild(front);
    cardInner.appendChild(back);

    const card = document.createElement('div');
    card.className = 'flip-card';
    card.dataset.card = num;
    card.appendChild(cardInner);
    card.addEventListener('click', cardClicked);

    return card;
};

const cardClicked = event => {
    const currCard = event.target.parentElement;

    if (currCard.classList.contains('flipped') || !accessToFlip) {
        return;
    }

    currCard.classList.add('flipped');

    if (previousCard === null) {
        previousCard = currCard;
    } else {
        let card1 = previousCard.parentElement.dataset.card;
        let card2 = currCard.parentElement.dataset.card;
        countOfTries++;

        if (card1 !== card2) {
            accessToFlip = false;

            setTimeout(() => {
                currCard.classList.remove('flipped');
                previousCard.classList.remove('flipped');
                previousCard = null;
                accessToFlip = true;
                updateResult(true);
            }, 1000);
        } else {
            flippedCouplesCount++;
            previousCard = null;
            accessToFlip = true;
            updateResult(true);
        }
    }
};

const updateResult = (statusGame = false) => {
    let message = '';

    if (!statusGame) {
        message = 'Find all the pairs!';
    } else if (flippedCouplesCount === totalCoupleCount) {
        message = `Founded ${flippedCouplesCount} from ${totalCoupleCount} pairs by ${countOfTries} tries! You are win!!!`;
    } else {
        message = `Founded ${flippedCouplesCount} from ${totalCoupleCount} pairs by ${countOfTries} tries!`;
    }

    infoResult.textContent = message;
}


const shuffleCards = size => {
    let counter = [1, 2, 3, 4, 5, 6, 7, 8];

    let currEl = shuffleArray(counter, size);
    currEl = [...currEl, ...currEl];

    shuffleArray(currEl, currEl.length).forEach(item => {
        elBoard.appendChild(createElCard(item));
    });
};

const shuffleArray = (array, length) => {
    let counter = [...array];
    let currEl = [];

    for (let i = 0; i < length; i++) {
        let random = getRandomInt(0, counter.length);
        currEl.push(counter[random]);
        counter.splice(counter.indexOf(counter[random]), 1);
    }

    return currEl;
};

// Helpers
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const initGame = size => {
    previousCard = null;
    flippedCouplesCount = 0;
    cardsCount = 0;
    accessToFlip = true;
    countOfTries = 0;
    elBoard.innerHTML = '';

    updateResult();
    shuffleCards(size);
};

initGame(totalCoupleCount);

//#endregion
//#region varibile declarsation
const preper = {};
preper.cards = [];
preper.failTrack = new Audio("./asset/audio/fail.mp3");
preper.flipAudio = new Audio("./asset/audio/flip.mp3");
preper.fullTrack = new Audio("./asset/audio/fulltrack.mp3");
preper.goodTrack = new Audio("./asset/audio/good.mp3");
preper.gameOver = new Audio("./asset/audio/game-over.mp3");
preper.fullTrack.loop = true;
preper.progress = 0;
const numOfCards = 20;
const tempNumbers = [];
let CardsHtmlContent = " ";
//#endregion
// // #region  function declarsation
const getRandomvalue = (min, max) => {
  let result;
  let exists = true;
  min = Math.ceil(min);
  max = Math.floor(max);
  while (exists) {
    result = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!tempNumbers.find((no) => no === result.toString())) {
      exists = false;
      tempNumbers.push(result.toString());
    }
  }
  return result;
};
// // #endregion
//#region   function of game
const toggleFlip = (index) => {
  const card = preper.cards[index];
  console.log(card);
  if (!card.flip && card.clickable) {
    flip(card, index);
    selected(card, index);
  }
};
const flip = (card, index) => {
  if (card) {
    card.flip = card.flip === "" ? "flip" : "";
    document.getElementById(`card-flip-${index}`).classList.value = card.flip;
  }
};
const selected = (card, index) => {
  if (!preper.selectCard_1) {
    preper.selectCard_1 = card;
    preper.selectIndex_1 = index;
  } else if (!preper.selectCard_2) {
    preper.selectCard_2 = card;
    preper.selectIndex_2 = index;
  }
  if (preper.selectCard_1 && preper.selectCard_2) {
    if (preper.selectCard_1.src === preper.selectCard_2.src) {
      preper.selectCard_1.clickable = false;
      preper.selectCard_2.clickable = false;
      preper.selectCard_1 = null;
      preper.selectCard_2 = null;
      progress();
      CheckFinish();
    } else {
      setTimeout(() => {
        flip(preper.selectCard_1, preper.selectIndex_1);
        flip(preper.selectCard_2, preper.selectIndex_2);
        preper.selectCard_1 = null;
        preper.selectCard_2 = null;
      }, 1000);
    }
  }
};
const progress = () => {
  const progress =
    (preper.cards.filter((card) => !card.clickable).length / numOfCards) * 100;
  const progressElement = document.getElementById("progress");
  progressElement.style.width = `${progress}%`;
  progressElement.innerText = `${progress}%`;
};
const CheckFinish = () => {
  if (preper.cards.filter((card) => !card.clickable).length === numOfCards) {
    preper.gameOver.play();
    setTimeout(() => {
      location.reload();
    }, 300);
  }
};
//#endregion
// // #region  implementation game
for (let index = 0; index < numOfCards / 2; index++) {
  preper.cards.push({
    id: getRandomvalue(0, numOfCards),
    src: `./asset/images/${index}.jpg`,
    flip: "",
    clickable: true,
    index,
  });
  preper.cards.push({
    id: getRandomvalue(0, numOfCards),
    src: `./asset/images/${index}.jpg`,
    flip: "",
    clickable: true,
    index,
  });
  console.log("number of cards", numOfCards);
  console.log("index of cards", index);
}
preper.cards.sort((a, b) => (a.id > b.id ? 1 : -1));
preper.cards.forEach((item, index) => {
  CardsHtmlContent += `
  <span class="col-sm-4 col-lg-3">
        <!-- Card Flip -->
        <div onclick="toggleFlip(${index})" class="card-flip">
            <div id="card-flip-${index}">
                 <div class="front">
                    <!-- front content -->
                    <div class="card">
                        <img class="card-image" src="./asset/back.jpg" alt="Loading...">
                        <span class="card-content">${index + 1}</span>

                     </div>
                </div>
                <div class="back">
                    <!-- back content -->
                    <div class="card">
                        <img src="./asset/images/${
                          item.index
                        }.jpg" alt="Image [100%x180]" data-holder-rendered="true"
                            style="height: 120px; width: 100%; display: block;">
                    </div>
                </div>
            </div>
        </div>
        <!-- End Card Flip -->
    </span>
  `;
});
document.getElementById("cards").innerHTML = CardsHtmlContent;
//#endregion

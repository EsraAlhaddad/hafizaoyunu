const cards = document.querySelectorAll('.memory-card');
for (let i = 0; i < cards.length; i++) {
  const duplicatedDiv = document.createElement('div'); //kartların doublecate
  duplicatedDiv.classList.add('memory-card');
  duplicatedDiv.innerHTML = cards[i].innerHTML; //kartların çiftleme ve eşleştirme işlemi için bir kopya oluşturur
  const mainDiv = document.querySelector('.memory-game');
  mainDiv.appendChild(duplicatedDiv); //kopyalanan kartlar oyun alanına eklenir
  let tempData = cards[i].getAttribute('data-framework')// data-framework özelliğini almak için
  duplicatedDiv.setAttribute('data-framework', tempData); //kartların birbirine eşleşir ve aynı çiftin kartları olarak işaretlenir
  console.log(duplicatedDiv);
}
const cardsAll = document.querySelectorAll('.memory-card');

let hasFlippedCard = false; //kartların açık olup olmadığını kontrol eder
let lockBoard = false;  //kartlar eşleşmediğinde (true) geri kapanması sağlıyor
let firstCard, secondCard;

function flipCard() { //kartlara basıldığında kartın açılmasını ,karşılaştırmasını ve görünümünü değiştiren fonksiyon
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;//bir kart açık olduğu ve ikinci karta tıklanmasını bekler
    firstCard = this;//this :ilk karı hatırlar ve ikinci kartla karşılaştırır
    return;
  }
  secondCard = this;
  checkForMatch();// iki kartın eşleşip eşleşmediğini kontrol eder
}
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cardsAll.forEach(card => {
    let randomPos = Math.floor(Math.random() * 18);
    card.style.order = randomPos;
    card.setAttribute("data-order",randomPos)
  });
})();

cardsAll.forEach(card => card.addEventListener('click', flipCard));
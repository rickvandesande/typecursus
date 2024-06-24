document.addEventListener('DOMContentLoaded', function () {
    let startBtn = document.querySelector("#start");
    let refreshBtn = document.querySelector("#refresh");
    let countDown = document.querySelector("#countdown");
    let instructions = document.querySelector("#instructions");
    let answerBlock = document.querySelector("#answerBlock");
    let objectiveWord = document.querySelector("#objectiveWord");
    let answerField = document.querySelector("#answerField");
    let wordCount = document.querySelector("#wordCount");
    let charCount = document.querySelector("#charCount");
    let score = document.querySelector("#score");
    let wordScore = 0;
    let charScore = 0;

    /**
 * Use this function to retrieve a random word.
 *
 * @returns a string containing a random word.
 */
    async function getWord() {
        const response = await fetch("https://random-word-bit.vercel.app/word");
        const word = await response.json();
        return word[0].word.toLowerCase();
    }
    // Zorgen dat er wordt teruggeteld van 60 naar 0
    // Zorgen dat de score en de herstart button in beeld komt wanneer de tijd op 0 komt te staan
    function countDownClock() {
        let startTime = parseInt(countDown.innerHTML, 10);
        if (startTime > 0) {
            startTime--;
            countDown.innerHTML = startTime;
        }
        if (startTime === 0) {
            score.classList.remove("hidden");
            refreshBtn.classList.remove("hidden");
            answerBlock.classList.add("hidden");
        }
    }
    // Functie die woord uit getWord() toont in de HTML
    async function showWord() {
        const word = await getWord();
        objectiveWord.innerHTML = word;
    }
    // Functie om input en het opgavewoord met elkaar te vergelijken. Wanneer er een overeenkomst is komt er een punt bij de woord score en wordt het
    // het aantal letters toegevoegd aan de score van de characters. Tot slot wordt de functie showWord aangeroepen om het volgende woord te tonen.
    function compareWords() {
        let inputValue = answerField.value;
        let checkWord = objectiveWord.innerHTML;
        if (inputValue === checkWord) {
            wordScore++;
            charScore += checkWord.length;
            answerField.value = "";
            showWord();
        }
    }
    // Zorgen dat startknop verdwijnt nadat er op start is gedrukt
    // Zorgen dat de uitleg verdwijnt zodra er op start is gedrukt
    // Zorgen dat het anwtoordblock met daarin de opgave verschijnt nadat er op start is gedrukt
    // Zorgen dat de antwoorden vergeleken worden
    startBtn.addEventListener("click", () => {
        answerBlock.classList.remove("hidden");
        instructions.classList.add("hidden");
        startBtn.classList.add("hidden");
        setInterval(countDownClock, 1000);
        showWord();
        compareWords();
    });
    answerField.addEventListener("keyup", () => {
        compareWords();
        wordCount.innerHTML = wordScore;
        charCount.innerHTML = charScore;
    });
    refreshBtn.addEventListener("click", () => {
        this.location.reload();
    });
});

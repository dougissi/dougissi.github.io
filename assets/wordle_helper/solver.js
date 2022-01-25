class MapWithDefault extends Map {
  get(key) {
    if (!this.has(key)) this.set(key, this.default());
    return super.get(key);
  }

  constructor(defaultFunction, entries) {
    super(entries);
    this.default = defaultFunction;
  }
}

// Global variables
let numLetters = 5;
let round = null;
let validWords = null;
let knownLetterMinCounts = null;
let knownLetterMaxCounts = null;
let regex = null;
let indexToCorrectLetter = null;
let indexToWrongLetters = null;
let ownWord = null;
let ownWordIndex = null;
let topWords = null;
let guess = null;
let guessResultsByPosition = null;

addLetterColorSelectors();
$(".letter-color-selectors").hide()

startGame();

function startGame() {
  round = 0;
  knownLetterMinCounts = new Map();
  knownLetterMaxCounts = new Map();
  regex = "";

  // initialize maps for corret/wrong letters per index
  indexToCorrectLetter = new Map();
  indexToWrongLetters = new Map();
  for (let i = 0; i < numLetters; i++) {
    indexToWrongLetters.set(i, new Set());
  }
  ownWord = "";
  ownWordIndex = 0;
  guess = null;
  guessResultsByPosition = [];
  for (let i = 0; i < numLetters; i++) {
    guessResultsByPosition.push(null);
  }

  validWords = wordleAnswers;
  topWords = getNextWordOptions();
  updateValidWordsText();
  buildTopWordsSelector();
  addEmptyGuessTiles();
}

function restartGame() {
  $(".letter-tiles-grid").empty();
  startGame();
}

// score based on letter frequency in valid words
function getSortedWordScores() {
  // letter frequency
  let letterFreq = new MapWithDefault(() => 0);
  for (const word of validWords) {
    for (const letter of word) {
      letterFreq.set(letter, letterFreq.get(letter) + 1);
    }
  }

  // scores
  let wordScores = new MapWithDefault(() => []);
  for (const word of validWords) {
    let score = 0;
    for (const letter of word) {
      score += letterFreq.get(letter)
    }
    wordScores.get(score).push(word)
  }

  return new Map([...wordScores.entries()].sort((a, b) => (b[0] - a[0])))  // sort by descending score
}

// // score based on letter frequency in valid words (anywhere + by position)
// function getSortedWordScores() {
//   let wordScores = new MapWithDefault(() => []);
//
//   // get letter frequencies
//   let letterFreqWholeWord = new MapWithDefault(() => 0);
//   let letterFreqByPosition = new Map();
//   for (let i = 0; i < numLetters; i++) {
//     letterFreqByPosition.set(i, new MapWithDefault(() => 0));
//   }
//   for (const word of validWords) {
//     for (let i = 0; i < numLetters; i++) {
//       const letter = word[i];
//
//       // whole word
//       letterFreqWholeWord.set(letter, letterFreqWholeWord.get(letter) + 1);
//
//       // by position
//       let positionLetterFreq = letterFreqByPosition.get(i)
//       positionLetterFreq.set(letter, positionLetterFreq.get(letter) + 1);
//     }
//   }
//
//   // get score
//   for (const word of validWords) {
//     let score = 0;
//     for (let i = 0; i < numLetters; i++) {
//       const letter = word[i];
//       score += letterFreqWholeWord.get(letter)
//       score += letterFreqByPosition.get(i).get(letter);
//     }
//     wordScores.get(score).push(word)
//   }
//
//   return new Map([...wordScores.entries()].sort((a, b) => (b[0] - a[0])))  // sort by descending score
// }

function getLetterCounts(word) {
  let letterCounts = new MapWithDefault(() => 0)

  for (const letter of word) {
    letterCounts.set(letter, letterCounts.get(letter) + 1);
  }

  return letterCounts
}

function newDuplicatesMinimized(word, maxNewDuplicates) {
  let newDuplicates = 0;
  let letterCounts = getLetterCounts(word);
  for (const [letter, count] of letterCounts) {
    if (count == 1) {
      continue;
    }

    if (knownLetterMinCounts.has(letter)) {
      newDuplicates += count - 1 - knownLetterMinCounts.get(letter);
    } else {
      newDuplicates += count - 1;
    }
  }

  if (newDuplicates <= maxNewDuplicates) {
    return true;
  }
  return false;
}

function getNextWordOptions() {
  let maxScore = 0;
  let matchedWords = new Set();
  let sortedWordScores = getSortedWordScores();
  let dupIdtoTopWords = new MapWithDefault(() => []);
  let topWords = new Map();

  for (let maxNewDuplicates = 0; maxNewDuplicates < numLetters; maxNewDuplicates++) {
    for (const [score, words] of sortedWordScores) {
      if (score < maxScore)  {
        break;
      }
      for (const word of words) {
        if (matchedWords.has(word)) {
          continue;
        }
        if (newDuplicatesMinimized(word, maxNewDuplicates)) {
          matchedWords.add(word);
          const dupId = `${maxNewDuplicates}|${score}`;
          dupIdtoTopWords.get(dupId).push(word);
          topWords.set(word, `duplicate new letters: ${maxNewDuplicates}`)
          maxScore = score
        }
      }
    }
  }

  // // log top options
  // for (const [dupId, topWords] of dupIdtoTopWords) {
  //   let [maxNewDups, score] = dupId.split("|");
  //   console.log(`\nTop words score: ${score} (<= ${maxNewDups} duplicates from unknown letters)`);
  //   for (const word of topWords) {
  //     console.log(word);
  //   }
  // }

  return topWords;
}

function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

function evaluateGuess(guessWord, guessResult) {
  if (guessWord.length != numLetters | guessResult.length != numLetters) {
    throw `guessed word and result must both contain ${numLetters} letters`
  }
  let guessKnownLetterMinCounts = new MapWithDefault(() => 0);
  let guessLettersByResult = new Map([["+", new Set()], ["o", new Set()], ["-", new Set()]])

  for (let i = 0; i < numLetters; i++) {
    const guessLetter = guessWord[i];
    const guessLetterResult = guessResult[i];

    guessLettersByResult.get(guessLetterResult).add(guessLetter)

    if (guessLetterResult == "+") {
      indexToCorrectLetter.set(i, guessLetter);
      indexToWrongLetters.delete(i);
      guessKnownLetterMinCounts.set(guessLetter, guessKnownLetterMinCounts.get(guessLetter) + 1);
    } else if (guessLetterResult == "o") {
      if (indexToWrongLetters.has(i)) {
        indexToWrongLetters.get(i).add(guessLetter);
      }
      guessKnownLetterMinCounts.set(guessLetter, guessKnownLetterMinCounts.get(guessLetter) + 1);
    } else if (guessLetterResult == "-") {
      if (indexToWrongLetters.has(i)) {
        indexToWrongLetters.get(i).add(guessLetter);
      }
    } else {
      throw "guess result can only contain '+', 'o', or '-' characters";
    }
  }

  // identify wrong letters and see if any max counts can be identified
  let guessWrongLetters = new Set();
  for (const wrongLetter of guessLettersByResult.get("-")) {
    if (guessKnownLetterMinCounts.has(wrongLetter)) {
      knownLetterMaxCounts.set(wrongLetter, guessKnownLetterMinCounts.get(wrongLetter));
    }
    if (!guessLettersByResult.get("o").has(wrongLetter)) {
      guessWrongLetters.add(wrongLetter);
    }
  }

  // add all wrong letters to list for each index
  for (let i = 0; i < numLetters; i++) {
    if (!indexToWrongLetters.has(i)) {
      continue;
    }
    indexToWrongLetters.set(i, union(indexToWrongLetters.get(i), guessWrongLetters))
  }

  // update known letter minimum counts
  for (const [guessLetter, guessMinCount] of guessKnownLetterMinCounts) {
    if (knownLetterMinCounts.has(guessLetter)) {
      let priorMinCount = knownLetterMinCounts.get(guessLetter);
      if (guessMinCount > priorMinCount) {
        knownLetterMinCounts.set(guessLetter, guessMinCount);
      }
    } else {
      knownLetterMinCounts.set(guessLetter, guessMinCount);
    }
  }
}

function updateRegEx() {
  regex = "";
  for (let i = 0; i < numLetters; i++) {
    if (indexToWrongLetters.has(i)) {
      regex += `[^${[...indexToWrongLetters.get(i)].join("")}]`;
    } else if (indexToCorrectLetter.has(i)) {
      regex += indexToCorrectLetter.get(i);
    } else {
      throw `position index ${i} has neither wrong letters nor correct letters defined`
    }
  }
}

function updateValidWords() {
  let updatedValidWords = new Set();

  for (const word of validWords) {
    // if (invalidWords.has(word)) {
    //   continue;
    // }

    if (!word.match(regex)) {
      continue;
    }

    let hasCorrectLetterCounts = true;
    let letterCounts = getLetterCounts(word);
    for (const [letter, minCount] of knownLetterMinCounts) {
      let count = letterCounts.get(letter);
      if (count < minCount) {
        hasCorrectLetterCounts = false;
        break;
      }
      if (knownLetterMaxCounts.has(letter)) {
        const maxCount = knownLetterMaxCounts.get(letter);
        if (count > maxCount) {
          hasCorrectLetterCounts = false;
          break;
        }
      }
    }
    if (hasCorrectLetterCounts) {
      updatedValidWords.add(word);
    }
  }

  validWords = updatedValidWords;
}

function evaluateGuessAndGetNextWordOptions(guessWord, guessResult) {
  // TODO increment round
  evaluateGuess(guessWord, guessResult);
  updateRegEx();
  updateValidWords();
  topWords = getNextWordOptions();
}



/*
 *
 * Interact with fontend
 *
 *
 */

let clientIP = "";

$.getJSON("https://api.ipify.org?format=json", function(data) {
 clientIP = data.ip;
})


function updateValidWordsText() {
  $("#num-valid-words").text(`Count: ${validWords.size}`);
  $(".valid-words-box").text(`${[...validWords].join(", ")}`);

  // MAKE EACH VALID WORD SELECTABLE
  // $(".valid-word-option").remove();
  //
  // let validWordsHTMLs = [];
  // for (const word of validWords) {
  //   validWordHTML = `<div class="row valid-word-option"><div class="col-9"><input type="radio" name="guess-selector" id="valid-${word}-radio-button" value="${word}">\n<label for="valid-${word}-radio-button">${word}</label></div><div class="col-3"><button class="invalid-button" value="${word}">Invalid word?</button></div></div>`
  //   validWordsHTMLs.push(validWordHTML);
  // }
  // $(".valid-words-box").append(validWordsHTMLs.join(""));
}

function buildTopWordsSelector() {
  $(".top-word-option").remove()
  for (const [word, description] of topWords) {
    $(".top-word-suggestions").append(`<div class="row top-word-option"><div class="col-2"><input type="radio" name="guess-selector" id="${word}-radio-button" value="${word}">\n<label for="${word}-radio-button">${word}</label></div><div class="col-10">${description}</div></div>`)
  }
}

function addEmptyGuessTiles() {
  let tilesHTMLs = [];
  for (let i = 0; i < numLetters; i++) {
    tileHTML = `<div class="col"><div class="tile" id="row${round - 1}col${i}"></div></div>`
    tilesHTMLs.push(tileHTML);
  }
  let emptyTilesRow = `<div class="row">${tilesHTMLs.join("")}</div>`
  $(".letter-tiles-grid").append(emptyTilesRow);
}

function addLetterToTile(letter, i) {
  $(`#row${round - 1}col${i}`).text(letter);
}

function addGuessLettersToTiles(guess, round) {
  for (let i = 0; i < numLetters; i++) {
    const letter = guess[i];
    addLetterToTile(letter, i);
  }
}

function removeGuessLettersFromTiles(round) {
  addGuessLettersToTiles(" ".repeat(numLetters), round);
}

function addLetterColorSelectors() {
  let colorsHTMLs = [];
  for (const [color, resultKey] of [["green", "+"], ["yellow", "o"], ["gray", "-"]]) {
    let lettersHTMLs = [];
    for (let i = 0; i < numLetters; i++) {
      letterHTML = `<div class="col"><input type="radio" class="letter-color-selector" name="letter-color-selector${i}" id="${color}-${i}" value="${resultKey}">\n<label for="${color}-${i}" class="${color}-text">${color}</label></div>`;
      lettersHTMLs.push(letterHTML);
    }
    let colorRow = `<div class="row">${lettersHTMLs.join("")}</div>`
    colorsHTMLs.push(colorRow);
  }
  let colorSelectorsHTML = colorsHTMLs.join("");
  $(".letter-color-selectors").append(colorSelectorsHTML);

  // evaluate button below
  let buttonRow = '<div class="row"><div class="col-6 text-center"><button class="guess-button-row this-is-the-word-button">This is the word!</button></div><div class="col-6 text-center"><button class="guess-button-row evaluate-button" disabled>Evaluate</button></div></div>'
  $(".letter-color-selectors").append(buttonRow);
}

function clearLetterColorSelections() {
  for (let i = 0; i < numLetters; i++) {
    $(`input[name="letter-color-selector${i}"]`).prop("checked", false);
  }
  $(".evaluate-button").prop("disabled", true);
  for (let i = 0; i < numLetters; i++) {
    let letterId = `row${round - 1}col${i}`;
    $(`#${letterId}`).css("background-color", "initial");
    $(`#${letterId}`).css("color", "initial");
    $(`#${letterId}`).css("border", "var(--border)");
  }
}

function addGuess(word) {
  addGuessLettersToTiles(word, round);
  clearLetterColorSelections();
  $(".letter-color-selectors").show();
  $("#own-word").val("");
}

// // when enter pressed after entering own word text
// $("#own-word").keyup( function() {
//   if (event.keyCode === 13) {
//     $("#submit-own-word").click();
//   }
// })
//
// // when own word submit button gets clicked
// $("#submit-own-word").click( function() {
//   let ownWord = $("#own-word").val();
//
//   // validate
//   if (validWords.has(ownWord)) {
//     addGuess(ownWord);
//     guess = ownWord;
//   } else {
//     console.log(`${ownWord} not in valid word list`);
//   }
// })

// function submitInvalidWord(word) {
//   //let invalid_form = "https://docs.google.com/forms/d/e/1FAIpQLSdfVRv4IB4qEFwSvE99OLOsL2NWy7rNI6txpgOaPtMWwqS-7A/viewform?usp=pp_url&entry.1009398697=73.223.117.235&entry.1683530625=zzzzz"
//   $("#invalid-word-client-ip").val(clientIP);
//   $("#invalid-word-submission").val(word);
//   $("#invalid-word-submit-button").click();
// }

function getAndSubmitGuessResult() {
  // get source of guess
  let guessSource = "own";
  if ($(`#${guess}-radio-button`).prop("checked")) {  // radio button for guess is checked
    guessSource = "suggested";
  }

  let guessResult = guessResultsByPosition.join("");

  $("#guess-form-client-ip").val(clientIP);
  $("#guess-form-round").val(round);
  $("#guess-form-guess-word").val(guess);
  $("#guess-form-result").val(guessResult);
  $("#guess-form-source").val(guessSource);
  $("#guess-form-submit-button").click();

  return guessResult;
}



function keyActions(key, keyCode) {
  // TODO: pause while in end game?

  if (keyCode >= 65 & keyCode <= 90) {  // key is letter A - Z
    if (ownWordIndex < numLetters) {
      addLetterToTile(key.toLowerCase(), ownWordIndex);
      ownWord += key;
      ownWordIndex++;
    }
  } else if (keyCode == 8) {  // key is backspace / delete
    if (ownWordIndex > 0) {
      ownWordIndex -= 1;
      ownWord = ownWord.slice(0, ownWordIndex);
      addLetterToTile(" ", ownWordIndex);
      if (guess) {
        $(".letter-color-selectors").hide()
        clearLetterColorSelections();
        $(`#${guess}-radio-button`).prop("checked", false);
        guess = null;
      }
    }
  } else if (keyCode == 13) {  // key is enter
    if (guess) {
      if (!$(".evaluate-button").prop("disabled")) {
        $(".evaluate-button").click();
      }
    } else if (ownWord.length == numLetters) {
      if (wordleAcceptableWords.has(ownWord)) {
        addGuess(ownWord);
        guess = ownWord;
        $(`#${guess}-radio-button`).prop("checked", true);
      } else {
        alert(`"${ownWord}" not in Wordle word list; please enter a different word`);
      }
    }
  }
}

// when key is pressed
$(document).on("keydown", function(event) {
  const key = event.key;
  const keyCode = event.keyCode;
  keyActions(key, keyCode);
})

// when keyboard button is clicked
$(".key-button").click( function() {
  let key = $(this).text();
  let keyCode = this.id;
  keyActions(key, keyCode);
})

// when top word radio button gets clicked
$(document).on("click", 'input[name="guess-selector"]', function () {
  guess = this.value;
  addGuess(guess);
  ownWord = guess;
  ownWordIndex = 5;
})

function checkCanEvaluateGuess() {
  let allLettersHaveResults = true;
  for (let i = 0; i < numLetters; i++) {
    if (!guessResultsByPosition[i]) {
      allLettersHaveResults = false;
      break;
    }
  }
  if (allLettersHaveResults) {
    $(".evaluate-button").prop("disabled", false);
  }
}

// when letter color selector clicked
$(".letter-color-selector").click( function() {
  let [color, i] = this.id.split("-");
  let resultKey = this.value;
  let letterId = `row${round - 1}col${i}`
  guessResultsByPosition[i] = resultKey;
  $(`#${letterId}`).css("background-color", `var(--${color})`);
  $(`#${letterId}`).css("color", "white");
  $(`#${letterId}`).css("border", "none");
  checkCanEvaluateGuess();
})

function endGame(verdict) {
  $(".letter-color-selectors").hide();
  let header = null;
  if (verdict == "won") {
    header = "You did it!";
  } else if (verdict == "lost") {
    header = "No answers remain :("
  } else {
    throw "verdict can only be 'won' or 'lost'";
  }
  let endgameOverlay = `<div class="end-game"><h2>${header}</h2><button class="play-again">Play again?</button></div>`
  $(endgameOverlay).insertBefore( $("#main-content") );
}

// when evaluate button clicked
$(".evaluate-button").click( function() {
  let guessResult = getAndSubmitGuessResult();

  // check if found final word
  let resultsSet = new Set(guessResult);
  if (resultsSet.size == 1 & resultsSet.has("+")) {
    endGame("won");
    return;
  }

  evaluateGuessAndGetNextWordOptions(guess, guessResult);
  buildTopWordsSelector();
  updateValidWordsText();
  if (validWords.size == 0) {
    endGame("lost");
    return;
  }
  round++;
  guess = null;
  ownWord = "";
  ownWordIndex = 0;
  addEmptyGuessTiles();

  // reset guess results by position
  for (let i = 0; i < numLetters; i++) {
    guessResultsByPosition[i] = null;
  }

  clearLetterColorSelections();
  $(".letter-color-selectors").hide();
})

// when "this is the word" button is clicked
$(".this-is-the-word-button").click ( function () {
  // click all green
  for (let i = 0; i < numLetters; i++) {
    $(`#green-${i}`).click();
  }

  getAndSubmitGuessResult();
  endGame("won");
})

// when play again? button is clicked
$(document).on("click", ".play-again", function() {
  $(".end-game").remove();
  restartGame();
})

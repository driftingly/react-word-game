import React from "react";

import { sample, range } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput";
import GuessResults from "../GuessResults";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";
import Banner from "../Banner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const initialGuesses = range(0, NUM_OF_GUESSES_ALLOWED).map(() =>
    range(0, 5).map(() => ({ letter: " ", status: "" }))
  );
  const [guesses, setGuesses] = React.useState(initialGuesses);
  const [currentGuessIndex, setcurrentGuessIndex] = React.useState(0);
  const [gameStatus, setGameStatus] = React.useState("playing");

  function handleSubmitGuess(tentativeGuess) {
    const nextGuesses = guesses;
    const checkedGuess = checkGuess(tentativeGuess, answer);
    const isCorrect = tentativeGuess.toUpperCase() === answer;

    if (gameStatus !== "playing") {
      return;
    }

    nextGuesses[currentGuessIndex] = checkedGuess;
    setGuesses(nextGuesses);

    if (isCorrect) {
      setGameStatus("won");
      return;
    }

    if (currentGuessIndex + 1 >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
      return;
    }

    setcurrentGuessIndex(currentGuessIndex + 1);
  }

  return (
    <>
      <Banner
        gameStatus={gameStatus}
        currentGuessIndex={currentGuessIndex}
        answer={answer}
      />
      <GuessResults guesses={guesses} />
      {gameStatus == "playing" && (
        <GuessInput handleSubmitGuess={handleSubmitGuess} />
      )}
    </>
  );
}

export default Game;

import React from "react";

function GuessResults({ guesses }) {
  return (
    <div className="guess-results">
      {guesses.map((guess, index) => (
        <p key={index} className="guess">
          {guess.map(({ letter, status }, index) => (
            <span key={index} className={`cell ${status}`}>
              {letter}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

export default GuessResults;

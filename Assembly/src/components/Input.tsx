import { clsx } from 'clsx';
import { Keyboard } from './Keyboard';
import { buttonPhase, type gameProgress } from '../App';

export function Input({
  buttonStatus,
  currentOccurrence,
  currentWord,
  gameStatus,
  guessedLetters,
  setButtonStatus,
  setCurrentOccurrences,
  setGuessedLetters,
  setWrongGuesses,
  wrongGuesses,
}: {
  buttonStatus: buttonPhase[];
  currentOccurrence: number[];
  currentWord: string[];
  gameStatus: gameProgress;
  guessedLetters: string[];
  wrongGuesses: number;
  setButtonStatus: (updater: (prev: buttonPhase[]) => buttonPhase[]) => void;
  setGuessedLetters: (updater: (prev: string[]) => string[]) => void;
  setCurrentOccurrences: (updater: (prev: number[]) => number[]) => void;
  setWrongGuesses: (updater: (prev: number) => number) => void;
}) {
  function assignColor(idx: number, status: buttonPhase) {
    const isFull = guessedLetters.every((element) => element !== '');
    if (!isFull) {
      setButtonStatus((prev) => {
        const updatedArray: buttonPhase[] = [...prev];
        updatedArray[idx] = status;
        return updatedArray;
      });
    }
  }

  function checkLetter(alphabet: string, idx: number): void {
    if (gameStatus === 'won' || gameStatus === 'lost') return;
    const totalOccurrencesOfAlphabet: number = currentWord.filter(
      (elem) => elem === alphabet,
    ).length;

    if (totalOccurrencesOfAlphabet === 0) {
      if (wrongGuesses < 8) {
        assignColor(idx, buttonPhase.incorrect);
        setWrongGuesses((prev) => prev + 1);
        return;
      } else return;
    }

    if (totalOccurrencesOfAlphabet > 0) {
      if (currentOccurrence[idx] < totalOccurrencesOfAlphabet - 1) {
        addLetter(alphabet);
        assignColor(idx, buttonPhase.highlighted);
        setCurrentOccurrences((prev) => {
          const updatedArray: number[] = [...prev];
          updatedArray[idx] = currentOccurrence[idx] + 1;
          return updatedArray;
        });
      } else if (currentOccurrence[idx] === totalOccurrencesOfAlphabet - 1) {
        addLetter(alphabet);
        assignColor(idx, buttonPhase.correct);
        return;
      }
    }
  }

  function addLetter(alphabet: string): void {
    let indexOfAlphabet: number = currentWord.indexOf(alphabet, 0);
    while (indexOfAlphabet !== -1 && guessedLetters[indexOfAlphabet] !== '') {
      indexOfAlphabet = currentWord.indexOf(alphabet, indexOfAlphabet + 1);
    }
    if (indexOfAlphabet === -1) return;
    else
      setGuessedLetters((prev) => {
        const updatedArray: string[] = [...prev];
        updatedArray[indexOfAlphabet] = alphabet;
        return updatedArray;
      });
  }

  const currentArray = guessedLetters.map((letter, idx) => (
    <span key={idx} className="span-input">
      {letter}
    </span>
  ));

  const actualArray = guessedLetters.map((letter, idx) => {
    return (
      <span
        key={idx}
        className={clsx('span-input', letter === '' && 'unguessed')}
      >
        {letter === '' ? currentWord[idx] : letter}
      </span>
    );
  });

  return (
    <>
      <div className="input-div">
        {gameStatus === 'lost' ? actualArray : currentArray}
      </div>
      <div className="main-keyboard-div">
        <Keyboard checkLetter={checkLetter} buttonStatus={buttonStatus} />
      </div>
    </>
  );
}

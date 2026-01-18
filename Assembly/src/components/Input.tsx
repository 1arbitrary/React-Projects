import { Keyboard } from './Keyboard';
import type { Status } from '../App';

export function Input({
  currentWord,
  guessedLetters,
  isCorrect,
  setGuessedLetters,
  setIsCorrect,
  setWrongGuesses,
  wrongGuesses,
}: {
  currentWord: string[];
  guessedLetters: string[];
  wrongGuesses: number;
  isCorrect: Status[];
  setGuessedLetters: (updater: (prev: string[]) => string[]) => void;
  setIsCorrect: (updater: (prev: Status[]) => Status[]) => void;
  setWrongGuesses: (updater: (prev: number) => number) => void;
}) {
  function assignColor(idx: number, status: boolean): void {
    const isFull = guessedLetters.every((element) => element !== '');
    if (!isFull) {
      setIsCorrect((prev) => {
        const updatedArray: Status[] = [...prev];
        updatedArray[idx] = status ? 'correct' : 'incorrect';
        return updatedArray;
      });
    } else return;
  }

  function checkLetter(alphabet: string, idx: number): void {
    if (currentWord.includes(alphabet)) {
      addLetter(alphabet);
      assignColor(idx, true);
    } else {
      if (wrongGuesses < 8) {
        assignColor(idx, false);
        setWrongGuesses((prev) => prev + 1);
      }
    }
  }

  function addLetter(alphabet: string): void {
    let indexOfAlphabet: number = currentWord.indexOf(alphabet, 0);
    const empty: string = '';
    while (
      indexOfAlphabet !== -1 &&
      guessedLetters[indexOfAlphabet] !== empty
    ) {
      indexOfAlphabet = currentWord.indexOf(alphabet, indexOfAlphabet + 1);
    }
    if (indexOfAlphabet === -1) return;

    setGuessedLetters((prev) => {
      const updatedArray: string[] = [...prev];
      updatedArray[indexOfAlphabet] = alphabet;
      return updatedArray;
    });
  }

  const mappedArr = guessedLetters.map((letter, idx) => (
    <span key={idx} className="span-input">
      {letter}
    </span>
  ));

  return (
    <>
      <div className="input-div">{mappedArr}</div>
      <div className="main-keyboard-div">
        <Keyboard checkLetter={checkLetter} isCorrect={isCorrect} />
      </div>
    </>
  );
}

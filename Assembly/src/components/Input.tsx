import { Keyboard } from './Keyboard';

type Status = 'correct' | 'incorrect' | 'undecided';
export function Input({
  currentWord,
  guessedLetters,
  setGuessedLetters,
  setIsCorrect,
  isCorrect,
}: {
  currentWord: string[];
  guessedLetters: string[];
  setGuessedLetters: (updater: (prev: string[]) => string[]) => void;
  isCorrect: Status[];
  setIsCorrect: (updater: (prev: Status[]) => Status[]) => void;
}) {
  function assignColor(idx: number, status: boolean): void {
    setIsCorrect((prev) => {
      let updatedArray: Status[] = [...prev];
      updatedArray[idx] = status ? 'correct' : 'incorrect';
      return updatedArray;
    });
  }

  function checkLetter(alphabet: string, idx: number): void {
    if (currentWord.includes(alphabet)) {
      addLetter(alphabet);
      assignColor(idx, true);
    } else {
      assignColor(idx, false);
    }
  }

  function addLetter(alphabet: string): void {
    let indexOfAlphabet: number = currentWord.indexOf(alphabet, 0);
    while (indexOfAlphabet !== -1 && guessedLetters[indexOfAlphabet] !== '') {
      indexOfAlphabet = currentWord.indexOf(alphabet, indexOfAlphabet + 1);
    }
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

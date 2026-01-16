import { Keyboard } from '../App.tsx';

export function Input({
  currentWord,
  guessedLetters,
  setGuessedLetters,
}: {
  currentWord: string[];
  guessedLetters: string[];
  setGuessedLetters: (updater: (prev: string[]) => string[]) => void;
}) {
  function checkLetter(alphabet: string): boolean {
    if (currentWord.includes(alphabet)) {
      addLetter(alphabet);
      return true;
    } else {
      return false;
    }
  }

  function addLetter(alphabet: string): void {
    let indexOfAlphabet: number = currentWord.indexOf(alphabet, 0);
    while (indexOfAlphabet !== -1 && guessedLetters[indexOfAlphabet] !== '') {
      indexOfAlphabet = currentWord.indexOf(alphabet, indexOfAlphabet + 1);
      if (indexOfAlphabet === -1) return;
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
        <Keyboard checkLetter={checkLetter} />
      </div>
    </>
  );
}

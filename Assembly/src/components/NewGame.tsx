import { buttonPhase } from '../App.tsx';

export function NewGame({
  newWord,
  setButtonStatus,
  setCurrentOccurrences,
  setCurrentWord,
  setGuessedLetters,
  setWrongGuesses,
}: {
  newWord: () => string[];
  setButtonStatus: (updater: (prev: buttonPhase[]) => buttonPhase[]) => void;
  setCurrentOccurrences: (updater: (prev: number[]) => number[]) => void;
  setCurrentWord: (updater: (prev: string[]) => string[]) => void;
  setGuessedLetters: (updater: (prev: string[]) => string[]) => void;
  setWrongGuesses: (updater: (prev: number) => number) => void;
}) {
  function resetGameLogic(): void {
    const updatedWord: string[] = newWord();
    const keyboardSize: number = 26;
    setCurrentWord(() => updatedWord);
    setGuessedLetters(() => new Array(updatedWord.length).fill(''));
    setButtonStatus(() => new Array(keyboardSize).fill(buttonPhase.idle));
    setWrongGuesses(() => 0);
    setCurrentOccurrences(() => new Array(keyboardSize).fill(1));
  }
  return (
    <div className="new-game-div">
      <button className="new-game-btn" onClick={resetGameLogic}>
        New Game
      </button>
    </div>
  );
}

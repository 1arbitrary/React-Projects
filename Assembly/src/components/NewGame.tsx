import type { gameProgress, Status } from '../App.tsx';

export function NewGame({
  newWord,
  setCurrentWord,
  setGameStatus,
  setGuessedLetters,
  setIsCorrect,
  setWrongGuesses,
}: {
  newWord: () => string[];
  setCurrentWord: (updater: (prev: string[]) => string[]) => void;
  setGameStatus: (updater: () => gameProgress) => void;
  setGuessedLetters: (updater: (prev: string[]) => string[]) => void;
  setIsCorrect: (updater: (prev: Status[]) => Status[]) => void;
  setWrongGuesses: (updater: () => number) => void;
}) {
  function generateWord(): void {
    const updatedWord: string[] = newWord();
    setCurrentWord(() => updatedWord);
    setGuessedLetters(() => new Array(updatedWord.length).fill(''));
    setIsCorrect((prev) => prev.map(() => 'undecided'));
    setWrongGuesses(() => 0);
    setGameStatus(() => 'ongoing');
  }
  return (
    <div className="new-game-div">
      <button className="new-game-btn" onClick={generateWord}>
        New Game
      </button>
    </div>
  );
}

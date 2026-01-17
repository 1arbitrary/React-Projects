type Status = 'correct' | 'incorrect' | 'undecided';
export function NewGame({
	newWord,
	setCurrentWord,
	setGuessedLetters,
	setIsCorrect,
}: {
  newWord: () => string[];
  setCurrentWord: (updater: (prev: string[]) => string[]) => void;
  setGuessedLetters: (updater: (prev: string[]) => string[]) => void;
  setIsCorrect: (updater: (prev: Status[]) => Status[]) => void;
}) {
  function generateWord(): void {
    const updatedWord: string[] = newWord();
    setCurrentWord(() => updatedWord);
    setGuessedLetters(() => new Array(updatedWord.length).fill(''));
    setIsCorrect((prev) => prev.map(() => 'undecided'));
  }
  return (
    <div className="new-game-div">
      <button className="new-game-btn" onClick={generateWord}>
        New Game
      </button>
    </div>
  );
}

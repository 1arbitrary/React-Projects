import { useState } from 'react';
import { languages } from './languages';
import { wordsArr } from './words';
import { Input } from './components/Input.tsx';
import './App.css';

function Header() {
  return (
    <header>
      <h1 className="heading">Assembly: Endgame</h1>
      <p className="header-sub-text">
        Guess the word in under 8 attempts to keep the programming world safe
        from Assembly!
      </p>
    </header>
  );
}

function Status() {
  // Hard-code for the time being.
  return (
    <div className="status-div">
      <div className="inner-status-div">
        <p style={{ fontSize: '1.75rem' }}>You Win!</p>
        <p style={{ fontSize: '1rem' }}>Well Done! &nbsp; 🎉</p>
      </div>
    </div>
  );
}

function LanguageSection({
  name,
  bgColor,
  textColor,
}: {
  name: string;
  bgColor: string;
  textColor: string;
}) {
  const styles: React.CSSProperties = {
    color: textColor,
    fontWeight: 500,
    textAlign: 'center',
    backgroundColor: bgColor,
  };
  return (
    <div className="lang-div" style={styles}>
      <p style={{ padding: '2px 2px' }}>{name}</p>
    </div>
  );
}

function NewGame({
  newWord,
  setCurrentWord,
  setGuessedLetters,
}: {
  newWord: () => string[];
  setCurrentWord: (updater: (prev: string[]) => string[]) => void;
  setGuessedLetters: (updater: (prev: string[]) => string[]) => void;
}) {
  function generateWord(): void {
    const updatedWord: string[] = newWord();
    setCurrentWord(() => updatedWord);
    setGuessedLetters(() => new Array(updatedWord.length).fill(''));
  }
  return (
    <div className="new-game-div">
      <button className="new-game-btn" onClick={generateWord}>
        New Game
      </button>
    </div>
  );
}

export function AssemblyEndGame() {
  const generateWord = () =>
    wordsArr[Math.floor(Math.random() * wordsArr.length)]
      .toUpperCase()
      .split('');

  const [currentWord, setCurrentWord] = useState<string[]>(generateWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>(() =>
    new Array(currentWord.length).fill(''),
  );

  type Status = 'correct' | 'incorrect' | 'undecided';
  const [isCorrect, setIsCorrect] = useState<Status[]>(() =>
    new Array(26).fill('undecided'),
  );

  const langArr = languages.map((lang, idx) => (
    <LanguageSection
      name={lang.name}
      bgColor={lang.backgroundColor}
      textColor={lang.textColor}
      key={idx}
    />
  ));

  return (
    <>
      <Header />
      <Status />
      <p style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>
        {currentWord}
      </p>
      <div className="main-languages-div">
        <div className="inner-main-lang-div">{langArr}</div>
      </div>
      <Input
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        setGuessedLetters={setGuessedLetters}
        isCorrect={isCorrect}
        setIsCorrect={setIsCorrect}
      />
      <NewGame
        newWord={generateWord}
        setCurrentWord={setCurrentWord}
        setGuessedLetters={setGuessedLetters}
      />
    </>
  );
}

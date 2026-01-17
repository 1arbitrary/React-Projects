import { useState } from 'react';
import { languages } from './languages';
import { wordsArr } from './words';
import { Input } from './components/Input.tsx';
import { NewGame } from './components/NewGame.tsx';
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

function LanguageSection() {
  const mappedLanguageArray = languages.map((lang, idx) => (
    <button
      className="lang-btn"
      key={idx}
      style={{
        backgroundColor: lang.backgroundColor,
        color: lang.textColor,
      }}
    >
      {lang.name}
    </button>
  ));
  return (
    <div className="outer-lang-div">
      <div className="inner-lang-div">{mappedLanguageArray}</div>
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

  return (
    <>
      <Header />
      <Status />
      <p style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>
        {currentWord}
      </p>
      <LanguageSection />
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
        setIsCorrect={setIsCorrect}
      />
    </>
  );
}

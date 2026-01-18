import { useEffect, useState } from 'react';
import { languages } from './languages';
import { wordsArr } from './words';
import { Input } from './components/Input.tsx';
import { Status } from './components/Status.tsx';
import { NewGame } from './components/NewGame.tsx';
import './App.css';

export type Status = 'correct' | 'incorrect' | 'undecided';
export type gameProgress = 'won' | 'lost' | 'ongoing';

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
  function checkGameProgress(): void {
    if (gameStatus === 'ongoing') {
      const winCheck: boolean = guessedLetters.every(
        (element) => element !== '',
      );
      if (winCheck) {
        setGameStatus('won');
        return;
      }
      if (wrongGuesses === 8) {
        setGameStatus('lost');
        return;
      }
    }
  }

  const generateWord = () =>
    wordsArr[Math.floor(Math.random() * wordsArr.length)]
      .toUpperCase()
      .split('');

  const [currentWord, setCurrentWord] = useState<string[]>(generateWord);
  const [gameStatus, setGameStatus] = useState<gameProgress>('ongoing');
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>(() =>
    new Array(currentWord.length).fill(''),
  );
  const [isCorrect, setIsCorrect] = useState<Status[]>(() =>
    new Array(26).fill('undecided'),
  );

  useEffect(checkGameProgress, [guessedLetters, wrongGuesses, gameStatus]);

  return (
    <>
      <Header />
      <Status gameStatus={gameStatus} />
      <p style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>
        {currentWord}
      </p>
      <LanguageSection />
      <Input
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        isCorrect={isCorrect}
        setGuessedLetters={setGuessedLetters}
        setIsCorrect={setIsCorrect}
        setWrongGuesses={setWrongGuesses}
        wrongGuesses={wrongGuesses}
      />
      <NewGame
        newWord={generateWord}
        setCurrentWord={setCurrentWord}
        setGameStatus={setGameStatus}
        setGuessedLetters={setGuessedLetters}
        setIsCorrect={setIsCorrect}
        setWrongGuesses={setWrongGuesses}
      />
    </>
  );
}

import { useState } from 'react';
import { languages } from './languages';
import { wordsArr } from './words';
import Keyboard from './components/Keyboard';
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

export default function AssemblyEndGame() {
  const [currentWord, setCurrentWord] = useState<string[]>(() =>
    wordsArr[Math.floor(Math.random() * wordsArr.length)].split(''),
  );
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const mappedArr = currentWord.map((letter, idx) => (
    <span key={idx} className="span-input">
      {letter.toUpperCase()}
    </span>
  ));

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

      <div className="main-languages-div">
        <div className="inner-main-lang-div">{langArr}</div>
      </div>

      <div className="input-div">{mappedArr}</div>

      <div className="main-keyboard-div">
        <Keyboard inputChars={setGuessedLetters} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          className="new-game-btn"
          onClick={() => console.log(guessedLetters)}
        >
          New Game
        </button>
      </div>
    </>
  );
}

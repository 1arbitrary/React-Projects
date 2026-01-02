import { useState } from 'react';
import { languages } from './languages';
import { wordsArr } from './words';
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

function Keyboard({
  addLetter,
}: {
  addLetter: (alphabet: string, idx: number) => void;
}) {
  const alphaArr: string[] = 'abcdefghijklmnopqrstuvwxyz'
    .toUpperCase()
    .split('');

  const mappedAlphaArr = alphaArr.map((alphabet, idx) => (
    <button
      key={alphabet}
      className="keyboard-button"
      onClick={() => addLetter(alphabet, idx)}
    >
      {alphabet}
    </button>
  ));

  return <div className="keyboard-div">{mappedAlphaArr}</div>;
}

function Input({ length }: { length: number }) {
  // Continue from here; broken asf logic
  function addLetter(alphabet: string, idx: number): void {
    /* 	setGuessedLetters(); */
  }

  const initialVal: string[] = new Array(length).fill('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>(initialVal);
  const [isActive, setIsActive] = useState<boolean[]>([]);
  const mappedArr = guessedLetters.map((letter, idx) => (
    <span key={idx} className="span-input">
      {letter}
    </span>
  ));

  return (
    <>
      <div className="input-div">{mappedArr}</div>
      <div className="main-keyboard-div">
        <Keyboard addLetter={addLetter} />
      </div>
    </>
  );
}

function NewGame() {
  return (
    <div className="new-game-btn-div">
      <button
        className="new-game-btn"
      >
        New Game
      </button>
    </div>
  );
}

export default function AssemblyEndGame() {
  const [currentWord, setCurrentWord] = useState<string[]>(() =>
    wordsArr[Math.floor(Math.random() * wordsArr.length)]
      .toUpperCase()
      .split(''),
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
      <div className="main-languages-div">
        <div className="inner-main-lang-div">{langArr}</div>
      </div>
      <Input length={currentWord.length} />
      <NewGame />
    </>
  );
}

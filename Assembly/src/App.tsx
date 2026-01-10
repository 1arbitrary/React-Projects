import { useState } from 'react';
import { clsx } from 'clsx';
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

function Keyboard({ addLetter }: { addLetter: (alphabet: string) => void }) {
  const alphaArr: string[] = 'abcdefghijklmnopqrstuvwxyz'
    .toUpperCase()
    .split('');

   const [isActive, setBtnStatus] = useState<boolean[]>(() =>
    new Array(alphaArr.length).fill(false),
  );
    
  const mappedAlphaArr = alphaArr.map((alphabet, idx) => (
    <button
      key={alphabet}
      className={clsx('keyboard-btn', isActive[idx] && 'active')}
      onClick={() => {
        addLetter(alphabet);
        setBtnStatus((prev) => {
          const updatedArray: boolean[] = [...prev];
          updatedArray[idx] = true;
          return updatedArray;
        });
      }}
    >
      {alphabet}
    </button>
  ));
  return <div className="keyboard-div">{mappedAlphaArr}</div>;
}

function Input({
  currentWord,
  filledIndexes,
  setFilledIndexes,
}: {
  currentWord: string[];
  filledIndexes: number[];
  setFilledIndexes: (updater: (prev: number[]) => number[]) => void;
}) {
  function addLetter(alphabet: string): void {
    const isInCurrentWord: boolean = currentWord.includes(alphabet);
    if (isInCurrentWord) {
      const initialIdx: number = currentWord.indexOf(alphabet);
      if (!filledIndexes.includes(initialIdx)) {
        setGuessedLetters((prev) => {
          const updatedArray: string[] = [...prev];
          updatedArray[initialIdx] = alphabet;
          return updatedArray;
        });
        setFilledIndexes((prev) => [...prev, initialIdx]);
      } else if (filledIndexes.includes(initialIdx)) {
        let updatedIdx: number = currentWord.indexOf(alphabet, initialIdx + 1);
        if (filledIndexes.includes(updatedIdx)) {
          updatedIdx = currentWord.indexOf(alphabet, updatedIdx + 1);
        }
        setGuessedLetters((prev) => {
          const updatedArray: string[] = [...prev];
          updatedArray[updatedIdx] = alphabet;
          return updatedArray;
        });
        setFilledIndexes((prev) =>
          prev.includes(updatedIdx) ? prev : [...prev, updatedIdx],
        );
      }
    }
  }

  const initialVal: string[] = new Array(currentWord.length).fill('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>(
    () => initialVal,
  );

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
    <div className="new-game-div">
      <button className="new-game-btn">New Game</button>
    </div>
  );
}

export default function AssemblyEndGame() {
  const [filledIndexes, setFilledIndexes] = useState<number[]>([]);
  const [currentWord] = useState<string[]>(() =>
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
      <p style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>
        {currentWord}
      </p>
      <div className="main-languages-div">
        <div className="inner-main-lang-div">{langArr}</div>
      </div>
      <Input
        currentWord={currentWord}
        filledIndexes={filledIndexes}
        setFilledIndexes={setFilledIndexes}
      />
      <NewGame />
    </>
  );
}

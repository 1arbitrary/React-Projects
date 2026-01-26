import { useMemo, useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

import { wordsArr as words } from './words.ts';
import { languages } from './languages.ts';

import { Header } from './components/Header.tsx';
import { Status } from './components/Status/Status.tsx';
import { LanguageSection } from './components/LanguageSection.tsx';
import { Input } from './components/Input.tsx';
import { NewGame } from './components/NewGame.tsx';
import './App.css';

export enum buttonPhase {
  idle = 1,
  correct = 2,
  incorrect = 3,
  highlighted = 4,
}

export default function AssemblyEndGame() {
  function getRandomWord(): string[] {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].toUpperCase().split('');
  }

  const { width, height }: { width: number; height: number } = useWindowSize();
  const [currentWord, setCurrentWord] = useState<string[]>(() =>
    getRandomWord(),
  );
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>(() =>
    new Array(currentWord.length).fill(''),
  );

  const gameStatus = useMemo((): string => {
    const winCheck: boolean = guessedLetters.every((element) => element !== '');
    if (winCheck) return 'won';
    if (wrongGuesses === 8) return 'lost';
    else return 'ongoing';
  }, [guessedLetters, wrongGuesses]);

  const [currentOccurrence, setCurrentOccurrences] = useState<number[]>(() =>
    new Array(26).fill(1),
  );

  const [buttonStatus, setButtonStatus] = useState<buttonPhase[]>(() =>
    new Array(26).fill(buttonPhase.idle),
  );

  return (
    <>
      {gameStatus === 'won' && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={1000}
          recycle={false}
          gravity={0.15}
        />
      )}
      <Header />
      <Status
        gameStatus={gameStatus}
        wrongGuesses={wrongGuesses}
        languages={languages}
      />
      <p style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>
        {currentWord}
      </p>
      <LanguageSection wrongGuesses={wrongGuesses} languages={languages} />
      <Input
        buttonStatus={buttonStatus}
        currentWord={currentWord}
        gameStatus={gameStatus}
        guessedLetters={guessedLetters}
        currentOccurrence={currentOccurrence}
        setButtonStatus={setButtonStatus}
        setGuessedLetters={setGuessedLetters}
        setCurrentOccurrences={setCurrentOccurrences}
        setWrongGuesses={setWrongGuesses}
        wrongGuesses={wrongGuesses}
      />
      {gameStatus !== 'ongoing' && (
        <NewGame
          newWord={getRandomWord}
          setButtonStatus={setButtonStatus}
          setCurrentOccurrences={setCurrentOccurrences}
          setCurrentWord={setCurrentWord}
          setGuessedLetters={setGuessedLetters}
          setWrongGuesses={setWrongGuesses}
        />
      )}
    </>
  );
}

import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { wordsArr } from './words';
import { Header } from './components/Header.tsx';
import { Status } from './components/Status.tsx';
import { LanguageSection } from './components/LanguageSection.tsx';
import { Input } from './components/Input.tsx';
import { NewGame } from './components/NewGame.tsx';
import './App.css';

export enum buttonPhase {
  idle = 1,
  correct = 2,
  incorrect = 3,
  highlighted = 4,
};
export type gameProgress = 'won' | 'lost' | 'ongoing';

export default function AssemblyEndGame() {
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

  const { width, height }: { width: number; height: number } = useWindowSize();
  /* const generateWord = () =>
   *   wordsArr[Math.floor(Math.random() * wordsArr.length)]
   *     .toUpperCase()
   *     .split(''); */

  const generateWord = () => 'aaaaa'.toUpperCase().split('');
  const [currentWord, setCurrentWord] = useState<string[]>(generateWord);
  const [gameStatus, setGameStatus] = useState<gameProgress>('ongoing');
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>(() =>
    new Array(currentWord.length).fill(''),
  );
  const [currentOccurrence, setCurrentOccurrences] = useState<number[]>(() =>
    new Array(26).fill(1),
  );
  const [buttonStatus, setButtonStatus] = useState<buttonPhase[]>(() =>
    new Array(26).fill(buttonPhase.idle),
  );

  useEffect(checkGameProgress, [guessedLetters, wrongGuesses, gameStatus]);

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
      <Status gameStatus={gameStatus} />
      <p style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>
        {currentWord}
      </p>
      <LanguageSection />
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
          newWord={generateWord}
          setButtonStatus={setButtonStatus}
          setCurrentOccurrences={setCurrentOccurrences}
          setCurrentWord={setCurrentWord}
          setGameStatus={setGameStatus}
          setGuessedLetters={setGuessedLetters}
          setWrongGuesses={setWrongGuesses}
        />
      )}
    </>
  );
}

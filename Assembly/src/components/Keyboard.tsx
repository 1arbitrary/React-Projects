import { clsx } from 'clsx';
import { buttonPhase } from '../App';

export function Keyboard({
  checkLetter,
  buttonStatus,
}: {
  checkLetter: (alphabet: string, idx: number) => void;
  buttonStatus: buttonPhase[];
}) {
  const alphabetArray: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return (
    <div className="keyboard-div">
      {alphabetArray.map((element, idx) => (
        <button
          key={idx}
          className={clsx(
            'keyboard-btn',
            buttonStatus[idx] === buttonPhase.idle && 'idle',
            buttonStatus[idx] === buttonPhase.correct && 'correct',
            buttonStatus[idx] === buttonPhase.incorrect && 'incorrect',
          )}
          onClick={() => checkLetter(element, idx)}
        >
          {element}
        </button>
      ))}
    </div>
  );
}

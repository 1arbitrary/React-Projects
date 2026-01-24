import { clsx } from 'clsx';
import { buttonPhase } from '../App';

export function Keyboard({
  checkLetter,
  buttonStatus,
}: {
  checkLetter: (alphabet: string, idx: number) => void;
  buttonStatus: buttonPhase[];
}) {
  const alphabetArray: string[] = 'abcdefghijklmnopqrstuvwxyz'
    .toUpperCase()
    .split('');
  const mappedAlphabetArray = alphabetArray.map((element, idx) => (
    <button
      key={idx}
      className={clsx(
        'keyboard-btn',
        buttonStatus[idx] === buttonPhase.idle && 'idle',
        buttonStatus[idx] === buttonPhase.correct && 'correct',
        buttonStatus[idx] === buttonPhase.incorrect && 'incorrect',
        buttonStatus[idx] === buttonPhase.highlighted && 'highlighted',
      )}
      onClick={() => checkLetter(element, idx)}
    >
      {element}
    </button>
  ));

  return <div className="keyboard-div">{mappedAlphabetArray}</div>;
}

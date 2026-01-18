import { clsx } from 'clsx';
import type { Status } from '../App';

export function Keyboard({
  checkLetter,
  isCorrect,
}: {
  checkLetter: (alphabet: string, idx: number) => void;
  isCorrect: Status[];
}) {
  const alphabetArray: string[] = 'abcdefghijklmnopqrstuvwxyz'
    .toUpperCase()
    .split('');

  const mappedAlphabetArray = alphabetArray.map((alphabet, idx) => (
    <button
      key={alphabet}
      className={clsx(
        'keyboard-btn',
        isCorrect[idx] === 'correct' && 'correct',
        isCorrect[idx] === 'incorrect' && 'incorrect',
      )}
      onClick={() => checkLetter(alphabet, idx)}
    >
      {alphabet}
    </button>
  ));
  return <div className="keyboard-div">{mappedAlphabetArray}</div>;
}

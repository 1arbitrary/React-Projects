import { useMemo } from 'react';

import { getFarewellObject, updateProgress } from './gameStatusConfig';

import type { progressObj } from './gameStatusConfig';
import type { Language } from '../../languages';

export function Status({
  wrongGuesses,
  gameStatus,
  languages,
}: {
  wrongGuesses: number;
  gameStatus: string;
  languages: Language[];
}) {
  const evaledObj = useMemo((): progressObj => {
    const idxOfLang = wrongGuesses - 1;
    if (wrongGuesses < 8 && idxOfLang !== -1)
      return getFarewellObject(languages[idxOfLang].name);
    if (gameStatus === 'won') return updateProgress(gameStatus);
    if (gameStatus === 'lost') return updateProgress(gameStatus);

    return updateProgress(gameStatus);
  }, [wrongGuesses, gameStatus, languages]);

  return (
    <div
      className="status-div"
      style={{
        display:
          evaledObj.display !== undefined ? evaledObj.display : 'inherit',
      }}
    >
      <div
        className="inner-status-div"
        style={{ backgroundColor: evaledObj.backgroundColor }}
      >
        <p className="status-primary-text">
          {evaledObj.primaryText !== undefined ? evaledObj.primaryText : null}
        </p>
        <p className="status-secondary-text">
          {evaledObj.secondaryText !== undefined
            ? evaledObj.secondaryText
            : null}
        </p>
      </div>
    </div>
  );
}

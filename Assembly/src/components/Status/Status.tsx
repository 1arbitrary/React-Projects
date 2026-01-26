import { useMemo } from 'react';

import { getFarewellObject, updateProgress } from './gameStatusConfig';

import type { farewellObj, progressObj } from './gameStatusConfig';
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
  type statusObj = progressObj | farewellObj;
  const evaledObj = useMemo((): statusObj => {
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
          evaledObj.type === 'progress' ? evaledObj.display : 'flex',
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
          {evaledObj.type === 'progress'
            ? evaledObj.secondaryText
            : null}
        </p>
      </div>
    </div>
  );
}

import type { gameProgress } from '../App';

export function Status({ gameStatus }: { gameStatus: gameProgress }) {
  type details = {
    status: gameProgress;
    primaryText: string;
    secondaryText: string;
    backgroundColor: string;
    display: 'flex' | 'none';
  };

  const gamePhases: details[] = [
    {
      status: 'won',
      primaryText: 'You Win!',
      secondaryText: 'Well Done ! 🎉',
      backgroundColor: 'seagreen',
      display: 'flex',
    },
    {
      status: 'lost',
      primaryText: 'Game Over!',
      secondaryText: 'You Lose! Better Start Learning Assembly 😭',
      backgroundColor: 'firebrick',
      display: 'flex',
    },
    {
      status: 'ongoing',
      primaryText: '',
      secondaryText: '',
      backgroundColor: 'inherit',
      display: 'none',
    },
  ];

  let resultObj!: details;
  for (const element of gamePhases) {
    if (element.status === gameStatus) {
      resultObj = element;
    }
  }

  return (
    <div className="status-div" style={{ display: resultObj.display }}>
      <div
        className="inner-status-div"
        style={{ backgroundColor: resultObj.backgroundColor }}
      >
        <p className="status-primary-text">{resultObj.primaryText}</p>
        <p className="status-secondary-text">{resultObj.secondaryText}</p>
      </div>
    </div>
  );
}

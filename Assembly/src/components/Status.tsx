import type { gameProgress } from '../App';

export function Status({
  gameStatus,
}: {
  gameStatus: gameProgress;
}) {
  type details = {
    status: gameProgress;
    primaryText: string;
    secondaryText: string;
    backgroundColor: string;
  };

  const gamePhases: details[] = [
    {
      status: 'won',
      primaryText: 'You Win!',
      secondaryText: 'Well Done ! 🎉',
      backgroundColor: 'seagreen',
    },
    {
      status: 'lost',
      primaryText: 'Game Over!',
      secondaryText: 'You Lose! Better Start Learning Assembly 😭',
      backgroundColor: 'firebrick',
    },
    {
      status: 'ongoing',
      primaryText: '',
      secondaryText: '',
      backgroundColor: 'inherit',
    },
  ];

    let resultObj!: details;
    for(const element of gamePhases) {
	if(element.status === gameStatus){
	    resultObj = element;
	}
}

  return (
    <div className="status-div">
      <div className="inner-status-div" style={{ backgroundColor: resultObj.backgroundColor }}>
        <p className="status-primary-text">{resultObj.primaryText}</p>
        <p className="status-secondary-text">{resultObj.secondaryText}</p>
      </div>
    </div>
  );
}

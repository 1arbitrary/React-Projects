import { useEffect, useRef, useState } from "react";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import Header from "./Components/Header/Header";
import Dice from "./Components/Dice/Dice";
import "./App.css";

export default function App() {
	const { width, height } = useWindowSize();
	const btnRef = useRef<HTMLButtonElement | null>(null);

	type diceObj = {
		randomNumber: number;
		isHeld: boolean;
		id: number;
	}

	function generateAllNewDice(): diceObj[] {
		return new Array(10)
			.fill(0)
			.map((_, idx) => ({ randomNumber: Math.floor(Math.random() * 6 + 1), isHeld: false, id: idx }));
	}

	function freezeValue(id: number): void {
		setGeneratedNumbers(prev => (prev.map((currentObj) => (currentObj.id === id) ? { ...currentObj, isHeld: !(currentObj.isHeld) } : currentObj)));
	}

	function rollDice(): void {
		if (gameWon === true) {
			setGeneratedNumbers(generateAllNewDice());
		} else {
			setGeneratedNumbers(prev => {
				return prev.map((currentDiceObj) => {
					return (currentDiceObj.isHeld) ? { ...currentDiceObj } : { ...currentDiceObj, randomNumber: Math.floor(Math.random() * 6 + 1) };
				});
			});
		}
	}

	const [generatedNumbers, setGeneratedNumbers] = useState<diceObj[]>(() => generateAllNewDice());
	const randNums = generatedNumbers.map((currentDiceObj) => <Dice value={currentDiceObj.randomNumber} isOn={currentDiceObj.isHeld} id={currentDiceObj.id} hold={freezeValue} key={currentDiceObj.id} />);

	const gameWon: boolean = generatedNumbers.length > 0 && generatedNumbers.every((currentDiceObj) => (currentDiceObj.isHeld === true && currentDiceObj.randomNumber === generatedNumbers[0].randomNumber));

	useEffect(() => {
		if (btnRef.current === null) return;
		if (gameWon) {
			btnRef.current.style.border = '4px solid pink';
			btnRef.current.focus();
		} else {
			btnRef.current.style.border = 'none';
		}

	}, [gameWon]);

	return (
		<>
			{gameWon && <Confetti width={width} height={height} />}
			<div aria-live="polite" className="sr-only">
				{(gameWon) && <p>Congratulations ! You won! Please press "New Game" to start again. </p>}
			</div>
			<Header />
			<div className="outer-btn-div">
				<div className="btn-div-main">{randNums}</div>
				<button className="roll-btn" onClick={rollDice} ref={btnRef} >{(gameWon) ? "New Game" : "Roll"}</button>
			</div>
		</>
	);
}

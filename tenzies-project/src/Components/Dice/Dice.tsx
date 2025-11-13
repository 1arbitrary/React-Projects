export default function Dice({ value, id, isOn, hold }: { value: number; id: number; isOn: boolean; hold: (id: number) => void; }) {
	const styles: { backgroundColor: string; } = {
		backgroundColor: (isOn) ? "lightgreen" : "transparent"
	};

	return (
		<button
			className="rand-buttons"
			style={styles}
			onClick={() => hold(id)}>
			{value}
		</button>
	);
}

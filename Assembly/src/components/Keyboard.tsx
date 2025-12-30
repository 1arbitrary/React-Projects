import '../App.css';

export default function Keyboard({
  inputChars,
}: {
  inputChars: (updater: string[] | ((prev: string[]) => string[])) => void;
}) {
  function addGuessedLetters(alphabet: string): void {
    inputChars((prev) =>
      prev.includes(alphabet) ? prev : [...prev, alphabet],
    );
  }

  const alphaArr: string[] = 'abcdefghijklmnopqrstuvwxyz'
    .toUpperCase()
    .split('');

  const mappedAlphaArr = alphaArr.map((alphabet) => (
    <button
      key={alphabet}
      onClick={() => addGuessedLetters(alphabet)}
      className="keyboard-button"
    >
      {alphabet}
    </button>
  ));

  return <div className="keyboard-div">{mappedAlphaArr}</div>;
}

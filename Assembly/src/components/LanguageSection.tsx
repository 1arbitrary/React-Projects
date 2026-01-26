import { clsx } from 'clsx';
import { type Language } from '../languages';

export function LanguageSection({
  wrongGuesses,
  languages,
}: {
  wrongGuesses: number;
  languages: Language[];
}) {
  const LanguagesArray = languages.map((lang, idx) => (
    <button
      className={clsx(
        'lang-btn',
        idx < wrongGuesses && 'dead',
        wrongGuesses === 8 && 'dead',
      )}
      key={idx}
      style={{
        background: lang.backgroundColor,
        color: lang.textColor,
      }}
    >
      {lang.name}
    </button>
  ));
  return (
    <div className="outer-lang-div">
      <div className="inner-lang-div">{LanguagesArray}</div>
    </div>
  );
}

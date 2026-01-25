import { clsx } from 'clsx';
import { languages } from '../languages';

export function LanguageSection({ wrongGuesses }: { wrongGuesses: number }) {
    // Basically the logic is to cover a language with a skull if a wrong guess takes place
  const LanguagesArray = languages.map((lang, idx) => (
    <button
      className={clsx('lang-btn')}
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

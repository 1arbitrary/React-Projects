import { languages } from '../languages';

export function LanguageSection() {
  // Basically the logic is to cover a language with a skull if a wrong guess takes place
  const LanguagesArray = languages.map((lang, idx) => (
    <button
      className="lang-btn"
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

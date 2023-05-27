import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, language, toggleLanguage }) {
  const [lang, setLang] = useState(language);

  useEffect(() => {
    toggleLanguage(lang);
  }, [lang]);

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className='Head-language'>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value='ru'>RU</option>
          <option value='en'>EN</option>
        </select>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.string,
  language: PropTypes.string,
  toggleLanguage: PropTypes.func,
};
Head.defaultProps = {
  toggleLanguage: () => {},
};
export default memo(Head);

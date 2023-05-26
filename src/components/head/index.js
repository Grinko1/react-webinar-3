import { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import useSelector from '../../store/use-selector';

function Head({ title, toggleLanguage }) {
  const language = useSelector((state) => state.language.currentLanguage);
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
  title: PropTypes.node,
};

export default memo(Head);

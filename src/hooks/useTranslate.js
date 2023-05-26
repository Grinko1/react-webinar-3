import { useEffect, useState } from "react";
import useSelector from "../store/use-selector";
import Translation from '../dictionary.json';

export const useTranslate = () => {
 const [content, setContent] = useState({});
  const select = useSelector((state) => ({
    lang: state.language.currentLanguage,
  }));
    useEffect(() => {
      if (select.lang === 'ru') {
        setContent(Translation.ru);
      } else {
        setContent(Translation.en);
      }
    }, [select.lang]);
    return content
}
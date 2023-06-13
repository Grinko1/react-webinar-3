import {useCallback,  useEffect,  useLayoutEffect} from "react";
import useServices from './use-services';
import { useState } from "react";
import { useMemo } from "react";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const services = useServices();
  // // Текущая локаль
  const [language, setLang] = useState(services.i18n.lang);

  // Функция для смены локали
  useEffect(() => {
    services.i18n.setLang(language);
  }, [language]);

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return services.i18n.subscribe(() => {
      setLang(services.i18n.lang);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);
  // Функция для локализации текстов
  const t = useCallback(
    (text, plural, language) => services.i18n.translate(text, plural, language),
    [language],
  );

  return { lang: language, setLang, t };
}

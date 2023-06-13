import * as translations from './translations';

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.listeners = []; // Слушатели изменений состояния
    this.lang = this.config?.lang ? this.config.lang : 'ru';

    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }
  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Установка кода языка (локали)
   * @param lang
   */
  setLang(lang) {
    // debugger;
    this.lang = lang;
    // Accept-Languages по стандарту или в X-Lang?
    this.services.api.setHeader('Accept-Language', this.lang);

    // Вызываем слушателя
    for (const listener of this.listeners) listener(this.lang);
  }

  /**
   * Перевод фразы по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(text, plural, lang = this.lang) {
    let result = translations[lang] && text in translations[lang] ? translations[lang][text] : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }
}

export default I18nService;

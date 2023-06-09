export default function dateFormat(date, locale = 'ru') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
    .format(new Date(date))
    .replace(/\s*г\./, '');
}

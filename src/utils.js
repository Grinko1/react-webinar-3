import { useState } from 'react';

/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Форматирование массива категорий
 * @param arr {Array}
 * @returns {Array}
 */
export const categoryTree = (arr) => {
  let res = [];
  const obj = Object.create(null);
  if (arr.length) {
    arr.forEach((el, i) => {
      el.children = obj[el._id] && obj[el._id].children;
      obj[el._id] = el;
      if (el.parent === undefined) {
        res.push(el);
      } else {
        obj[el.parent._id] = obj[el.parent._id] || {};
        obj[el.parent._id].children = obj[el.parent._id].children || [];
        obj[el.parent._id].children.push(el);
      }
    });
  }
  return res;
};

import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const declension = (count) => {
    let firstSymbol = count + '';
    if (firstSymbol[firstSymbol.length - 2] != 1 && count % 10 >= 2 && count % 10 <= 4) {
      return `| Выделяли ${count} раза `;
    }
    return `| Выделяли ${count} раз `;
  };

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map((item) => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}>
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title} {item.amountSelect > 0 ? declension(item.amountSelect) : ''}
                </div>
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

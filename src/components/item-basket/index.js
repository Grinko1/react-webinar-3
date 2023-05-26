import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat, plural } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';
import { useTranslate } from '../../hooks/useTranslate';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
  };
  const translate = useTranslate();

  const handleDeclination = (amount) => {
    if (props.lang === 'en') {
      return plural(
        amount,
        {
          one: 'pc',
          other: 'pcs',
        },
        'en-US',
      );
    } else {
      return translate.piece;
    }
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link
          to={`product/${props.item._id}`}
          onClick={props.handleCloseModal}
          className={cn('link')}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {handleDeclination(props.item.amount)}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate.btnDelete}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);

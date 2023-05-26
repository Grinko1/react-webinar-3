import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import { Link } from 'react-router-dom';

function BasketTool({ sum, amount, onOpen, translate, lang }) {
  const cn = bem('BasketTool');

  const handleDeclination = (amount) => {
    if (lang === 'ru') {
      return plural(amount, {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      });
    } else {
      return plural(
        amount,
        {
          one: 'product',
          other: 'products',
        },
        'en-US',
      );
    }
  };

  return (
    <div className={cn()}>
      <div className={cn('left')}>
        <Link to='/' className={cn('link')}>
          {translate?.main}
        </Link>
      </div>
      <div className={cn('rigth')}>
        <span className={cn('label')}>{translate?.inCart}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${handleDeclination(amount)} / ${numberFormat(sum)} ₽`
            : `${translate?.empty}`}
        </span>
        <button onClick={onOpen}>{translate?.btnToCart}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);

import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function BasketTotal({ sum, translate }) {
  const cn = bem('BasketTotal');
  return (
    <>
      {sum ? (
        <div className={cn()}>
          <span className={cn('cell')}>{translate.totalAmount}</span>
          <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
          <span className={cn('cell')}></span>
        </div>
      ) : (
        <div className={cn('empty')}>
          {translate.emptyCart}
        </div>
      )}
    </>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);

import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from '../../utils';
import PropTypes from 'prop-types';

function ProductInfo({ product, addToBasket, translate }) {
  const cn = bem('Product');
  const callbacks = {
    onAdd: (e) => addToBasket(product._id),
  };
  return (
    <div className={cn()}>
      <p>{product.description}</p>
      <p>
        {translate.countryOfOrigin}:
        <b>
          {product.madeIn?.title} ({product.madeIn?.code})
        </b>
      </p>
      <p>
        {translate.category}:<b> {product.category?.title}</b>
      </p>
      <p>
        {translate.year}:<b> {product.edition}</b>
      </p>
      <h2>
        {translate.price}: {numberFormat(product.price)} ₽
      </h2>
      <button onClick={callbacks.onAdd}>{translate.btnAdd}</button>
    </div>
  );
}
ProductInfo.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.shape({ title: PropTypes.string, code: PropTypes.string }),
    category: PropTypes.shape({ title: PropTypes.string }),
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  addToBasket: PropTypes.func,
};

ProductInfo.defaultProps = {
  addToBasket: () => {},
};

export default ProductInfo;

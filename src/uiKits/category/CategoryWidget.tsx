import React from 'react';
import {
  StyleCategoryItem,
  StyleCategoryName,
  StyleCategoryIcon,
} from './style';
import { useHistory } from 'react-router-dom';
import { PRODUCTS_URL } from '@config/constantUrl';
import { Icon } from '@pages/commonStyle';

const Category = (props) => {
  const { categoryId, title, img } = props;
  const history = useHistory();
  return (
    <StyleCategoryItem
      onClick={() => history.push(`${PRODUCTS_URL}/${categoryId}`)}
    >
      <Icon
        icon={img}
        style={{
          width: '25px',
          height: '25px',
          margin: '0 0 0 8px',
        }}
      />
      <StyleCategoryName>{title}</StyleCategoryName>
    </StyleCategoryItem>
  );
};

export default Category;

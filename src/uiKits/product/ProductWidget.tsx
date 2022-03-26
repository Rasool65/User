import react, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import IconWidget from '@uikits/icon/IconWidget';
import Counter from '@uikits/counter/CounterWidget';
import { StyleCustomBtn } from '@uikits/button/style';
import ShoppingBagIcon from '@assets/img/icon/Group 25.svg';
import { PRODUCT_URL, SHOPPING_LIST_URL } from '@config/constantUrl';
import {
  StyleProduct,
  StyleImage,
  StyleProductImage,
  StyleProductTitle,
  StyleAnchorTag,
  StylePrice,
  StylePriceRow,
  StylePriceTitle,
  StyleCartRow,
  StyleShowPrice,
} from './style';
import { useLocation, useHistory } from 'react-router-dom';
import { BASE_URL } from '@config/urls';
import { UtilsHelper } from '../../utils/UtilsHelper';
import { CART, GET_PRICE } from '@config/constantApi';
import useHttpRequest from '@hooks/useHttpRequest';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import {
  ShoppingListCountAction,
  ShoppingListChangeAction,
} from '@redux/shoppingList/action';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

const Product = (props) => {
  const { id, img, title, openSnackbar, CountProduct } = props;

  const [productCount, setProductCount] = useState<number>(1);
  const { shoppingListCount } = useSelector(
    (state: any) => state.ShoppingReducer
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPrice, setShowPrice] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const { postRequest, getRequest } = useHttpRequest();

  const getCount = (count) => {
    setProductCount(count);
  };

  const handleSubmit = () => {
    const value = {
      productId: id,
      count: productCount,
    };
    if (value) {
      setLoading(true);
      postRequest(CART, value)
        .then((resp) => {
          setLoading(false);
          dispatch(ShoppingListChangeAction(true));
          openSnackbar();
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  const showPriceItem = () => {
    if (id) {
      setShowPrice(true);
      getRequest(`${GET_PRICE}?productId=${id}`).then((resp) => {
        setShowPrice(true);
        setPrice(resp.data);
      });
    }
  };
  return (
    <StyleProduct>
      <NavLink to={`${PRODUCT_URL}/${id}`}>
        <StyleImage>
          <StyleProductImage
            src={`${BASE_URL}${img ? img.replace('.', '_n.') : ''}`}
          />
        </StyleImage>
      </NavLink>
      <NavLink to={`${PRODUCT_URL}/${id}`}>
        <StyleProductTitle>{title}</StyleProductTitle>
      </NavLink>

      <StylePriceRow>
        {showPrice ? (
          <>
            <StylePriceTitle>قیمت </StylePriceTitle>
            <StylePrice>
              {UtilsHelper.threeDigitSeparator(price)} ریال
            </StylePrice>
          </>
        ) : (
          <StyleShowPrice>
            <Button style={{ width: '100%' }} onClick={showPriceItem}>
              مشاهده قیمت
            </Button>
          </StyleShowPrice>
        )}
      </StylePriceRow>
      <StyleCartRow className='cart' count={CountProduct}>
        <StyleCustomBtn
          type='button'
          Width={'72px'}
          Height={'33px'}
          onClick={handleSubmit}
        >
          {loading ? (
            <ReactLoading
              type={'spinningBubbles'}
              color={'#ffffff'}
              height={15}
              width={15}
            />
          ) : (
            <IconWidget
              alt='shopingBag'
              src={ShoppingBagIcon}
              width={'15px'}
              height={'15px'}
            />
          )}
          <span>خرید</span>
        </StyleCustomBtn>

        <Counter initial={1} handleChange={getCount} />
      </StyleCartRow>
    </StyleProduct>
  );
};

export default Product;

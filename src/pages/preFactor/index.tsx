import { useState, useMemo, useEffect } from 'react';
import { StylePreFactor, StylePreFactorContent } from './style';
import { Container } from '../../style';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import tickIcon from '@assets/img/icon/tick (1).svg';
import IconWidget from '@uikits/icon/IconWidget';
import { StyleCustomBtn } from '@uikits/button/style';
import { USER_PANEL_PAYMENT_LIST } from '@config/constantUrl';
import {
  PageUrlAction,
  TablePaginationAction,
} from '@redux/tablePagination/action';

const PreFactorWidget = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { preFactor } = useSelector((State: any) => State.preFactorReducer);

  useEffect(() => {
    dispatch(PageUrlAction(''));
    dispatch(TablePaginationAction(1));
  }, []);

  return (
    <Container isHidden={false}>
      <StylePreFactor>
        <IconWidget alt='tick' src={tickIcon} width={'94px'} height={'94px'} />
        <StylePreFactorContent>
          <h2>با تشکر از ثبت پیش سفارش شما</h2>
          <p>شماره سفارش :{preFactor?.orderNumber}</p>
          <div>
            <p>اقلام سفارش</p>
            <ul>
              {!!preFactor?.orderItems &&
                preFactor?.orderItems.map((item, index) => {
                  return (
                    <li key={index}>
                      <p>نام محصول :{item?.productName}</p>
                      <p>تعداد :{item?.count}</p>
                    </li>
                  );
                })}
            </ul>
          </div>
          <StyleCustomBtn
            onClick={() =>
              history.push(`${USER_PANEL_PAYMENT_LIST}/${preFactor?.id}`)
            }
            type='button'
            Width={'160px'}
            Height={'51px'}
          >
            مشاهده جزئیات سفارش
          </StyleCustomBtn>
        </StylePreFactorContent>
      </StylePreFactor>
    </Container>
  );
};

export default PreFactorWidget;

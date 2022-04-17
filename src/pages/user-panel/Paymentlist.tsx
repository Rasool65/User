import { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import Card from '@uikits/card/CardWidget';
import {
  StyleContent,
  StylePaymentList,
  StyleTitlePayment,
  StylePriceRow,
  StyleProgress,
  SelectOption,
  StyleOrders,
  StyleColumn,
  StyleColumnTitle,
  StyleMenuItems,
  Item,
  RepeatOrder,
} from './style';
import { BASE_URL } from '@config/urls';
import { ORDERS } from '@config/constantApi';
import useHttpRequest from '@hooks/useHttpRequest';
import IconWidget from '@uikits/icon/IconWidget';
import backIcon from '@assets/img/icon/Path 2311.svg';
import { USER_PANEL_OPEN_ORDERS } from '@config/constantUrl';
import { StyleDivider } from '@uikits/divider/style';
import { UtilsHelper } from '../../utils/UtilsHelper';
import { colorPalette } from '@uikits/colors/Color';
import { useSelector } from 'react-redux';
import { StyleCustomBtn } from '@uikits/button/style';
import ReactLoading from 'react-loading';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { ShoppingListChangeAction } from '@redux/shoppingList/action';
import { useDispatch } from 'react-redux';
import { CustomSize } from '@utils/MediaQuery';
import { Icon } from '@pages/commonStyle';

const UserPanelPayments = () => {
  const { currentTablePagination } = useSelector(
    (State: any) => State.TablePaginationReducer
  );
  const { currentPageUrl } = useSelector(
    (State: any) => State.TablePaginationReducer
  );

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { id } = useParams<any>();
  const { getRequest, postRequest } = useHttpRequest();
  const [paymentValue, setPaymentValue] = useState<any>({});
  const [sumPrice, setSumPrice] = useState<number>(0);
  const [finalPrice, setfinalPrice] = useState<number>(0);
  const [taxation, setTaxation] = useState<number>(0);
  const [orderStatus, setOrderStatus] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const history = useHistory();

  const [currentValue, setCurrentValue] = useState<any>([]);
  const [historyValue, setHistoryValue] = useState<any>([]);

  const [open, setOpen] = useState(false);
  const [state, setState] = useState<any>({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;

  function Alert(Props) {
    return <MuiAlert elevation={3} variant='filled' {...Props} />;
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    getPaymentList();
  }, [id]);

  const getPaymentList = () => {
    if (!!id) {
      getRequest(`${ORDERS}/${id}`)
        .then((resp) => {
          setPaymentValue(resp.data);
          setCurrentValue(resp.data.orderItems);

          // setHistoryValue(resp.data.orderStatusHistories?.find(item => item.orderStatus === 2)?.orderItems);
          const preOrder = resp.data.orderStatusHistories?.find(
            (item) => item.orderStatus === 2
          )?.orderItems;
          if (!!preOrder && preOrder?.length > 0) {
            const newArray: any = [];
            resp.data.orderItems.map((item, index) => {
              const newItem = preOrder.find((_item) => _item.id === item.id);
              newArray.push(newItem);
            });
            setHistoryValue(newArray);
          }

          setOrderStatus(resp.data.orderStatus);
          const Price = resp.data.orderItems.reduce((prev, current) => {
            return prev + current.count * current.price;
          }, 0);
          setSumPrice(Price);
          setDiscountPrice(resp.data.discountPrice);
          setfinalPrice(Price + resp.data.tax);
          setTaxation(resp.data.tax);
        })
        .catch(() => {
          return;
        });
    }
  };

  // const changeValue = (status) => {

  //     if (status === paymentValue?.orderStatus) {

  //         setCurrentValue(paymentValue?.orderItems);
  //         setOrderStatus(paymentValue?.orderStatus);

  //     }

  //     const newItems = paymentValue?.orderStatusHistories.find(item => item.orderStatus === status);
  //     if (!!newItems) {
  //         setOrderStatus(newItems.orderStatus);
  //         setCurrentValue(newItems.orderItems);
  //     }

  // };

  useMemo(() => {
    const Price = currentValue.reduce((prev, current) => {
      return prev + current.count * current.price;
    }, 0);
    setSumPrice(Price);
    setfinalPrice(Price + taxation);
  }, [currentValue]);

  const getWidth = () => {
    if (orderStatus === 3) return { W: '226px', H: '62px' };
    if (orderStatus === 4) return { W: '338px', H: '93px' };
    if (orderStatus === 5) return { W: '470px', H: '127px' };
  };

  const repeatOrder = () => {
    setLoading(true);
    postRequest(`${ORDERS}/${paymentValue.id}/duplicateorder`, paymentValue.id)
      .then((resp) => {
        dispatch(ShoppingListChangeAction(true));
        setLoading(false);
        setOpen(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <StyleContent>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity='success'>
          سفارش با موفقیت به سبد خرید اضافه شد
        </Alert>
      </Snackbar>
      <Card>
        <StylePaymentList>
          <StyleTitlePayment>
            <div>
              <StyleProgress size={getWidth()}>
                <div className='item'>
                  <SelectOption>
                    <input
                      type='radio'
                      name='status'
                      checked={orderStatus === 2 ? true : false}
                    />
                    <span className='checkmark' />
                  </SelectOption>
                  <p>در انتظار تایید</p>
                </div>
                <StyleDivider
                  Width={'7px'}
                  Height={'2px'}
                  Type={'Horizontal'}
                  Background={colorPalette.gray_55}
                />
                <div className='item'>
                  <SelectOption>
                    <input
                      type='radio'
                      name='status'
                      checked={orderStatus === 3 ? true : false}
                    />
                    <span className='checkmark' />
                  </SelectOption>
                  <p>تایید شده</p>
                </div>
                <StyleDivider
                  Width={'7px'}
                  Height={'2px'}
                  Type={'Horizontal'}
                  Background={colorPalette.gray_55}
                />
                <div className='item'>
                  <SelectOption>
                    <input
                      type='radio'
                      name='status'
                      checked={orderStatus === 4 ? true : false}
                    />
                    <span className='checkmark' />
                  </SelectOption>
                  <p>درحال ارسال</p>
                </div>
                <StyleDivider
                  Width={'7px'}
                  Height={'2px'}
                  Type={'Horizontal'}
                  Background={colorPalette.gray_55}
                />
                <div className='item'>
                  <SelectOption>
                    <input
                      type='radio'
                      name='status'
                      checked={orderStatus === 5 ? true : false}
                    />
                    <span className='checkmark' />
                  </SelectOption>
                  <p>تحویل داده شده</p>
                </div>
              </StyleProgress>
              <p
                onClick={() => {
                  history.goBack();
                }}
              >
                <span>بازگشت</span>
                <IconWidget
                  alt='backIcon'
                  src={backIcon}
                  width={'14px'}
                  height={'10px'}
                />
              </p>
            </div>
            <h4>
              شماره سفارش &nbsp;
              {paymentValue?.orderNumber}
            </h4>
          </StyleTitlePayment>

          <StyleOrders>
            {!!historyValue &&
              historyValue?.length > 0 &&
              orderStatus !== 2 &&
              orderStatus !== 3 && (
                <StyleColumn>
                  <StyleColumnTitle>پیش سفارش</StyleColumnTitle>
                  <StyleMenuItems>
                    {historyValue?.map((item, index) => {
                      return (
                        <Item key={index}>
                          <div className='rigth'>
                            <span>{index + 1}</span>
                            <Icon
                              className={'icon'}
                              icon={`${BASE_URL}${
                                item?.productImage
                                  ? item?.productImage.replace('.', '_n.')
                                  : ''
                              }`}
                              style={{ width: '32px', height: '32px' }}
                            />
                            <p>{item?.productName}</p>
                          </div>
                          <div className='left'>
                            <p>تعداد :{item?.count}</p>
                            <p>
                              قیمت :
                              {UtilsHelper.threeDigitSeparator(item?.price)}
                              ریال
                            </p>
                          </div>
                        </Item>
                      );
                    })}
                  </StyleMenuItems>
                </StyleColumn>
              )}
            {!!historyValue &&
              historyValue?.length > 0 &&
              innerWidth < CustomSize.mobile && (
                <StyleDivider
                  Width={'100%'}
                  Height={'2px'}
                  Type={'Horizontal'}
                />
              )}
            <StyleColumn>
              <StyleColumnTitle>
                {orderStatus === 2 || orderStatus === 1 || orderStatus === 3
                  ? 'پیش سفارش'
                  : 'پیش فاکتور'}
              </StyleColumnTitle>
              <StyleMenuItems>
                {!!currentValue &&
                  currentValue.map((item, index) => {
                    return (
                      <Item
                        key={index}
                        className={item?.count === 0 ? 'deleted' : ''}
                      >
                        <div className='rigth'>
                          <span>{index + 1}</span>
                          <Icon
                            className={'icon'}
                            icon={`${BASE_URL}${
                              item?.productImage
                                ? item?.productImage.replace('.', '_n.')
                                : ''
                            }`}
                            style={{ width: '32px', height: '32px' }}
                          />
                          <p>{item?.productName}</p>
                        </div>
                        <div className='left'>
                          <p>
                            {orderStatus === 2 ? 'تعداد' : 'تعداد نهایی'} :
                            {item?.count}
                          </p>
                          {item?.focIndicator ? (
                            <p>اشانتیون</p>
                          ) : (
                            <p>
                              {orderStatus === 2 ? 'قیمت ' : 'قیمت نهایی'} :
                              {UtilsHelper.threeDigitSeparator(item?.price)}
                              ریال
                            </p>
                          )}
                        </div>
                      </Item>
                    );
                  })}
              </StyleMenuItems>
            </StyleColumn>
          </StyleOrders>

          <StyleDivider Width={'100%'} Height={'2px'} Type={'Horizontal'} />
          <StylePriceRow>
            <p> جمع کل : </p>
            <p>
              {sumPrice === 0
                ? ' 0 '
                : UtilsHelper.threeDigitSeparator(sumPrice)}
              &nbsp; ریال
            </p>
          </StylePriceRow>
          <StylePriceRow>
            <p> مالیات بر ارزش افزوده : </p>
            <p>
              {taxation === 0
                ? ' 0 '
                : UtilsHelper.threeDigitSeparator(taxation)}
              &nbsp; ریال
            </p>
          </StylePriceRow>
          <StylePriceRow>
            <p> تخفیف : </p>
            <p>
              {discountPrice === 0
                ? ' 0 '
                : UtilsHelper.threeDigitSeparator(discountPrice)}
              &nbsp; ریال
            </p>
          </StylePriceRow>
          <StyleDivider Width={'100%'} Height={'2px'} Type={'Horizontal'} />
          <StylePriceRow>
            <p className='final'> جمع مبلغ نهایی : </p>
            <p className='finalPrice'>
              {finalPrice === 0
                ? ' 0 '
                : UtilsHelper.threeDigitSeparator(finalPrice)}
              &nbsp; ریال
            </p>
          </StylePriceRow>
        </StylePaymentList>
      </Card>
      <Card border='1px'>
        <RepeatOrder>
          <p>
            در صورت نیاز با زدن دکمه تکرار سفارش امکان تکرار مجدد این سفارش
            فراهم می‌شود.
          </p>
          <StyleCustomBtn
            onClick={repeatOrder}
            type='button'
            Width={'168px'}
            Height={'45px'}
          >
            {loading && (
              <ReactLoading
                type={'spinningBubbles'}
                color={'#ffffff'}
                height={30}
                width={30}
              />
            )}
            تکرار سفارش
          </StyleCustomBtn>
        </RepeatOrder>
      </Card>
    </StyleContent>
  );
};

export default UserPanelPayments;

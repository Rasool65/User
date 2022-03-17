import { useState, useMemo, useEffect } from 'react';
import {
  SectionShoppingList,
  ShoppingContainer,
  Content,
  Aside,
  TotalPrice,
  PriceHeader,
  PriceDescription,
  CartList,
  ListItem,
  Option,
  ItemContent,
  ItemContentPrice,
  AddressItem,
  SelectOption,
  EmptyContent,
  Addresses,
  Loader,
} from './style';
import Section from '@uikits/section/SectionWidget';
import { StyleCustomBtn } from '@uikits/button/style';
import Counter from '@uikits/counter/CounterWidget';
import { StyleDivider } from '@uikits/divider/style';
import { colorPalette } from '@uikits/colors/Color';
import IconWidget from '@uikits/icon/IconWidget';
import { Container } from '../../style';
import closeIcon from '@assets/img/icon/close.png';
import { CART, SUBMIT_ORDER, _TOKEN_NAME } from '@config/constantApi';
import useHttpRequest from '@hooks/useHttpRequest';
import { useLocation, useHistory } from 'react-router-dom';
import {
  PRE_FACTOR_URL,
  SHOPPING_LIST_URL,
  USER_PANEL_DASHBOARD,
} from '@config/constantUrl';
import ReactLoading from 'react-loading';
import { UtilsHelper } from '../../utils/UtilsHelper';
import {
  ShoppingListCountAction,
  ShoppingListChangeAction,
} from '@redux/shoppingList/action';
import { preFactorApisAction } from '@redux/preFactor/action';
import { useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import EmptyCart from '@assets/img/icon/shopping-basket@2x.png';
import { useSelector } from 'react-redux';

const ShoppingListWidget = () => {
  const history = useHistory();
  const location = useLocation();
  const { getRequest, deleteRequest, postRequest, updateRequest } =
    useHttpRequest();
  const [currentData, setCurrentData] = useState<any>([]);
  const [productId, setProductId] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingEmpyBox, setLoadingEmpyBox] = useState(false);
  const [finalPrice, setfinalPrice] = useState<number>(0);
  const dispatch = useDispatch();

  const { shoppingListCount } = useSelector(
    (State: any) => State.ShoppingReducer
  );
  const { shoppingListChange } = useSelector(
    (State: any) => State.ShoppingReducer
  );
  const { userInfo } = useSelector((State: any) => State.userInfoReducer);

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

  const getCart = () => {
    setLoadingEmpyBox(false);

    getRequest(CART)
      .then((resp) => {
        setCurrentData(resp.data);
        dispatch(ShoppingListCountAction(resp.data.length));
        if (shoppingListChange) {
          dispatch(ShoppingListChangeAction(false));
        }

        const sumPrice = resp.data.reduce((prev, current) => {
          return prev + current.count * current.price;
        }, 0);
        setfinalPrice(sumPrice);
        setLoadingPage(false);
        if (resp.data.length === 0) {
          setLoadingEmpyBox(true);
        }
      })
      .catch((errors) => {
        console.log(`errors-cart`, errors);
      });
  };

  const getValue = (count, id) => {
    setProductId(id);
    const value = {
      productId: id,
      count,
    };
    handleSubmit(value);
  };

  const handleSubmit = (value) => {
    setLoading(true);
    updateRequest(CART, value)
      .then((resp) => {
        setLoading(false);
        setLoadingPage(false);
        setOpen(true);
        getCart();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleDeleteProduct = (id) => {
    setLoadingPage(true);
    deleteRequest(`${CART}/${id}`)
      .then((resp) => {
        setOpen(true);
        getCart();
      })
      .catch(() => {
        return;
      });
  };

  const FinalizeInvoice = () => {
    setLoadingOrder(true);
    postRequest(SUBMIT_ORDER, {})
      .then((resp) => {
        setLoadingOrder(false);
        dispatch(ShoppingListCountAction(0));
        dispatch(ShoppingListChangeAction(true));
        dispatch(preFactorApisAction(resp.data));
        history.push(PRE_FACTOR_URL);
      })
      .catch(() => {
        setLoadingOrder(false);
        return;
      });
  };

  useEffect(() => {
    if (localStorage.getItem(_TOKEN_NAME)) {
      setLoadingPage(true);
      getCart();
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem(_TOKEN_NAME) && shoppingListChange) {
      setLoadingPage(true);
      getCart();
    }
  }, [shoppingListChange]);

  return (
    <Container isHidden={false}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity='success'>
          سبد خرید با موفقیت آپدیت شد
        </Alert>
      </Snackbar>

      <SectionShoppingList>
        <Loader visibility={loadingPage || loading}>
          <ReactLoading
            type={'spinningBubbles'}
            color={colorPalette.red_650}
            height={60}
            width={60}
          />
        </Loader>
        <Section more={false} name={'ليست خرید شما'}>
          <ShoppingContainer>
            <Content>
              {currentData.length > 0 && (
                <CartList>
                  {currentData.map((item, index) => {
                    return (
                      <ListItem key={index + 1}>
                        <Option className='name'>
                          <span>{index + 1}</span>
                          <StyleDivider
                            Width={'1px'}
                            Height={'5px'}
                            Type={'Vertical'}
                            Background={colorPalette.gray_55}
                          />
                          <p>{item.productName}</p>
                        </Option>
                        <ItemContent>
                          <p>{item.productName}</p>
                          <Option className='remov-xs'>
                            <StyleDivider
                              Width={'1px'}
                              Height={'5px'}
                              Type={'Vertical'}
                              Background={colorPalette.gray_55}
                            />
                            <div
                              onClick={() => {
                                handleDeleteProduct(item.id);
                              }}
                            >
                              <IconWidget
                                alt='close'
                                src={closeIcon}
                                width={'10px'}
                                height={'10px'}
                              />
                            </div>
                          </Option>
                          {loading && productId === item.productId ? (
                            <ReactLoading
                              type={'spinningBubbles'}
                              color={colorPalette.red_650}
                              height={15}
                              width={15}
                            />
                          ) : (
                            <Counter
                              initial={item.count}
                              data={item.productId}
                              handleChange={getValue}
                            />
                          )}

                          <ItemContentPrice>
                            {/* <span>ریال</span>
                            <span>
                              {UtilsHelper.threeDigitSeparator(item.price)}
                            </span> */}
                          </ItemContentPrice>
                        </ItemContent>
                        <Option className='remove'>
                          <StyleDivider
                            Width={'1px'}
                            Height={'5px'}
                            Type={'Vertical'}
                            Background={colorPalette.gray_55}
                          />
                          <div
                            onClick={() => {
                              handleDeleteProduct(item.id);
                            }}
                          >
                            <IconWidget
                              alt='close'
                              src={closeIcon}
                              width={'10px'}
                              height={'10px'}
                            />
                          </div>
                        </Option>
                      </ListItem>
                    );
                  })}
                </CartList>
              )}
              {loadingEmpyBox && !loadingPage && (
                <EmptyContent>
                  <IconWidget
                    alt='EmptyCart'
                    src={EmptyCart}
                    width={'57px'}
                    height={'57px'}
                  />
                  <h4>سبد خرید شما خالی است!</h4>
                  <p>
                    می‌توانید برای مشاهده محصولات بیشتر به صفحه محصولات مراجعه
                    کنید.
                  </p>
                </EmptyContent>
              )}
            </Content>
            <Aside>
              <TotalPrice disabled={currentData.length === 0 ? true : false}>
                <PriceHeader>
                  <p>قیمت کالاها:</p>
                  <div>
                    <span>{UtilsHelper.threeDigitSeparator(finalPrice)}</span>
                    <span>ریال</span>
                  </div>
                </PriceHeader>
                <StyleDivider
                  Width={'100%'}
                  Height={'1px'}
                  Type={'Horizontal'}
                  Background={colorPalette.gray_47}
                />
                <PriceDescription>
                  لطفا برای پیگیری سفارش وارد پروفایل شده واز طریق منوی "سفارش
                  های من" و دکمه جزئیات سفارش از پیشرفت سفارش مطلع گردید.
                </PriceDescription>
                <StyleCustomBtn
                  onClick={FinalizeInvoice}
                  disabled={currentData.length === 0 ? true : false}
                  type='button'
                  Width={'100%'}
                  Height={'51px'}
                >
                  {loadingOrder && (
                    <ReactLoading
                      type={'spinningBubbles'}
                      color={'#ffffff'}
                      height={30}
                      width={30}
                    />
                  )}
                  نهایی کردن سفارش
                </StyleCustomBtn>
              </TotalPrice>
            </Aside>
          </ShoppingContainer>
        </Section>
      </SectionShoppingList>
      <Addresses>
        <Section more={false} name={' آدرس گیرنده'}>
          {!!userInfo?.address && (
            <AddressItem>
              <SelectOption>
                <input type='radio' name='address' checked={true} />
                <span className='checkmark' />
              </SelectOption>
              <p>
                <span>گیرنده:</span>
                <span>{userInfo?.fullName}</span>
              </p>
              <StyleDivider
                Width={'1px'}
                Height={'10px'}
                Type={'Vertical'}
                Background={colorPalette.gray_65}
              />
              <p>{userInfo?.address}</p>
              <StyleDivider
                Width={'1px'}
                Height={'10px'}
                Type={'Vertical'}
                Background={colorPalette.gray_65}
              />
              <p>
                <span>شماره تماس:</span>
                <span>{userInfo?.mobile}</span>
              </p>
            </AddressItem>
          )}
        </Section>
      </Addresses>
    </Container>
  );
};

export default ShoppingListWidget;

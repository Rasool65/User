import { useState, useMemo, useEffect } from 'react';
import {
  SectionShoppingList,
  ShoppingContainer,
  Content,
  Aside,
  TotalPrice,
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

// icons
import BasketIcon from '@assets/img/icon/basketIcon.svg';
import InvoiceIcon from '@assets/img/icon/invoice.svg';
import ConfirmIcon from '@assets/img/icon/confirm.svg';

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
// import { Step, StepLabel, Stepper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Stepper from '@uikits/stepper/StepperWidget';
import Basket from './Basket';
import Invoice from './Invoice';
import { ISteps } from './ShoppingList';
import Confirm from './Confirm';

const steps: ISteps[] = [
  {
    id: 0,
    name: 'سبد خرید',
    Component: Basket,
    icon: BasketIcon,
  },
  {
    id: 1,
    name: 'مشاهده قیمت',
    Component: Invoice,
    icon: InvoiceIcon,
  },
  {
    id: 2,
    name: 'تایید نهایی',
    Component: Confirm,
    icon: ConfirmIcon,
  },
];

const ShoppingListWidget = () => {
  const history = useHistory();
  const location = useLocation();
  const { getRequest, deleteRequest, postRequest, updateRequest } =
    useHttpRequest();
  const [currentData, setCurrentData] = useState<any>([]);
  const [invoiceData, setInvoiceData] = useState<any>([]);
  const [productId, setProductId] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingEmpyBox, setLoadingEmpyBox] = useState(false);
  const [finalPrice, setfinalPrice] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [CurrentStep, setCurrentStep] = useState(steps[activeStep]);
  const [invoiceValues, setInvoiceValues] = useState({
    sum: 0,
    discount: 0,
    total: 0,
  });
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
        const data = resp.data;
        let sum = 0;
        let discount = 0;

        data.forEach((item) => {
          sum = item.count * item.price + sum;
          discount = item.count * item.discount + discount;
        });
        setInvoiceValues({
          sum,
          discount,
          total: sum - discount,
        });
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
        // setActiveStep(0);
        onClickNext();
        dispatch(ShoppingListCountAction(0));
        dispatch(ShoppingListChangeAction(true));
        dispatch(preFactorApisAction(resp.data));
        // history.push(PRE_FACTOR_URL);
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

  const onClickNext = () => {
    setCurrentStep(steps[activeStep + 1]);
    setActiveStep(activeStep + 1);
  };
  const onClickPrevious = () => {
    setCurrentStep(steps[activeStep - 1]);
    setActiveStep(activeStep - 1);
  };
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

      <Stepper steps={steps} activeStep={activeStep} />

      <SectionShoppingList>
        <Loader visibility={loadingPage || loading}>
          <ReactLoading
            type={'spinningBubbles'}
            color={colorPalette.red_650}
            height={60}
            width={60}
          />
        </Loader>

        <Section more={false}>
          <CurrentStep.Component
            currentData={currentData}
            handleDeleteProduct={handleDeleteProduct}
            handleClickNext={onClickNext}
            handleClickPrevious={onClickPrevious}
            handleSubmit={handleSubmit}
            loadingEmpyBox={loadingEmpyBox}
            loadingPage={loadingPage}
            finalizeInvoice={FinalizeInvoice}
            loadingOrder={loadingOrder}
          />
        </Section>
      </SectionShoppingList>
      {activeStep === 0 && (
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
      )}
    </Container>
  );
};

export default ShoppingListWidget;

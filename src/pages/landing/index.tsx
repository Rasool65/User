import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { useApi } from '@hooks/useApi';
import Slider from '@uikits/slider/SliderWidget';
import Section from '@uikits/section/SectionWidget';
import Category from '@pages/landing/Categories';
import Product from '@pages/landing/Products';
import Banner from '@uikits/banner/BannerWidget';
import banner2 from '@assets/img/lackydoo-1024x1024.png';
import { StyleCustomBtn } from '@uikits/button/style';
import { Container } from '../../style';
import {
  CART,
  SLIDE_SHOWS_API,
  PRODUCT_CATERGORIES_API,
  MOST_VISIT_PRODUCTS,
  NEW_PRODUCTS,
  BASEDONORDER_PRODUCTS,
  CONSULT,
  SETTING_API,
} from '@config/constantApi';
import { landingApisAction } from '@redux/landing/action';
import useHttpRequest from '@hooks/useHttpRequest';
import { ShoppingListCountAction } from '@redux/shoppingList/action';
import { PRODUCTS_URL, LANDING_URL } from '@config/constantUrl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ReactLoading from 'react-loading';
import { colorPalette } from '@uikits/colors/Color';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '@config/urls';

const Landing = () => {
  const { get } = useApi();

  const { getRequest, postRequest } = useHttpRequest();

  const [mostVisiteProducts, setMostVisiteProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [basedonorderProducts, setBasedonorderProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState({
    loading1: false,
    loading2: false,
    loading3: false,
  });

  const dispatch = useDispatch();
  const [mainBannerUrl, setMainBannerUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendConsult, setSendConsult] = useState(false);
  const history = useHistory();
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

  const sendConsultRequest = () => {
    setLoading(true);
    postRequest(CONSULT, {})
      .then((res) => {
        setOpen(true);
        setLoading(false);
        setSendConsult(true);
        setTimeout(() => {
          setSendConsult(false);
        }, 20000);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getShoppingListCount = () => {
    getRequest(`${CART}/count`)
      .then((res) => {
        dispatch(ShoppingListCountAction(res.data.count));
      })
      .catch(() => {
        return;
      });
  };

  const getLandingApis = () => {
    const slideShowsApi = get(SLIDE_SHOWS_API);
    const productCategoriesApi = get(PRODUCT_CATERGORIES_API);

    axios
      .all([slideShowsApi, productCategoriesApi])
      .then(
        axios.spread((...responses) => {
          dispatch(
            landingApisAction({
              slideShows: responses[0].data,
              productCategies: responses[1].data,
            })
          );
        })
      )
      .catch((errors) => {
        console.log(`errors-landing`, errors);
      });
  };

  const getMostVisiteProducts = (limit) => {
    setLoadingProduct({ ...loadingProduct, loading1: true });
    getRequest(`${MOST_VISIT_PRODUCTS}?Limit=${limit ? limit : 12}`)
      .then((resp) => {
        setMostVisiteProducts(resp.data);
        setLoadingProduct({ ...loadingProduct, loading1: false });
      })
      .catch(() => {
        setLoadingProduct({ ...loadingProduct, loading1: false });
      });
  };
  const getNewProducts = (limit) => {
    setLoadingProduct({ ...loadingProduct, loading2: true });
    getRequest(`${NEW_PRODUCTS}?Limit=${limit ? limit : 12}`)
      .then((resp) => {
        setNewProducts(resp.data);
        setLoadingProduct({ ...loadingProduct, loading2: false });
      })
      .catch(() => {
        setLoadingProduct({ ...loadingProduct, loading2: false });
      });
  };

  const getBasedonorderProducts = (limit) => {
    setLoadingProduct({ ...loadingProduct, loading3: true });
    getRequest(`${BASEDONORDER_PRODUCTS}?Limit=${limit ? limit : 12}`)
      .then((resp) => {
        setBasedonorderProducts(resp.data);
        setLoadingProduct({ ...loadingProduct, loading3: false });
      })
      .catch(() => {
        setLoadingProduct({ ...loadingProduct, loading3: false });
      });
  };

  const getMainPageBanner = () => {
    getRequest(`${SETTING_API}/bannerspath?BannerType=0`).then((resp) => {
      setMainBannerUrl(resp.data);
    });
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    getMainPageBanner();
    getShoppingListCount();
    getLandingApis();
    getMostVisiteProducts(12);
    getNewProducts(12);
    getBasedonorderProducts(12);
  }, []);

  return (
    <Container isHidden={false}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity='success'>
          درخواست مشاوره شما با موفقیت ارسال شد.
        </Alert>
      </Snackbar>
      <section style={{ flex: 1 }}>
        <Slider />
        <Section more={true} link={PRODUCTS_URL} name={'دسته بندی محصولات'}>
          <Category />
        </Section>
        <Section
          more={true}
          link={`${PRODUCTS_URL}/?Sort=mostvisited`}
          name={'محصولات پیشنهادی'}
        >
          {!loadingProduct.loading1 && mostVisiteProducts.length > 0 ? (
            <Product products={mostVisiteProducts} />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {loadingProduct.loading1 ? (
                <ReactLoading
                  type={'spinningBubbles'}
                  color={colorPalette.red_650}
                  height={45}
                  width={45}
                />
              ) : (
                ''
              )}
            </div>
          )}
        </Section>
        <Section
          more={true}
          link={`${PRODUCTS_URL}/?Sort=createDate`}
          name={'جدیدترین محصولات برای شما'}
        >
          {!loadingProduct.loading2 && newProducts.length > 0 ? (
            <Product products={newProducts} />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {loadingProduct.loading2 ? (
                <ReactLoading
                  type={'spinningBubbles'}
                  color={colorPalette.red_650}
                  height={45}
                  width={45}
                />
              ) : (
                ''
              )}
            </div>
          )}
        </Section>
        <Banner background={`${BASE_URL}${mainBannerUrl}`} type='image' />
        <Section
          more={true}
          link={`${PRODUCTS_URL}/?Sort=similarOrder`}
          name={'محصولات مشابه لیست خرید شما'}
        >
          {!loadingProduct.loading3 && basedonorderProducts.length > 0 ? (
            <Product products={basedonorderProducts} />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {loadingProduct.loading3 ? (
                <ReactLoading
                  type={'spinningBubbles'}
                  color={colorPalette.red_650}
                  height={45}
                  width={45}
                />
              ) : (
                ''
              )}
            </div>
          )}
        </Section>
        <Banner background={banner2} type='component'>
          <div>
            <p>در صورت نیاز به دریافت مشاوره درخواست خود را ثبت نمایید</p>
            <StyleCustomBtn
              onClick={sendConsultRequest}
              disabled={sendConsult}
              type='button'
              Width={'134px'}
              Height={'51px'}
            >
              {loading && (
                <ReactLoading
                  type={'spinningBubbles'}
                  color={'#ffffff'}
                  height={25}
                  width={25}
                />
              )}
              دریافت مشاوره
            </StyleCustomBtn>
          </div>
        </Banner>
      </section>
    </Container>
  );
};

export default Landing;

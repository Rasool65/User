import { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import {
  SectionProduct,
  SectionRight,
  SectionLeft,
  ProductImg,
  Album,
  AlbumItem,
  Title,
  Description,
  Cart,
  Price,
  ShareProduct,
  Item,
  Social,
  Details,
  Specifications,
  ListItems,
  DialogCustom,
  DialogTitle,
  DialogContent,
  DialogContentRight,
  DialogContentLeft,
  StyleShowPriceProduct,
} from './style';
import MoreImage from './MoreImage';
import IconWidget from '@uikits/icon/IconWidget';
import { StyleCustomBtn } from '@uikits/button/style';
import Counter from '@uikits/counter/CounterWidget';
import { Container } from '../../style';
import Bredcrumb from '@uikits/bredcrumb/BredcrumbWidget';
import Section from '@uikits/section/SectionWidget';
import { StyleDivider } from '@uikits/divider/style';
import Product from '@pages/landing/Products';
import { UtilsHelper } from '../../utils/UtilsHelper';
import CartIcon from '@assets/img/icon/Group 47.svg';

import twitter from '@assets/img/icon/Path 1807.svg';
import telegram from '@assets/img/icon/Path 1806.svg';
import instagram from '@assets/img/icon/tabler-brand-instagram.svg';
import YouTube from '@assets/img/icon/tabler-brand-youtube.svg';

import CopyIcon from '@assets/img/icon/copy.svg';
import checkedIcon from '@assets/img/icon/checked.svg';

import Dialog from '@material-ui/core/Dialog';
import { BASE_URL } from '@config/urls';
import useHttpRequest from '@hooks/useHttpRequest';
import {
  PRODUCTS,
  CART,
  SETTING_API,
  CATEGORIES,
  GET_PRICE,
} from '@config/constantApi';
import { PRODUCTS_URL, SHOPPING_LIST_URL } from '@config/constantUrl';
import ReactLoading from 'react-loading';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import { ShoppingListChangeAction } from '@redux/shoppingList/action';
import { useDispatch } from 'react-redux';
import { colorPalette } from '@uikits/colors/Color';
import { StyleShowPrice } from '@uikits/product/style';
import { Button } from '@material-ui/core';

const ProductInfo = () => {
  const [openModal, setOpenModal] = useState(false);
  const [productValue, setProductValue] = useState<any>({});
  const [currentImage, setCurrentImage] = useState<any>({});
  const [similarProducts, setSimilarProducts] = useState<any>([]);
  const { id } = useParams<any>();
  const history = useHistory();
  const [productCount, setProductCount] = useState<number>(1);
  const [showPrice, setShowPrice] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [copied, setCopied] = useState(false);
  const [parents, setParents] = useState<any>([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const { shoppingListCount } = useSelector(
    (State: any) => State.ShoppingReducer
  );
  const dispatch = useDispatch();

  const { getRequest, postRequest } = useHttpRequest();

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

  const handleClickClose = () => {
    setOpenModal(false);
  };

  const getSimilarProducts = (limit = 12) => {
    setLoadingProduct(true);
    getRequest(`${PRODUCTS}/${id}/similarproduct?Limit=${limit ? limit : 12}`)
      .then((resp) => {
        setSimilarProducts(resp.data);
        setLoadingProduct(false);
      })
      .catch(() => {
        setLoadingProduct(false);
      });
  };

  const getProduct = () => {
    getRequest(`${PRODUCTS}/${id}`)
      .then((resp) => {
        setProductValue(resp.data);
        setCategoryId(resp.data.productCategoryId);
      })
      .catch(() => {
        return;
      });
  };

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
          setOpen(true);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  // const getParents = (Id) => {
  //   if (categories?.length > 0) {
  //     categories.map((item: any) => {
  //       const category =
  //         item.id === Id
  //           ? item
  //           : item.children.find((_item) => _item.id === Id);
  //       if (!!category) {
  //         names.push(category.name);

  //         if (!!category.parentId) {
  //           getParents(category.parentId);
  //         } else {
  //           setParents(names);
  //         }
  //       }
  //     });
  //   }
  // };
  let names: any = [];

  const recFun = (recData) => {
    names.push(recData.name);
    const hasParent = recData.parent;
    if (hasParent) {
      recFun(recData.parent);
    } else {
      setParents(names);
      names = [];
    }
  };
  const getParents = () => {
    recFun(productValue.productCategory);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (!!id) {
      getProduct();
      getSimilarProducts(12);
    }
  }, [id]);

  useEffect(() => {
    if (!!categoryId) {
      getParents();
    }
  }, [categoryId]);

  const handleClickOpen = (img) => {
    setCurrentImage(img);
    setOpenModal(true);
  };

  const handleShareLink = (link) => {
    window.open(link);
  };

  const handleCopyCode = () => {
    copy(location.href);
    setCopied(true);
  };

  const showPriceItem = () => {
    if (id) {
      setBtnLoading(true);
      getRequest(`${GET_PRICE}?productId=${id}`)
        .then((resp) => {
          setShowPrice(true);
          setPrice(resp.data);
          setBtnLoading(false);
        })
        .catch(() => setBtnLoading(false));
    }
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
          محصول با موفقیت به سبد خرید اضافه شد
        </Alert>
      </Snackbar>

      <SectionProduct>
        <Dialog
          scroll='body'
          maxWidth='xl'
          onClose={handleClickClose}
          open={openModal}
        >
          <MoreImage
            Images={productValue.galleries}
            name={productValue.name}
            firstImage={currentImage}
            CloseDialog={handleClickClose}
          />
        </Dialog>
        <SectionRight>
          <ProductImg>
            <img
              alt={productValue.name}
              src={`${BASE_URL}${productValue.image}`}
            />
          </ProductImg>
          {productValue.galleries !== undefined && (
            <Album>
              {productValue.galleries.length > 0 &&
                productValue.galleries.map((item, index) => {
                  if (index <= 2) {
                    return (
                      <AlbumItem
                        key={index}
                        onClick={() => {
                          handleClickOpen(item);
                        }}
                      >
                        <img alt={item.title} src={`${BASE_URL}${item}`} />
                      </AlbumItem>
                    );
                  }
                })}

              {productValue.galleries.length > 0 && (
                <AlbumItem
                  onClick={() => {
                    handleClickOpen(productValue.galleries[0]);
                  }}
                >
                  <p>
                    تصاویر بیشتر
                    <span>❯</span>
                  </p>
                </AlbumItem>
              )}
            </Album>
          )}
        </SectionRight>
        <SectionLeft>
          <div>
            <Bredcrumb
              listItems={
                parents?.length > 0
                  ? parents
                  : [
                      !!productValue?.categoryName
                        ? productValue?.categoryName
                        : productValue?.name,
                    ]
              }
              icon='❯'
            />
            <Section more={false} name={productValue.name}>
              <Title>مواد تشکیل دهنده</Title>
              <Description>{productValue.materialType}</Description>
              <StyleDivider
                className='divider'
                Width={'60%'}
                Height={'2px'}
                Type={'Horizontal'}
              />
            </Section>
            {showPrice ? (
              <Price>
                <span>قیمت :</span>
                <span className='price'>
                  {UtilsHelper.threeDigitSeparator(price)}
                </span>
                <span>ریال</span>
              </Price>
            ) : (
              <StyleShowPriceProduct>
                <Button
                  disabled={btnLoading}
                  style={{ width: '100%' }}
                  onClick={showPriceItem}
                >
                  {btnLoading ? (
                    <ReactLoading
                      type={'spinningBubbles'}
                      color={'#EA2125'}
                      height={25}
                      width={25}
                    />
                  ) : (
                    'مشاهده قیمت'
                  )}{' '}
                </Button>
              </StyleShowPriceProduct>
            )}

            <Cart>
              <Counter initial={1} handleChange={getCount} />
              <StyleCustomBtn
                Width={'170px'}
                Height={'45px'}
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
                    alt='Cart'
                    src={CartIcon}
                    width={'17px'}
                    height={'16px'}
                  />
                )}
                اضافه به لیست خرید
              </StyleCustomBtn>
            </Cart>
          </div>
          <ShareProduct>
            <p>اشتراک گذاری محصول:</p>
            <Social>
              {/* <Item onClick={handleCopyCode}>
                                <StyleCustomBtn Background={copied ? colorPalette.green_350 : colorPalette.red_650} Width={'100px'} Height={'35px'}>
                                    {copied ? <IconWidget alt='Cart' src={checkedIcon} width={'17px'} height={'16px'} /> : <IconWidget alt='Cart' src={CopyIcon} width={'17px'} height={'16px'} />}
                                    {copied ? 'کپی شد' : 'کپی لینک'}
                                </StyleCustomBtn>
                            </Item> */}
              <Item
                onClick={() => {
                  handleShareLink('https://twitter.com/?lang=en');
                }}
              >
                <IconWidget
                  alt='Cart'
                  src={twitter}
                  width={'24px'}
                  height={'24px'}
                />
              </Item>
              <Item
                onClick={() => {
                  handleShareLink('https://telegram.org/');
                }}
              >
                <IconWidget
                  alt='Cart'
                  src={telegram}
                  width={'24px'}
                  height={'24px'}
                />
              </Item>
              <Item
                onClick={() => {
                  handleShareLink('https://www.instagram.com/');
                }}
              >
                <IconWidget
                  alt='Cart'
                  src={instagram}
                  width={'24px'}
                  height={'24px'}
                />
              </Item>
              <Item
                onClick={() => {
                  handleShareLink('https://www.youtube.com/');
                }}
              >
                <IconWidget
                  alt='Cart'
                  src={YouTube}
                  width={'24px'}
                  height={'24px'}
                />
              </Item>
            </Social>
          </ShareProduct>
        </SectionLeft>
      </SectionProduct>
      <Details>
        <Section
          more={true}
          link={`${PRODUCTS_URL}/?Sort=similarOrder`}
          name={'محصولات مشابه'}
        >
          {!loadingProduct && similarProducts.length > 0 ? (
            <Product products={similarProducts} />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {loadingProduct ? (
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
        <Section more={false} name={'مشخصات کالا'} detail={productValue.name}>
          <Specifications
            dangerouslySetInnerHTML={{ __html: productValue.longDescription }}
          />
        </Section>
        <StyleDivider
          className='divider'
          Width={'100%'}
          Height={'2px'}
          Type={'Horizontal'}
        />
        <ListItems>
          {!!productValue.productMedias &&
            productValue.productMedias.map((item, index) => {
              return (
                <div key={index}>
                  <IconWidget
                    alt='icon'
                    src={`${BASE_URL}${item.icon}`}
                    width={'24px'}
                    height={'24px'}
                  />
                  <p>{item.description}</p>
                </div>
              );
            })}
        </ListItems>
      </Details>
    </Container>
  );
};

export default ProductInfo;
